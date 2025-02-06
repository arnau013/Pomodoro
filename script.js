let timer;
let isRunning = false;
let timeLeft = 30; // 30 segundos de trabajo
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
    timeLeft = isWorkTime ? 30 : 10; // 30 segundos de trabajo, 10 segundos de descanso
    startPauseButton.textContent = "Iniciar";
    isRunning = false;
  }
}

// Reiniciar el temporizador
function resetTimer() {
  clearInterval(timer);
  timeLeft = 30; // Comienza nuevamente con 30 segundos de trabajo
  timeDisplay.textContent = formatTime(timeLeft);
  startPauseButton.textContent = "Iniciar";
  isRunning = false;
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
