$(document).ready(function () {
    // Hides the refresh button on page load
    $("#refresh-button").hide();
    var correct = 0;
    var incorrect = 0;
    var unAnswered = 0;
    var timeRemaining = 15;
    var intervalID;
    var questionsIndex= 0; 
    var answered = false;
    var correctAnswer;

// Array that holds the different questions, answer choices, correct answer index and image
var questions = [{
        question: "What does HTML stand for?",
        answer: ["Hyper Talent Markings Lookup", "High Type Mega Lunge", "HyperText Markup Language", "Hidden Tounge Mister Lingo"],
        correctAns: "2",
        image: ("assets/images/HTML.jpg")
    }, {
        question: "Which company created Bootstrap?",
        answer: ["Facebook", "Twitter", "Snapchat", "Google"],
        correctAns: "1",
        image: ("assets/images/Bootstrap.jpg")
    }, {
        question: "jQuery is what to Javascript?",
        answer: ["A parent", "It's cousin", "A grocery store", "A Library"],
        correctAns: "3",
        image: ("assets/images/jQuery.jpg")
    }, {
        question: "What is CSS?",
        answer: ["Cascading Style Sheets", "Crazy Sexy Styling", "Cool Style Slang", "Colorful Sassy Styling"],
        correctAns: "0",
        image: ("assets/images/CSS.jpg")
    }];

    // Clears the page to reload the quiz
    function reloadQuiz(){
        $('#refresh-button').hide();
        questionsIndex = 0;
        $("#game-over").text("Select the correct answer!!");
        $("#final").empty();
        $("#time").empty();
        newQuiz();
    }

    // Starts the quiz. Hides the start button and sets correct/incorrect/unaswered to 0
    function newQuiz() {
        $("#start-button").remove();
        $("#game-over").text("Select the correct answer!!");
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        nextQuestion();
    }

    // Updates the page to the next question
    function nextQuestion() {
        answered = false; 
        // User is given 15 seconds to answer
        timeRemaining = 15;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correctAnswer = questions[questionsIndex].correctAns;
        var question = questions[questionsIndex].question;
        // Updates the page with the question and answer choices
        $("#question").html(question);
        for (var i = 0; i < 4; i++) {
            var answer = questions[questionsIndex].answer[i];
            $("#options").append("<p class='choice' id=" + i + ">" + answer + "</p>");
        }

        // This onclick function takes in the ID of the choice that added to the page
        // Based on the selection, will display if the answer was correct/incorrect 
        // and calls a corresponding function
        $("p").click(function () {
            var id = $(this).attr('id');
            if (id === correctAnswer) {
                answered = true; 
                $("#correct-answer").html("You chose the correct answer of " + "<b>" + questions[questionsIndex].answer[correctAnswer] + "</b>" + "!");
                correctUpdate();
            } else {
                answered = true; 
                $("#correct-answer").html("You chose " + "<b>" + questions[questionsIndex].answer[id] + "</b>" + " but the correct answer is  " + "<b>" + questions[questionsIndex].answer[correctAnswer] + "</b>" + "!");
                incorrectUpdate();
            }
        });
    }

    // Counts down the timer, if no answer was selection before the time runs out,
    // updates the page to no time remaining and correct answer
    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $("#correct-answer").html("You ran out of time!!! The correct answer is " + "<b>" + questions[questionsIndex].answer[correctAnswer] + "</b>" + "!");
            unAnsweredUpdate();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $("#time").text('You have ' + timeRemaining + ' seconds remaining!');
        }
    }

    function correctUpdate() {
        correct++;
        $("#time").text(" ");
        updatePage();
    }

    function incorrectUpdate() {
        incorrect++;
        $("#time").text(" ");
        updatePage();
    }

    function unAnsweredUpdate() {
        unAnswered++;
        $("#time").text(" ");
        updatePage();
    }

    function updatePage() {
        // Clears the answer options
        $("#options").empty();
        // Displays the answer image
        $("#image").html("<img src='"+ questions[questionsIndex].image +"' class='img-fluid'>");
        questionsIndex++; 
        // Condition if questions remain, load the new question and clear the previous correct answer
        // and image after 3.5 seconds
        if (questionsIndex < questions.length) {
            setTimeout(function () {
                nextQuestion();
                $("#answer-image").attr("src", " ");
                $("#correct-answer").empty();
                $("#image img:last-child").remove();
            }, 3500);
        // if no more questions, clears the page and updates with the score
        // also shows the refresh button to start the quiz over   
        } else {
            setTimeout(function () {
                $("#question").empty();
                $("#options").empty();
                $("#answer-image").attr("src", " ");
                $("#time").empty();
                $("#correct-answer").empty();
                $("#image").empty();
                var score = correct / questions.length;
                score = score*100;
                $("#game-over").html("The game has ended. Your score is " + "<b>" +score + "</b>" +"%");
                $("#final").append('<h4>Correct Answers: ' + correct + '</h4>');
                $("#final").append('<h4>Incorrect Answers: ' + incorrect + '</h4>');
                $("#final").append('<h4>Unanswered Questions: ' + unAnswered + '</h4>');

                $("#refresh-button").show();
        }, 3500);
        }
    };

    // onclick for the start button
    $("#start-button").on("click", function () {
        $("");
        newQuiz();
    });

    // onclick for the reload button
    $("#refresh-button").on("click", function () {
        $("");
        reloadQuiz();
    });

});