const countDownDate = new Date("Feb 27, 2025 00:00:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.querySelector(".countdown-container").innerHTML =
      "<h2>Together at last! ❤️</h2>";
  }
};

updateCountdown();
const x = setInterval(updateCountdown, 1000);
function createHeart() {
  const heart = document.createElement("div");
  heart.innerHTML = "❤️";
  heart.style.position = "fixed";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = "-20px";
  heart.style.opacity = "0.6";
  heart.style.animation = `float-up ${Math.random() * 3 + 2}s linear forwards`;
  document.querySelector(".floating-hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}
