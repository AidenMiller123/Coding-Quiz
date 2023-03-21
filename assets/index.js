var startBtn = document.getElementById('start-button')
    runningScore = 0;
   
startBtn.addEventListener('click', startGame);



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
    question: "Which CSS property is used to chnage the color of text",
    options: ["1. font-size", "2. color", "3. background-color", "4. text-align"],
    answer: 1 
  },
  {
    question: "Which of the following is a valid way to declare an array in JavaScript?",
    options: ["1. let arr = [1, 2, 3]", "2. let arr = {1, 2, 3}", "3. let arr = (1, 2, 3", "4. let arr = '1, 2, 3' " ],
    answer: 0 
  }
];


function startGame () {
  countdown();
  generateQuestion();
}


var timer = document.querySelector('.timerText')
function countdown () {
  
   timeLeft = 60;
  
   timeInterval = setInterval(function() {
    if (timeLeft > 0) {
      timer.textContent = timeLeft;
      timeLeft--;
    }else if (timeLeft === 0){
      clearInterval(timeInterval);
      timer.textContent = "";
    }

  }, 1000)

}


var questionIndex = 0

function generateQuestion() {
  var questionDiv = document.getElementById("question")
  var answerDiv = document.getElementById("options")
  pg1 = document.getElementById("startPage")
  pg1.style.display = "none";
  var question = quiz[questionIndex].question;
   var options = quiz[questionIndex].options;
   questionDiv.textContent = question;
   answerDiv.textContent = "";
  console.log(quiz[questionIndex].question)

  for(var i = 0; i < options.length; i++) {
    var optionBtn = document.createElement("button");
    optionBtn.innerHTML = options[i];
    optionBtn.setAttribute("data-index", i);
    optionBtn.setAttribute("id", "optionBtn")
    optionBtn.addEventListener("click", checkAnswer);
    answerDiv.appendChild(optionBtn);
  }
  
}
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
  }
  nextQuestion();
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex < quiz.length) {
    generateQuestion();
  } else {
    finishedPageDisplay();
    endQuiz()
  }
}

function finishedPageDisplay() {
  finishedPage = document.getElementById('finished')
  finishedPage.style.display = "block";
  questionArea = document.getElementById('questionArea')
  questionArea.style.display = "none";
  scoreDisplay()
}

 function scoreDisplay() {
  score = document.getElementById('runningScore')
   score.innerHTML = runningScore
 }

function userStorage(event){
  event.preventDefault()
  
  var userInput = initals.value + ":" + runningScore
  console.log("User Input: " + userInput);
  var existLocal = localStorage.getItem("HighScores");
  if (existLocal === null) {
    localStorage.setItem("HighScores","[]");
  }
  parsedLoc = JSON.parse(localStorage.getItem("HighScores"));
  console.log("Before:  " + parsedLoc);
  parsedLoc.push(userInput);
  console.log("After:  " + parsedLoc);
  localStorage.setItem("HighScores",JSON.stringify(parsedLoc));
  finishedPage.style.display = "none";
  highscores();
}

var submitInitals = document.getElementById('submitInitals')
submitInitals.addEventListener('click', userStorage)




function highscores() {
  var highscoresPage = document.getElementById('highscores')
  highscoresPage.style.display = "block"
  var startPage = document.getElementById('startPage')
  startPage.style.display = 'none';

  parsedLoc = JSON.parse(localStorage.getItem("HighScores"));
  console.log("highscores function: " + parsedLoc.length);
  var ul = document.getElementById("highscoreList");
  var li = "";
  var text="";
  for (i = 0; i < parsedLoc.length; i++) {
     var hiScores = parsedLoc[i];
       li = document.createElement("li");
       text = document.createTextNode(hiScores); 
       li.appendChild(text);
       ul.appendChild(li);
  
   }
}

function clearStorage() {
  localStorage.clear()
}

function endQuiz () {
  clearInterval(timeInterval)
  timer.textContent = "";
}

function goBack() {
  document.location.reload()
  var highscoresPage = document.getElementById('highscores')
  highscoresPage.style.display = "none"
}


var clearHighscores = document.getElementById('clearHighscores')
clearHighscores.addEventListener('click', clearStorage)
var highscoresBtn = document.getElementById('highscoresBtn')
highscoresBtn.addEventListener('click', highscores)
var goBackBtn = document.getElementById('goBackBtn')
goBackBtn.addEventListener('click', goBack)