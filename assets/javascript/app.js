var timer;

var correct = 0;
var incorrect = 0;
var unanswered = 0;
var currentQuestion = 0;
var questionNumber = 0;

var currentTime = 0;

var trivia = {

	questions: [
	{
		category: "Metal Music",
		question: "What is the name of Iron Maiden's mascot?",
		choices: [ "Mickey", "Oscar", "Eddie", "Mighty" ],
		answer: 3
	},
	{
		category: "Metal Music",
		question: "Richie Blackmore from Deep Purple and Rainbow, spends his time these days playing...",
		choices: [ "Blistering Riffs", "Renaissance Guitar", "Banjo Goodness", "Autoharp" ],
		answer: 2
	},
	{
		category: "Metal Music",
		question: "Your favorite metal band is...",
		choices: [ "Metallica", "Iron Maiden", "Black Sabbath", "Motley Crue" ],
		answer: 2
	},
	{
		category: "Metal Music",
		question: "Procol Harum is best know for their song...",
		choices: [ "The Prodigal Stranger", "Wasted Years", "A Whiter Shade of Pale", "Conquistador" ],
		answer: 3
	}
	],

	countdown: function() {

		currentTime--;

		$("#timer").html("Time Remaining: " + currentTime + " seconds");

		$(".answerBtn").click(function() {
			console.log("click inside countdown");
			trivia.checkAnswer(questionNumber);
		});
		
		if (currentTime === 0) {

			trivia.checkAnswer(questionNumber);
		};
	},

	summary: function() {

		clearInterval(timer);

		$(".trivia").html("<h2>Here are your results!</h2>");
		$(".trivia").append("<h3>Correct Answers: " + correct + "</h3>");
		$(".trivia").append("<h3>Incorrect Answers: " + incorrect + "</h3>");
		$(".trivia").append("<h3>Unanswered: " + unanswered + "</h3>");
		$(".trivia").append("<br><button class='replayBtn btn btn-warning'>Play Again?</button>");
	},

	displayCategory: function(number) {

		$(".trivia").html("<h2>Category: " + trivia.questions[number].category + "</h2>");
	},

	displayQuestion: function(number) {

		$(".trivia").append("<h2>" + trivia.questions[number].question + "</h2><br><br>");
	},

	displayChoices: function(number) {

		for (var i = 0; i < trivia.questions[number].choices.length; i++) {

			var choiceButton = $("<button>");

    		// Button is given the appropriate classes for CSS.
    		choiceButton.addClass("answerBtn btn-primary");

    		// Button is assigned a value for comparing the right answer.
    		choiceButton.attr("value", i+1);

 			// Put the answer on the button.
 			choiceButton.html(trivia.questions[number].choices[i]);	

    		// Button is added to the page.
    		$(".trivia").append(choiceButton);
    	}
    },

    checkAnswer: function(number) {

    	if (currentTime === 0) {

    		unanswered++;

    		$('.trivia').html("<h2>Time's Up!</h2>");
    		$('.trivia').append("<br><h2>Correct Answer: " + trivia.questions[number].choices[trivia.questions[number].answer-1] + "</h2>");
    	}    	

    	clearInterval(timer);

    	// $(".answerBtn").click(function() {
    		// console.log("click inside checkAnswer");
    		// if (trivia.questions[number].answer == parseInt($(this).attr("value"))) {	

    		console.log(trivia.questions[number].answer);
    		console.log($(this).attr("value"));
    		console.log(parseInt($(this).attr("value")));
    		if (trivia.questions[number].answer == $(this).attr("value")) {	

				// Winner!!
				$('.trivia').html("<h2>That's Correct!!</h2>");
				$('.trivia').append('<br><img src="assets/images/winner-winner.jpeg">');

				correct++;
			}
			else {

				// Not A Winner!!
				$('.trivia').html("<h2>That's NOT Correct!!</h2>");
				$('.trivia').append("<br><h2>The correct answer is: " + trivia.questions[number].choices[trivia.questions[number].answer-1] + "</h2>");
				$('.trivia').append('<br><img src="assets/images/not-a-winner.jpg">');

				incorrect++;	
			};

		// });

    	if (currentQuestion < trivia.questions.length) {

    		setTimeout(trivia.start, 3000);
    	}
    	else {

    		setTimeout(trivia.summary, 3000);
    	}
    },

    selectQuestion: function() {

    	return(currentQuestion++);

    	// return(Math.floor(Math.random() * trivia.questions.length));
    },

    start: function() {

    	currentTime = 5; //seconds

    	clearInterval(timer);

    	timer = setInterval(trivia.countdown, 1000);

    	$("#timer").html("Time Remaining: " + currentTime + " seconds");

    	questionNumber = trivia.selectQuestion();
    	trivia.displayCategory(questionNumber);
    	trivia.displayQuestion(questionNumber); 
    	trivia.displayChoices(questionNumber);
    }
};

window.onload = function() {

	$(".startBtn").click(function() {

		// timer = setInterval(trivia.countdown, 1000);

		trivia.start();
	});
};

$(document).on("click", ".answerBtn", function() {

	trivia.checkAnswer(questionNumber);
});

$(document).on("click", ".replayBtn", function() {

	timer = 5;

	correct = 0;
	incorrect = 0;
	unanswered = 0;
	currentQuestion = 0;

	currentTime = 0;

	trivia.start();
});