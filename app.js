// const playpause = document.querySelector('.playpause');

// playpause.addEventListener('click', () => {
//   playpause.classList.toggle('playing');
// });

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
let playBtn = document.querySelector(".base-timer .play-btn");

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
    start();
    pauseBtn.style.display = "none";
    playBtn.style.display = "none";
    timeLabel.style.display = "flex";
  } else {
    stop();
    myAudio.pause();
    pauseBtn.style.display = "flex";
    timeLabel.style.display = "none";
  }
}

//reset & update the sound and timer
function reset() {
  clearInterval(timerInterval);
  resetVars(); // Reset & update the time
  myAudio.load(); // Reset the audio
  setAudio();  // Update the audio
  timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY); // Reset the timer circle
  playBtn.style.display = "flex";
  pauseBtn.style.display = "none";
  timeLabel.style.display = "none";
}

// start the sound and timer
function start() {
  setTime();
  setAudio()
  myAudio.play();
  startTimer();
}

// set time 
function setTime() {
  TIME_LIMIT = document.querySelector("input[name='time']:checked").value;
  timeLeft = TIME_LIMIT;
  timeLabel.innerHTML = formatTime(timeLeft);
}

// set audio and background
function setAudio() {
  selected = document.querySelector("input[name='sound']:checked").value;
  myAudio = myAudios.querySelector(`[data-audio = "${selected}"]`);
  document.querySelector("body").className = '';
  document.querySelector("body").classList.add(selected);
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

//---------------------------------------------
//HELPER METHODS
//---------------------------------------------

function timeIsUp() {
  clearInterval(timerInterval);
  myAudio.pause();
  reset();
}

// Reset the time
function resetVars() {
  timePassed = -1;
  setTime();
}

//Convert seconds to minutes format
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${minutes}:${seconds}`;
}

// These 2 functions are for updating SVG stroke-dasharray
function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  timer.setAttribute("stroke-dasharray", circleDasharray);
}