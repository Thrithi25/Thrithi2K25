document.addEventListener("DOMContentLoaded", function () {
    var navbarToggler = document.querySelector(".navbar-toggler");
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function () {
        if (!navbarCollapse.classList.contains("show")) {
            // Show smoothly
            navbarCollapse.style.display = "block";
            setTimeout(() => {
                navbarCollapse.classList.add("show");
            }, 10); // Small delay to apply animation
        } else {
            // Hide smoothly
            navbarCollapse.classList.remove("show");
            setTimeout(() => {
                navbarCollapse.style.display = "none";
            }, 400); // Matches the CSS transition duration
        }
    });
});

var countDownDate = new Date("March 20, 2025 10:00:00").getTime();
var timerElement = document.querySelector(".Timer-Style");
const textElement = document.getElementById("dynamic-text");
const phrases = ["THRITHI 2K25","Event Starts In"];
let index = 0;
let charIndex = 0;
let isTyping = true;

function updateTimer() {
    let now = new Date().getTime();
    let distance = countDownDate - now;
  
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    if (distance < 0) {
        timerElement.innerHTML = "EXPIRED";
    } else {
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

// Ensure timer is updated every second
setInterval(updateTimer, 1000);
updateTimer();

// Separate text container from timer to prevent movement
function typeEffect() {
    if (charIndex < phrases[index].length && isTyping) {
        textElement.innerHTML = phrases[index].substring(0, charIndex + 1);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        isTyping = false;
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (charIndex > 0 && !isTyping) {
        textElement.innerHTML = phrases[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        isTyping = true;
        index = (index + 1) % phrases.length;
        setTimeout(typeEffect, 500);
    }
}

typeEffect();
