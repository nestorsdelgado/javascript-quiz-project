document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  let minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  let seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  //let timer;



  function showTimer() {

    if (quiz.timeRemaining != quizDuration) {
      quiz.timeRemaining = quizDuration
      minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
      seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
      timeRemainingContainer.innerText = `${minutes}:${seconds}`;
    }

    timer = setInterval(() => {
      // si el tiempo es mayor que 0 continuar restando cada segundo y actualizando el timeRemaining  y el timer text
      if (quiz.timeRemaining > 0) {

        quiz.timeRemaining--
        minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
        seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");
        timeRemainingContainer.innerText = `${minutes}:${seconds}`;

      } else {

        //Paramos de contar cuando se acaba el tiempo y mostramos el resultado
        clearInterval(timer);
        showResults()
      }
    }, 1000)

  }





  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);



  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  showTimer()

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      clearInterval(timer)
      showResults();
      return;
    }

    // Clear the previous question text and question choices

    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    question.shuffleChoices();



    // YOUR CODE HERE:
    //
    // 1. Show the question
    // Update the inner text of the question container element and show the question text
    questionContainer.innerText = question.text


    // 2. Update the green progress bar
    // Update the green progress bar (div#progressBar) width so that it shows the percentage of questions answered

    //progressBar.style.width = `65%`; // This value is hardcoded as a placeholder

    progressBar.style.width = `${(((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100)}%`


    // 3. Update the question count text 
    // Update the question count (div#questionCount) show the current question out of total questions

    //questionCount.innerText = `Question 1 of 10`; //  This value is hardcoded as a placeholder

    questionCount.innerText = `Question ${(quiz.currentQuestionIndex + 1)} of ${(quiz.questions.length)}`; //  This value is hardcoded as a placeholder



    // 4. Create and display new radio input element with a label for each choice.

    question.choices.forEach(choice => {
      const choiceElement = document.createElement("input")
      choiceElement.type = "radio"
      choiceElement.name = "choice"
      choiceElement.value = choice
      choiceElement.className = "eleccion"
      choiceContainer.appendChild(choiceElement)

      const labelElement = document.createElement("label")
      labelElement.innerText = choice
      choiceContainer.appendChild(labelElement)

      const brElement = document.createElement("br")
      choiceContainer.appendChild(brElement)

    })

  }



  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer value


    // YOUR CODE HERE:
    //
    // 1. Get all the choice elements. You can use the `document.querySelectorAll()` method.

    const listaRespuestas = [...document.querySelectorAll(".eleccion")]

    // 2. Loop through all the choice elements and check which one is selected
    // Hint: Radio input elements have a property `.checked` (e.g., `element.checked`).
    //  When a radio input gets selected the `.checked` property will be set to true.
    //  You can use check which choice was selected by checking if the `.checked` property is true.

    listaRespuestas.forEach(respuesta => {

      if (respuesta.checked) {
        selectedAnswer = respuesta.value
      }
    });

    // 3. If an answer is selected (`selectedAnswer`), check if it is correct and move to the next question
    // Check if selected answer is correct by calling the quiz method `checkAnswer()` with the selected answer.
    // Move to the next question by calling the quiz method `moveToNextQuestion()`.
    // Show the next question by calling the function `showQuestion()`.

    quiz.checkAnswer(selectedAnswer)

    quiz.moveToNextQuestion();
    showQuestion()
  }


  function showResults() {

    // YOUR CODE HERE:
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions

    //resultContainer.innerText = `You scored 1 out of 1 correct answers!`; // This value is hardcoded as a placeholder
    resultContainer.innerText = `You scored ${(quiz.correctAnswers)} out of ${(quiz.questions.length)} correct answers!`; // This value is hardcoded as a placeholder

  }

  // Implement a Restart Quiz button
  const botonReinicio = document.getElementById("restartButton");

  botonReinicio.addEventListener('click', () => {

    //location.reload() // -> Opción rápida pero no la más correcta

    quiz.currentQuestionIndex = 0
    quiz.correctAnswers = 0
    clearInterval(timer)
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.shuffleQuestions()
    showQuestion()
    showTimer()
  });


});