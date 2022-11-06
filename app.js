
const app = () => {
  const sound = document.querySelector('.sound');
  const video = document.querySelector('.vid-container video');
  const playpause = document.querySelector('.playpause');

playpause.addEventListener('click', () => {
  playpause.classList.toggle('playing');
});


  //Sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //Time Display
  const timeDisplay = document.querySelector('.time-display');
  //Duration
  const timeSelect = document.querySelectorAll(".time-select button");
  let fakeDuration = 600;

  timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60
)}`;

  //play sound
  playpause.addEventListener("click", () => {
    sound.play();
  });

};

app();