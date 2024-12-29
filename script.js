// Set the date we're counting down to
const newYear = new Date("January 1, 2025 00:00:00").getTime();

// Custom Music Files
const countdownMusic = new Audio("countdown_music.mp3"); // Your countdown music
const newYearMusic = new Audio("new_year_music.mp3"); // Your New Year music

// Firework sound effect
const fireworkSound = new Audio("firework_sound.mp3"); // Firework sound effect
fireworkSound.volume = 0.5;

// Set up button state
let countdownEnded = false;

// Button to trigger New Year music
const startBtn = document.getElementById("start-btn");
startBtn.addEventListener("click", function () {
  if (countdownEnded) {
    playNewYearMusic(); // Play New Year music when button is clicked after countdown ends
    startBtn.disabled = true; // Disable the button once the music is playing
  }
});

// Add a click event listener to the start button to trigger countdown music
startBtn.addEventListener("click", function () {
  if (!countdownEnded) {
    startCountdown(); // Start the countdown music when the button is clicked
  }
});

// Start Countdown and Countdown Music
function startCountdown() {
  countdownMusic.play(); // Play countdown music when the countdown starts

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = newYear - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById(
      "countdown"
    ).innerHTML = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
      clearInterval(countdownFunction);
      document.getElementById("countdown").innerHTML = "It's 2025! 🎉🎆";
      displayFireworks();
      showLoveMessage();
      playFireworkSound();
      changeBackgroundColor("#800000"); // Custom background color after countdown
      countdownMusic.pause(); // Stop countdown music
      countdownMusic.currentTime = 0; // Reset countdown music
      countdownEnded = true; // Mark countdown as ended
      startBtn.disabled = false; // Enable the button after countdown ends
    }
  }, 1000);
}

function displayFireworks() {
  const container = document.getElementById("fireworks-container");
  container.style.opacity = 1;

  // Firework effect (already in place)
  for (let i = 0; i < 10; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.style.left = `${Math.random() * 100}vw`;
    firework.style.top = `${Math.random() * 100}vh`;
    container.appendChild(firework);
  }

  // Confetti effect
  const confettiContainer = document.getElementById("confetti-container");
  confettiContainer.style.opacity = 1;

  for (let i = 0; i < 100; i++) {
    const confettiPiece = document.createElement("div");
    confettiPiece.classList.add("confetti");
    confettiPiece.style.left = `${Math.random() * 100}vw`;
    confettiPiece.style.animationDelay = `${Math.random() * 2}s`; // Stagger the animation
    confettiContainer.appendChild(confettiPiece);
  }
}

function showLoveMessage() {
  const message = document.getElementById("love-message");
  message.innerHTML =
    "I love you mostestest, and I can't wait to spend more years with you! 💖 Counting days till I see you.";
  message.style.opacity = 1;
}

function playFireworkSound() {
  fireworkSound.play();
}

function playNewYearMusic() {
  newYearMusic.loop = true;
  newYearMusic.play();
}

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}
