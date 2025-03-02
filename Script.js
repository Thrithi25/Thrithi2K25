$(window).scroll(function () {
    $('nav').toggleClass('scrolled', $(this).scrollTop() > 20);
});

var countDownDate = new Date("March 20, 2025 10:00:00").getTime();
var timerElement = document.querySelector(".Timer-Style");

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

function typeEffect(element, phrases, speed = 100, eraseSpeed = 50, delay = 1500) {
    let index = 0;
    let charIndex = 0;
    let isTyping = true;
    const shouldErase = element.getAttribute("data-erase") !== "false"; 
    let hasStarted = false; // Track if animation has started

    function type() {
        if (charIndex < phrases[index].length && isTyping) {
            element.innerHTML = phrases[index].substring(0, charIndex + 1) + "_";
            charIndex++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
            element.innerHTML = phrases[index] + "_"; // Keep underscore after typing

            if (!shouldErase) {
                // If data-erase="false", remove the underscore after full typing
                setTimeout(() => {
                    element.innerHTML = phrases[index]; 
                }, 500);
            } else {
                // If erasing is enabled, remove the underscore and start erase effect
                setTimeout(() => {
                    element.innerHTML = phrases[index]; // Remove underscore before erasing
                    setTimeout(erase, delay);
                }, 500);
            }
        }
    }

    function erase() {
        if (charIndex > 0 && !isTyping) {
            element.innerHTML = phrases[index].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, eraseSpeed);
        } else {
            isTyping = true;
            index = (index + 1) % phrases.length;
            setTimeout(type, 500);
        }
    }

    function checkVisibility() {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top >= 0 && rect.top <= windowHeight && !hasStarted) {
            hasStarted = true; 
            type();
        }
    }

    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
}

// Apply effect only when element enters viewport
document.querySelectorAll(".typing-text").forEach((element) => {
    const phrases = element.getAttribute("data-phrases").split("|"); 
    typeEffect(element, phrases);
});