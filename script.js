let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25 minutos en segundos
let isWorkTime = true; // Inicia con el tiempo de trabajo

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');

// Función para formatear el tiempo
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsRemaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secondsRemaining).padStart(2, '0')}`;
}

// Iniciar o pausar el temporizador
function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    startPauseButton.textContent = "Iniciar";
  } else {
    timer = setInterval(updateTimer, 1000);
    startPauseButton.textContent = "Pausar";
  }
  isRunning = !isRunning;
}

// Función para actualizar el temporizador
function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = formatTime(timeLeft);

  if (timeLeft <= 0) {
    clearInterval(timer);
    alert(isWorkTime ? "¡Tiempo de descanso!" : "¡Hora de trabajar!");
    isWorkTime = !isWorkTime; // Cambia entre trabajo y descanso
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60; // 25 minutos de trabajo, 5 de descanso
    startPauseButton.textContent = "Iniciar";
    isRunning = false;
  }
}

// Reiniciar el temporizador
function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  timeDisplay.textContent = formatTime(timeLeft);
  startPauseButton.textContent = "Iniciar";
  isRunning = false;
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
