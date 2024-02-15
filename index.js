// Variables
const mobileMenuButton = document.querySelector(".burgerButton"); // Button to toggle mobile menu
const timeInput = document.getElementById("time"); // Input field for time
const showFormButtons = document.querySelectorAll(".pageLinksMoblie"); // Buttons to show forms
const closeButtons = document.querySelectorAll(".closeButton"); // Buttons to close modals
const currentWeekAppointments = document.getElementById("currentWeekAppointments"); // Container for displaying current week's appointments

// Functions
// Function to toggle the visibility of the mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.querySelector(".mobileMenu");
    mobileMenu.classList.toggle("show-mobile-menu");
}

// Function to handle click events on buttons that show forms
function showFormButtonClickHandler() {
    const targetId = this.getAttribute("data-target");
    const modal = document.getElementById(targetId);
    modal.style.display = "block";
}

// Function to handle click events on close buttons in modals
function closeButtonClickHandler() {
    const targetModalId = this.getAttribute("data-modal");
    const modal = document.getElementById(targetModalId);
    modal.style.display = "none";
}

// Initialize flatpickr for time input field, if it exists
if (timeInput) {
    flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    });
}

// Function to update the clock displayed on the page
function updateClock() {
    const clockElement = document.getElementById("clock");
    if (clockElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

// Function to render appointments for the current week
function renderCurrentWeekAppointments() {
    const currentWeekAppointments = document.getElementById("currentWeekAppointments");
    if (!currentWeekAppointments) {
        // If the element doesn't exist, return early or handle it in another way
        return;
    }

    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay); // Set to Sunday of the current week

    // Create HTML for displaying appointments for each day of the current week
    let weekAppointmentsHTML = "";
    for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(day.getDate() + i);
        const formattedDate = day.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

        // Filter appointments for the current day
        const appointmentsForDay = appointments.filter(appointment => appointment.date === formattedDate);

        // Add appointments to the list
        weekAppointmentsHTML += `<div class="card"><div class="date">${day.toDateString()}</div>`;
        if (appointmentsForDay.length > 0) {
            weekAppointmentsHTML += "<ul>";
            appointmentsForDay.forEach(appointment => {
                weekAppointmentsHTML += `<li>${appointment.title} at ${appointment.time} with ${appointment.fullName}</li>`;
            });
            weekAppointmentsHTML += "</ul>";
        }
        weekAppointmentsHTML += "</div>";
    }

    // Update the content of the container with the HTML for displaying appointments
    currentWeekAppointments.innerHTML = weekAppointmentsHTML;
}

// Event listeners
// Add click event listener to "mobileMenuButton" to toggle mobile menu visibility
if (mobileMenuButton) {
    mobileMenuButton.addEventListener("click", toggleMobileMenu)
}

// Add click event listener to "showFormButton" elements to show respective forms
showFormButtons.forEach((button) => {
    button.addEventListener("click", showFormButtonClickHandler);
});

// Add click event listener to "closeButton" elements to close respective modals
closeButtons.forEach((button) => {
    button.addEventListener("click", closeButtonClickHandler);
});

// Update the clock every second
setInterval(updateClock, 1000);

// Add event listener to render current week appointments after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Render current week appointments
    renderCurrentWeekAppointments();
});
