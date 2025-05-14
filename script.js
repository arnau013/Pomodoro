let timer;
let isRunning = false;
let isWorkTime = true;
let duration; // Tiempo en segundos
let timeLeft;
let startTimestamp;
let pausedTime = 0;

const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const timeDisplay = document.getElementById('time');
const inputTime = document.getElementById('inputTime');

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function toggleTimer() {
  // Verificar si hay tiempo ingresado
  if (inputTime.value && inputTime.value > 0) {
    if (!isRunning) {
      duration = parseInt(inputTime.value) * 60; // Convertir a segundos
      timeLeft = duration;
      startTimestamp = Date.now();
      timer = setInterval(updateTimer, 1000);
      isRunning = true;
      startPauseButton.textContent = 'PAUSA';
    } else {
      clearInterval(timer);
      pausedTime += Math.floor((Date.now() - startTimestamp) / 1000);
      isRunning = false;
      startPauseButton.textContent = 'ON';
    }
  } else {
    alert("Por favor, ingresa un tiempo válido en minutos.");
  }
}

function updateTimer() {
  const elapsed = Math.floor((Date.now() - startTimestamp) / 1000) + pausedTime;
  const remaining = timeLeft - elapsed;

  if (remaining <= 0) {
    clearInterval(timer);
    alert(isWorkTime ? '¡Tiempo de descanso!' : '¡Hora de trabajar!');
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 1800 : 300; // 30 min o 5 min
    pausedTime = 0;
    isRunning = false;
    timeDisplay.textContent = formatTime(timeLeft);
    startPauseButton.textContent = 'ON';
  } else {
    timeDisplay.textContent = formatTime(remaining);
  }
}

function resetTimer() {
  clearInterval(timer);
  isWorkTime = true;
  pausedTime = 0;
  timeLeft = duration; // Mantener el tiempo actual
  isRunning = false;
  timeDisplay.textContent = formatTime(timeLeft);
  startPauseButton.textContent = 'ON';
}

startPauseButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

// Mostrar tiempo inicial
timeDisplay.textContent = formatTime(timeLeft || 0);
