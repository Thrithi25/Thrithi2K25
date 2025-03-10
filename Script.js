// Enables swipe gestures (left/right) on all Bootstrap carousels for mobile devices.
document.addEventListener("DOMContentLoaded", function () {
    var carousels = document.querySelectorAll(".carousel");

    carousels.forEach(function (carousel) {
        var touchStartX = 0;
        var touchEndX = 0;

        carousel.addEventListener("touchstart", function (e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carousel.addEventListener("touchend", function (e) {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) {
                // Swipe left → Next slide
                $(carousel).carousel("next");
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right → Previous slide
                $(carousel).carousel("prev");
            }
        });
    });
});

// Adds or removes the 'scrolled' class on the navbar when the user scrolls past 20px.
$(window).scroll(function () {
    if ($(this).scrollTop() > 20) {
        $('.Navbar-Color').addClass('scrolled');
    } else {
        $('.Navbar-Color').removeClass('scrolled');
    }
});

// Event Start & End Times
var eventStartDate = new Date("March 20, 2025 10:30:00").getTime();
var eventEndDate = new Date("March 22, 2025 08:00:00").getTime();
var timerElement = document.querySelector(".Timer-Style");

const phrasesMap = {
    beforeStart: ["THRITHI 2K25", "Almost Here!"],
    live: ["THRITHI 2K25", "Happening Now!"],
    expired: ["THRITHI 2K25", "Until Next Time!"]
};

let currentPhase = ""; // Track current phase to prevent unnecessary updates

// Function to Update Timer & Manage Type Effect
function updateTimer() {
    let now = new Date().getTime();
    let distanceToStart = eventStartDate - now;
    let distanceToEnd = eventEndDate - now;
    let days, hours, minutes, seconds, newPhase;

    if (distanceToStart > 0) {
        // BEFORE EVENT STARTS
        days = Math.floor(distanceToStart / (1000 * 60 * 60 * 24));
        hours = Math.floor((distanceToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distanceToStart % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distanceToStart % (1000 * 60)) / 1000);
        newPhase = "beforeStart";
    } else if (distanceToEnd > 0) {
        // EVENT IS LIVE
        days = Math.floor(distanceToEnd / (1000 * 60 * 60 * 24));
        hours = Math.floor((distanceToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes = Math.floor((distanceToEnd % (1000 * 60 * 60)) / (1000 * 60));
        seconds = Math.floor((distanceToEnd % (1000 * 60)) / 1000);
        newPhase = "live";
    } else {
        // EVENT ENDED
        timerElement.innerHTML = ""; // Remove Timer
        newPhase = "expired";
    }

    // Update Timer Display
    if (distanceToEnd > 0) {
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    // Only update typing effect when phase changes
    if (newPhase !== currentPhase) {
        currentPhase = newPhase;
        updateTypingEffect(phrasesMap[currentPhase]);
    }
}

// Function to Manage Type Effect (Runs Only on Phase Change)
function updateTypingEffect(phrases) {
    document.querySelectorAll(".typing-text").forEach((element) => {
        typeEffect(element, phrases);
    });
}

// TypeEffect function
function typeEffect(element, phrases, speed = 100, eraseSpeed = 50, delay = 1500) {
    let index = 0;
    let charIndex = 0;
    let isTyping = true;
    let hasStarted = false;

    function type() {
        if (charIndex < phrases[index].length && isTyping) {
            element.innerHTML = phrases[index].substring(0, charIndex + 1) + "_";
            charIndex++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
            element.innerHTML = phrases[index] + "_";

            setTimeout(() => {
                element.innerHTML = phrases[index];
                setTimeout(erase, delay);
            }, 500);
        }
    }

    function erase() {
        // Stop erasing when "Until Next Time!" is fully typed
        if (currentPhase === "expired" && index === phrases.length - 1) {
            return; // Exit without erasing
        }
    
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

//Type Effect For Side Headings
function typeEffectSide(element, phrases, speed = 100, eraseSpeed = 50, delay = 1500) {
    let index = 0;
    let charIndex = 0;
    let isTyping = true;
    const shouldErase = element.getAttribute("data-erase") !== "false"; 
    let hasStarted = false;

    function type() {
        if (charIndex < phrases[index].length && isTyping) {
            element.innerHTML = phrases[index].substring(0, charIndex + 1) + "_";
            charIndex++;
            setTimeout(type, speed);
        } else {
            isTyping = false;
            element.innerHTML = phrases[index] + "_"; 

            if (!shouldErase) {
                setTimeout(() => {
                    element.innerHTML = phrases[index]; 
                }, 500);
            } else {
                setTimeout(() => {
                    element.innerHTML = phrases[index]; 
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

// Apply TypeEffect to Side Headings
document.querySelectorAll(".typing-side").forEach((element) => {
    const phrases = element.getAttribute("data-phrases").split("|"); 
    typeEffectSide(element, phrases);
});

// Start Timer & Typing Effect
setInterval(updateTimer, 1000);
updateTimer();

$(document).ready(function () {
    // Close navbar on clicking a nav link
    $(document).on('click', '.navbar-nav a', function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Close navbar when clicking outside in small devices
    $(document).click(function (event) {
        var clickover = $(event.target);
        var navbarOpen = $(".navbar-collapse").hasClass("show");
        if (navbarOpen === true && !clickover.closest('.navbar').length) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // Close navbar on scroll
    $(window).scroll(function () {
        $('.navbar-collapse').collapse('hide');
    });
});

//Alerts in registration form
function showAlert(message, type) {
    const alertContainer = document.getElementById("alertContainer");
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert" style="z-index: 1055;">
        ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;

    // Auto-hide alert after 7 seconds
    setTimeout(() => {
        $(".alert").alert('close');
    }, 7000);
}

//Download Alert
function showDownloadAlert() {
    const alertContainer = document.getElementById("alertContainer");
    
    alertContainer.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            📂 Brochure download started! Check your downloads folder.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;

    // Auto-hide alert after 5 seconds
    setTimeout(() => {
        $(".alert").alert('close');
    }, 5000);
}

//Events
const events = {
    tech: [{ name: "Open Mic", price: 299 }, { name: "Snap Verse", price: 299 }, { name: "Mini Games", price: 199 }, { name: "Control Cup", price: 199 }, { name: "Code Smells", price: 199 }, { name: "Chess With AI", price: 299 }, { name: "Mad Gab", price: 199 }, { name: "Escape Room ", price: 199 }, { name: "Spell-Bee", price: 199 }, { name: "Literacy Trivia", price: 199 }, { name: "BGMI Tournament", price: 299 }, { name: "Stand-Up Comedy & Reel Competition", price: 299 }, { name: "Micro Sport Challenge", price: 199 }, { name: "Canvas Arts", price: 199 }, { name: "Tech Hunt", price: 199 }, { name: "Fun Zone", price: 199 }, { name: "Retro Arena", price: 199 }, { name: "Tech Chamber", price: 299 }, { name: "Mortal Kombat X", price: 199 }, { name: "Lazer Maze", price: 199 }, { name: "COD Tournament", price: 299 }, { name: "ICFAI Premier League", price: 199 }, { name: "AI Music Challenge", price: 199 }, { name: "Triathlon", price: 199 }, { name: "Photo Scavenger Hunt", price: 299 }, { name: "Campus Bingo", price: 199 }, { name: "BookMark Studio", price: 199 }, { name: "RC Car Racing", price: 299 }, { name: "Corn Hole", price: 199 }, { name: "Art Expo Competition", price: 299 }, { name: "Words Of Wonder", price: 199 }],
    bba: [{ name: "Market Kshetra", price: 299 }, { name: "Rise to the Hammer", price: 299 }, { name: "Genesis", price: 299 }, { name: "Resolve 360", price: 299 },  { name: "Zero Hour", price: 299 },  { name: "KBC", price: 199 },  { name: "Market Masters", price: 199 }],
    law: [{ name: "Caricature", price: 199 }, { name: "Story Writing", price: 199 }, { name: "Treasure Hunt", price: 100 }, { name: "Tot Bag", price: 100 }, { name: "Exhibition", price: 199 }, { name: "Legathon", price: 100 }, { name: "Murder Mystery", price: 100 }, { name: "Mediation Competition", price: 500 }, { name: "Lip Sync", price: 149 }, { name: "Dumb Charades", price: 199 }, { name: "Extempore Public Speak", price: 149 }, { name: "Quiz Cometition", price: 149 },{ name: "E-Sports Valorant", price: 199 }, { name: "E-Sports Fifa", price: 199 }, { name: "Knight Rangers Club", price: 299 }, { name: "Quiz Cometition", price: 149 },{ name: "E-Sports F1 Simulator", price: 199 },],
    socialScience: [{ name: "Canvas Carnival", price: 200 }, { name: "Econ-Psych Shutdown", price: 399 }, { name: "Lens Legacy", price: 200 },{ name: "Flip The Argument", price: 299 }]
};

document.getElementById("schoolSelect").addEventListener("change", function () {
    const selectedSchool = this.value;
    const eventCheckboxes = document.getElementById("eventCheckboxes");
    eventCheckboxes.innerHTML = "";
    if (events[selectedSchool]) {
        events[selectedSchool].forEach((event) => {
            eventCheckboxes.innerHTML += `
              <div class="form-check">
                <input class="form-check-input event-checkbox" type="checkbox" value="${event.price}" onclick="updateTotalPrice()">
                <label class="form-check-label"> ${event.name} - ${event.price}/- </label>
              </div>`;
        });
    }
});

function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll(".event-checkbox:checked").forEach((checkbox) => {
        total += parseInt(checkbox.value);
    });
    document.getElementById("totalAmount").textContent = `${total}/-`;
}

document.getElementById("registrationForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let total = document.getElementById("totalAmount").textContent;
    let selectedEvents = document.querySelectorAll(".event-checkbox:checked").length;
    let submitButton = document.querySelector("#registrationForm button[type='submit']");

    if (selectedEvents === 0) {
        showAlert("⚠️ Please select at least one event before proceeding!", "danger");
        return;
    }

    submitButton.disabled = true;
    submitButton.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Processing...`;

    setTimeout(() => {
        showAlert(`✅ Registration Successful! Proceeding to Payment with amount: <strong>${total}</strong>`, "success");
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit & Proceed to Payment";
    }, 2000);
});



//File Upload Alert
function handleFileUpload(inputId, containerId) {
    document.getElementById(inputId).addEventListener("change", function () {
        let file = this.files[0];
        if (file) {
            let fileDisplay = `
          <div class="file-container">
            📄 <strong>${file.name}</strong> 
            <span class="remove-file ml-2" onclick="removeFile('${inputId}', '${containerId}')">Remove</span>
          </div>`;
            document.getElementById(containerId).innerHTML = fileDisplay;

            showAlert(`📂 <strong>${file.name}</strong> uploaded successfully.`, "info");
        }
    });
}


function removeFile(inputId, containerId) {
    document.getElementById(inputId).value = ""; // Reset file input
    document.getElementById(containerId).innerHTML = ""; // Clear file display
}

// Apply to both file inputs
handleFileUpload("collegeID", "collegeFileContainer");
handleFileUpload("aadhaarID", "aadhaarFileContainer");

document.addEventListener("DOMContentLoaded", function () {
    var scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = "1"; // Fade in
            scrollTopBtn.style.visibility = "visible";
        } else {
            scrollTopBtn.style.opacity = "0"; // Fade out
            scrollTopBtn.style.visibility = "hidden";
        }
    });

    // Scroll to Top Function
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    scrollTopBtn.addEventListener("click", scrollToTop);
});





