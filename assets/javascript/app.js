// $(document).ready(function() {

	var trivia = {

		questions: [
		{
			category: "Metal Music",
			question: "What is the name of Iron Maiden's mascot?",
			choices: [ "Mickey", "Oscar", "Eddie", "Mighty" ],
			answer: "3"
		},
		{
			category: "Metal Music",
			question: "question2",
			choices: [ "1", "2", "3", "4" ],
			answer: "2"
		},
		{
			category: "Metal Music",
			question: "question3",
			choices: [ "1", "2", "3", "4" ],
			answer: "3"
		}
		],

		ABCD: [ "A", "B", "C", "D" ],

		displayCategory: function(number) {

			$(".category").html("Category: " + trivia.questions[number].category);
		},

		displayQuestion: function(number) {

			$(".question").html(trivia.questions[number].question);
		},

		displayChoices: function(number) {

			for (var i = 0; i < trivia.questions[number].choices.length; i++) {

				var choiceButton = $("<button>");

    		// Each button is given the appropriate classes for CSS.
    		choiceButton.addClass("answerBtn btn-primary");

    		// Each button is assigned a value for comparing the right answer.
    		choiceButton.attr("value", i+1);

 			// Put the answer on the button.
 			choiceButton.html(trivia.questions[number].choices[i]);	

    		// Each button is added to the page.
    		$("#buttons").append(choiceButton);
    	}
    },

    checkAnswer: function(number) {

    	$(".answerBtn").click(function() {

    		if (trivia.questions[number].answer == parseInt($(this).attr("value"))) {	
				// Winner!!
				$('#buttons').empty();

				$('#buttons').append('<img src="assets/images/winner-winner.jpeg">');
				setTimeout(function() { $("#buttons").hide(); }, 2000);

				// trivia.start(30);
			}
			else {
				// console.log("Not Winner!!")
			}
		});
    },

    selectQuestion: function() {
    	return(Math.floor(Math.random() * trivia.questions.length));
    },

    start: function(time) {

    	$("#start").hide();

    	$("#timer").html("Time Remaining: " + time + " seconds");

    	questionNumber = trivia.selectQuestion();

    	trivia.displayCategory(questionNumber);
    	trivia.displayQuestion(questionNumber); 
    	trivia.displayChoices(questionNumber);
    	trivia.checkAnswer(questionNumber);
    }
};

window.onload = function() {

	$("#start").click(function() {

		trivia.start(30);
	});
};

// };