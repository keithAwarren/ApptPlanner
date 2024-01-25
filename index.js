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

function updateDateTime() {
    const dateTimeDisplay = document.querySelector('.dateTimeDisplay');
    const now = new Date();

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    };

    const formattedDateTime = now.toLocaleDateString('en-US', options);
    dateTimeDisplay.textContent = formattedDateTime;

    const hour = now.getHours();
    const backgroundColor = getBackgroundColor(hour);
    dateTimeDisplay.style.backgroundColor = backgroundColor;
}

function getBackgroundColor(hour) {
    if (hour < 12) {
        return 'rgba(76, 175, 80, 0.6)'; // Morning color
    } else if (hour < 18) {
        return 'rgba(255, 193, 7, 0.6)'; // Afternoon color
    } else {
        return 'rgba(33, 150, 243, 0.6)'; // Evening color
    }
}

// Event Listeners
if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu);
}

if (timeInput) {
    flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });
}

// Add click event listener to "showFormButton" elements
showFormButtons.forEach((button) => {
    button.addEventListener("click", showFormButtonClickHandler);
});

// Add click event listener to "close-button" elements
closeButtons.forEach((button) => {
    button.addEventListener("click", closeButtonClickHandler);
});

setInterval(updateDateTime, 1000);
