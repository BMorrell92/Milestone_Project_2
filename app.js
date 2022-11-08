const playpause = document.querySelector('.playpause');

playpause.addEventListener('click', () => {
  playpause.classList.toggle('playing');
});


let myAudios = document.querySelector(".all-audios");
let selected = "ocean";
let myAudio = myAudios.querySelector(`[data-audio = "${selected}"]`);

//COUNTDOWN TIMER
const FULL_DASH_ARRAY = 283;
const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;

//All buttons
let choiceBtn = document.querySelectorAll(".time-select");
let baseTimer = document.querySelector(".base-timer");
let pauseBtn = document.querySelector(".base-timer .pause-btn");

//DOM elements
let timer = document.querySelector("#base-timer-path-remaining");
let timeLabel = document.getElementById("base-timer-label");

baseTimer.addEventListener("click", control);

//Time related vars
let TIME_LIMIT = 60 * 5; //in seconds
let timePassed = -1;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

// Pause & Replay
function control() {
  if (myAudio.paused) {
    myAudio.play();
    startTimer();
    pauseBtn.style.display = "none";
    timeLabel.style.display = "flex";
  } else {
    stop();
    myAudio.pause();
    pauseBtn.style.display = "flex";
    timeLabel.style.display = "none";
  }
}

//reset the sound and timer
function reset() {
  clearInterval(timerInterval);
  resetVars();
  timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
  myAudio.load();
}

// start the sound and timer
function start() {
  if (myAudio.paused) {
    pauseBtn.style.display = "none";
    timeLabel.style.display = "flex";
  }
  reset();
  TIME_LIMIT = document.querySelector("input[name='time']:checked").value;
  timeLeft = TIME_LIMIT;
  timeLabel.innerHTML = formatTime(timeLeft);
  selected = document.querySelector("input[name='sound']:checked").value;
  myAudio = myAudios.querySelector(`[data-audio = "${selected}"]`);
  document.querySelector("body").classList.add(selected);
  myAudio.play();
  startTimer();
}

// stop the timer
function stop() {
  clearInterval(timerInterval);
}

//start the timer
function startTimer() {
  timerFunction();
  timerInterval = setInterval(timerFunction, 1000);
}

function timerFunction() {
  timePassed = timePassed += 1;
  timeLeft = TIME_LIMIT - timePassed;
  timeLabel.innerHTML = formatTime(timeLeft);
  setCircleDasharray();

  if (timeLeft === 0) {
    timeIsUp();
  }
}

window.addEventListener("load", () => {
  timeLabel.innerHTML = formatTime(TIME_LIMIT);
});
