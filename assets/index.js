//  Declares start button as variable 
var startBtn = document.getElementById('start-button')
// Declares runningscore and sets it to zero
var runningScore = 0;  
// Puts all my quiz questions and answers in an array which can be called later
var quiz = [
  {
    question: "To store multiple values in a variable you would use a what?",
    options: ["1. int var", "2. Function", "3. Multivar", "4. Array"],
    answer: 3 
  },
  {
    question: "How would you declare a variable in Javascript?",
    options: ["1. var", "2. function", "3. declare", "4. dec"],
    answer: 0 
  },
  {
    question: "What does CSS stand for?",
    options: ["1. Creative Style Sheets", "2. Computer Style Sheets", "3. Colorful Style Sheets", "4. Cascading Style Sheets"],
    answer: 3 
  },
  {
    question: "Which CSS property is used to change the color of text",
    options: ["1. font-size", "2. color", "3. background-color", "4. text-align"],
    answer: 1 
  },
  {
    question: "Which of the following is a valid way to declare an array in JavaScript?",
    options: ["1. let arr = [1, 2, 3]", "2. let arr = {1, 2, 3}", "3. let arr = (1, 2, 3", "4. let arr = '1, 2, 3' " ],
    answer: 0 
  }
];
// Event listner to run start game function when start game button is clicked
startBtn.addEventListener('click', startGame);
// start game function starts the timer and generates the first question
function startGame () {
  countdown();
  generateQuestion();
}
// Declaring timer as a variable and setting it to the empty div
var timer = document.querySelector('.timerText')
// timeLeft is set to 60 so that the timer will start with 60 seconds
timeLeft = 60;
// countdown function sets the timer and has it decreasing every second
function countdown () {
   timeInterval = setInterval(function() {
    if (timeLeft > 0) {
      timer.textContent = timeLeft;
      timeLeft--;
    }else if (timeLeft === 0){
      clearInterval(timeInterval);
      timer.textContent = "";
      finishedPageDisplay();
    }
  }, 600)
}
// Declares questionIndex as a variable and sets it to 0
var questionIndex = 0
// generate question function will generate one of the questions I have created when called
function generateQuestion() {
  var questionDiv = document.getElementById("question")
  var answerDiv = document.getElementById("options")
  pg1 = document.getElementById("startPage")
  pg1.style.display = "none";
  var question = quiz[questionIndex].question;
  var options = quiz[questionIndex].options;
  questionDiv.textContent = question;
  answerDiv.textContent = "";
// this for loop goes through each option for a question and creates a button for it
  for(var i = 0; i < options.length; i++) {
    var optionBtn = document.createElement("button");
    optionBtn.innerHTML = options[i];
    optionBtn.setAttribute("data-index", i);
    optionBtn.setAttribute("id", "optionBtn")
    optionBtn.setAttribute("class", "optionBtn")
    optionBtn.addEventListener("click", checkAnswer);
    answerDiv.appendChild(optionBtn);
  }
}
// check answer function checks users answer and runs it through based on if it was correct
function checkAnswer() {
  var selectedOptionIndex = parseInt(this.getAttribute("data-index"));
  var correctOptionIndex = quiz[questionIndex].answer;
  if (selectedOptionIndex === correctOptionIndex) {
    var answerStatus = document.getElementById("answerStatus");
    answerStatus.textContent = "Correct!"
    runningScore++;
  } else {
    var answerStatus = document.getElementById("answerStatus");
    answerStatus.textContent = "Incorrect!"
    timeLeft -= 10;
  }
  nextQuestion(); // calls next question function
}
// nextquestion function generates the next question
function nextQuestion() {
  questionIndex++;
  if (questionIndex < quiz.length) {
    generateQuestion();
  } else { // if no questions are left then it will run these functions
    finishedPageDisplay();
    endQuiz()
  }
}
// this function displays finshed page
function finishedPageDisplay() {
  finishedPage = document.getElementById('finished')
  finishedPage.style.display = "block";
  questionArea = document.getElementById('questionArea')
  questionArea.style.display = "none";
  scoreDisplay() // runs the scoreDisplay function
}
//  This function displays the users score at the end of the quiz
 function scoreDisplay() {
  score = document.getElementById('runningScore')
   score.innerHTML = runningScore
 }
// user storage functioin is storing the users initals and score into our local storage
function userStorage(event){
  event.preventDefault()
  var userInput = initals.value + " : " + runningScore
  var existLocal = localStorage.getItem("HighScores");
  if (existLocal === null) {
    localStorage.setItem("HighScores","[]");
  }
  parsedLoc = JSON.parse(localStorage.getItem("HighScores"));
  parsedLoc.push(userInput);
  localStorage.setItem("HighScores",JSON.stringify(parsedLoc));
  finishedPage.style.display = "none";
  highscores();
}
// Declaring ul as global variable and setting it at the highscore list div
var ul = document.getElementById("highscoreList");
// highscores function displays the initals and scores that were stored in local storage
function highscores() {
  var highscoresPage = document.getElementById('highscores')
  highscoresPage.style.display = "block"

  var startPage = document.getElementById('startPage')
  startPage.style.display = 'none';

  parsedLoc = JSON.parse(localStorage.getItem("HighScores"));

  var li = "";
  var text="";
  
  for (i = 0; i < parsedLoc.length; i++) { // loops creates a list for highscores display
     var hiScores = parsedLoc[i];
       li = document.createElement("li");
       li.classList.add("highscoreInd")
       text = document.createTextNode(hiScores); 
       li.appendChild(text);
       ul.appendChild(li);
   }
}
// function clears local storage and sets highscore display list back to blank
function clearStorage() {
  localStorage.clear()
  ul.textContent = ""
}
// function clears timer interval and sets its content to blank
function endQuiz () {
  clearInterval(timeInterval)
  timer.textContent = "";
}
// function reloads the page and takes user back to start page
function goBack() {
  document.location.reload()
  var highscoresPage = document.getElementById('highscores')
  highscoresPage.style.display = "none"
}
// these are my eventlistners that run functions when they are clicked
var submitInitals = document.getElementById('submitInitals')
submitInitals.addEventListener('click', userStorage)

var clearHighscores = document.getElementById('clearHighscores')
clearHighscores.addEventListener('click', clearStorage)

var highscoresBtn = document.getElementById('highscoresBtn')
highscoresBtn.addEventListener('click', highscores)

var goBackBtn = document.getElementById('goBackBtn')
goBackBtn.addEventListener('click', goBack)
