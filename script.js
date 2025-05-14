let timer;
let isRunning = false;
let timeLeft = 1800;
let isWorkTime = true;
let startTime; // timestamp de cuando inició
let pausedTime = 0; // segundos acumulados en pausa

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    pausedTime += Math.floor((Date.now() - startTime) / 1000);
    startPauseButton.textContent = "Iniciar";
    isRunning = false;
  } else {
    startTime = Date.now();
    timer = setInterval(updateTimer, 1000);
    startPauseButton.textContent = "Pausar";
    isRunning = true;
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTime) / 1000) + pausedTime;
  const newTimeLeft = timeLeft - elapsed;

  if (newTimeLeft <= 0) {
    clearInterval(timer);
    alert(isWorkTime ? "¡Tiempo de descanso!" : "¡Hora de trabajar!");
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 1800 : 300;
    timeDisplay.textContent = formatTime(timeLeft);
    startPauseButton.textContent = "Iniciar";
    isRunning = false;
    pausedTime = 0;
  } else {
    timeDisplay.textContent = formatTime(newTimeLeft);
  }
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 1800;
  isWorkTime = true;
  pausedTime = 0;
  timeDisplay.textContent = formatTime(timeLeft);
  startPauseButton.textContent = "Iniciar";
  isRunning = false;
}
  
startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);


