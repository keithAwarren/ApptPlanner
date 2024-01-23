// Variables
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const timeInput = document.getElementById("time");
const showFormButtons = document.querySelectorAll(".showFormButton");
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
