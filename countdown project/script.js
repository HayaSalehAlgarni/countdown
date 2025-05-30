const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let countdown;
let timeLeft = 0;
let initialTime = 0;
let isRunning = false;

function updateDisplay(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  document.getElementById("hours").textContent = hrs.toString().padStart(2, '0');
  document.getElementById("minutes").textContent = mins.toString().padStart(2, '0');
  document.getElementById("seconds").textContent = secs.toString().padStart(2, '0');
}

function updateRingProgress() {
  const circle = document.querySelector(".ring");
  if (!circle || initialTime === 0) return;

  const progress = timeLeft / initialTime;
  const offset = 722 * (1 - progress); // 722 = 2 * π * r (r = 115)
  circle.style.strokeDashoffset = offset;
}

startBtn.addEventListener("click", () => {
  if (isRunning) return;

  const h = parseInt(document.getElementById("input-hours").value) || 0;
  const m = parseInt(document.getElementById("input-minutes").value) || 0;
  const s = parseInt(document.getElementById("input-seconds").value) || 0;

  timeLeft = h * 3600 + m * 60 + s;
  initialTime = timeLeft;

  if (timeLeft <= 0) return;

  isRunning = true;
  updateDisplay(timeLeft);
  updateRingProgress();

  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      isRunning = false;
      return;
    }
    timeLeft--;
    updateDisplay(timeLeft);
    updateRingProgress();
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(countdown);
  isRunning = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(countdown);
  isRunning = false;
  timeLeft = 0;
  initialTime = 0;
  updateDisplay(0);
  updateRingProgress();

  document.getElementById("input-hours").value = "00";
  document.getElementById("input-minutes").value = "00";
  document.getElementById("input-seconds").value = "00";
});