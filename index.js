// Variables
const mobileMenuButton = document.querySelector(".burgerButton");
const timeInput = document.getElementById("time");
const showFormButtons = document.querySelectorAll(".pageLinksMoblie");
const closeButtons = document.querySelectorAll(".closeButton");
const currentWeekAppointments = document.getElementById("currentWeekAppointments");

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

// Function to update the clock
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Function to render appointments for the current week
function renderCurrentWeekAppointments() {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const firstDayOfWeek = new Date(currentDate);
    firstDayOfWeek.setDate(currentDate.getDate() - currentDay); // Set to Sunday of the current week

    // Create a list to hold the appointments for the current week
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

    currentWeekAppointments.innerHTML = weekAppointmentsHTML;
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

// Update the clock every second
setInterval(updateClock, 1000);

// Render current week appointments
renderCurrentWeekAppointments();
