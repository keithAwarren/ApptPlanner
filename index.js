// Variables
const mobileMenuButton = document.querySelector(".burgerButton");
const timeInput = document.getElementById("time");
const showFormButtons = document.querySelectorAll(".pageLinksMoblie");
const closeButtons = document.querySelectorAll(".closeButton");

// Functions
function toggleMobileMenu() {
    const mobileMenu = document.querySelector(".mobileMenu");
    mobileMenu.classList.toggle("show-mobile-menu");
}

function showFormButtonClickHandler() {
    const targetId = this.getAttribute("data-target");
    const modal = document.getElementById(targetId);
    modal.style.display = "block";
}

function closeButtonClickHandler() {
    const targetModalId = this.getAttribute("data-modal");
    const modal = document.getElementById(targetModalId);
    modal.style.display = "none";
}

if (timeInput) {
    flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    });
}

// Event listeners

// Add click event listener to "mobileMenu" elements
if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu)
}

// Add click event listener to "showFormButton" elements
showFormButtons.forEach((button) => {
    button.addEventListener("click", showFormButtonClickHandler);
});

// Add click event listener to "close-button" elements
closeButtons.forEach((button) => {
    button.addEventListener("click", closeButtonClickHandler);
});

// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

if (window.location.href.includes('appts.html')) {
// Update the clock every second
setInterval(updateClock, 1000);
}
