// Sample questions and answers
const questions = [
    {
      question: 'What is the capital of France?',
      answers: ['Paris', 'Berlin', 'Madrid', 'Rome'],
      correctAnswer: 'Paris'
    },
    {
      question: 'Which planet is known as the Red Planet?',
      answers: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 'Mars'
    },
    {
      question: 'What is the largest mammal?',
      answers: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
      correctAnswer: 'Blue Whale'
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      answers: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Homer'],
      correctAnswer: 'William Shakespeare'
    },
    {
      question: 'What is the currency of Japan?',
      answers: ['Yuan', 'Yen', 'Won', 'Ringgit'],
      correctAnswer: 'Yen'
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Display the current question and answers
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    $('#question-container').text(currentQuestion.question);
  
    const answerButtons = $('#answer-buttons');
    answerButtons.empty();
  
    currentQuestion.answers.forEach(answer => {
      const button = $('<button class="btn"></button>');
      button.text(answer);
      button.click(() => selectAnswer(answer));
      answerButtons.append(button);
    });
  }
  
  // Handle the selected answer
  function selectAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const resultContainer = $('#result-container');
  
    if (selectedAnswer === correctAnswer) {
      score++;
      $(`button:contains('${correctAnswer}')`).css('background-color', 'green');
    } else {
      $(`button:contains('${correctAnswer}')`).css('background-color', 'green');
      $(`button:contains('${selectedAnswer}')`).css('background-color', 'red');
    }
  
    // Disable buttons after an answer is selected
    $('#answer-buttons button').attr('disabled', true);
  
    // Show the submit button after a short delay
    $('#submit-button').show();
  
    resultContainer.hide();
  }
  
  // Move to the next question or display the result
  function submitAnswer() {
    // Enable buttons for the next question
    $('#answer-buttons button').attr('disabled', false);
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      // Reset button colors
      $('#answer-buttons button').css('background-color', '#3498db');
      $('#submit-button').hide();
      displayQuestion();
    } else {
      displayResult();
    }
  }
  
  // Display the final result and restart the quiz
  function displayResult() {
    const resultContainer = $('#result-container');
    const scoreText = `Your score: ${score}/${questions.length}`;
    resultContainer.text(scoreText);
    resultContainer.show();
  
    // Add a button to restart the quiz
    const restartButton = $('<button class="btn">Restart</button>');
    restartButton.click(resetQuiz);
    resultContainer.append(restartButton);
  }
  
  // Reset the quiz with new random questions
  function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
  
    // Enable buttons for the first question
    $('#answer-buttons button').attr('disabled', false);
  
    // Reset button colors
    $('#answer-buttons button').css('background-color', '#3498db');
    $('#submit-button').hide();
  
    // Hide the result container
    $('#result-container').hide();
  
    // Shuffle the questions for a new order
    shuffleQuestions();
  
    // Display the first question
    displayQuestion();
  }
  
  // Shuffle the order of questions
  function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
  }
  
  // Initialize the quiz
  $(document).ready(function () {
    shuffleQuestions();
    displayQuestion();
  });
  