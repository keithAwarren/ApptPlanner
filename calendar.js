// Variables
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

// Functions

// Reset appointment colors and attributes
const resetAppointmentColors = () => {
    const dayElements = document.querySelectorAll('.days li');
    dayElements.forEach(dayElement => {
        dayElement.classList.remove("has-appointment");
        dayElement.style.backgroundColor = '';
    });
};

// Render the calendar with days and appointments
const renderCalendar = () => {
    resetAppointmentColors(); // Reset colors and attributes before applying new appointments

    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-day="${formatDate(currYear, currMonth, i)}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    const dayElements = document.querySelectorAll('.days li');
    dayElements.forEach(dayElement => {
        dayElement.addEventListener('click', () => handleDayClick(dayElement));
    });

    renderAppointments(); // Render appointments and update colors
};

// Handle click on a day
const handleDayClick = (dayElement) => {
    const day = dayElement.getAttribute('data-day');
    const appointmentsForDay = getAppointmentsForDay(day);

    if (appointmentsForDay.length > 0) {
        displayAppointmentModal(day, appointmentsForDay);
    } else {
        // Handle the case where there's no appointment
        alert('No appointment for this date.');
    }
};

// Display appointment details in a modal
const displayAppointmentModal = (day, appointmentsForDay) => {
    let modalContent = `<div id="appointmentDetails">Appointments for ${day}:</div>`;

    appointmentsForDay.forEach(appointment => {
        modalContent += `<div class="appointment-item">
                            <p>Contact: ${appointment.fullName}</p>
                            <p>Title: ${appointment.title}</p>
                            <p>Time: ${appointment.time}</p>
                         </div>`;
    });

    // Append the modal content to the modal element
    const appointmentModal = document.getElementById("appointmentDisplayModal");
    appointmentModal.innerHTML = modalContent;

    // Display the modal
    appointmentModal.style.display = "block";
};

// Format date as 'YYYY-MM-DD'
const formatDate = (year, month, day) => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
};

// Render appointments and update colors
const renderAppointments = () => {
    const dayElements = document.querySelectorAll('.days li');
    dayElements.forEach(dayElement => {
        const day = dayElement.getAttribute('data-day');
        const appointmentsForDay = getAppointmentsForDay(day);

        if (appointmentsForDay.length > 0) {
            dayElement.classList.add("has-appointment");
        } else {
            dayElement.classList.remove("has-appointment");
        }
    });
};

// Get appointments for a specific day
const getAppointmentsForDay = (day) => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    return storedAppointments.filter(appointment => appointment.date === day);
};

// Save appointment to local storage
const saveAppointment = (title, time, date) => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    storedAppointments.push({ title, time, date });
    localStorage.setItem("appointments", JSON.stringify(storedAppointments));
};

// Initial rendering of the calendar and appointments
renderCalendar();

// Event Listeners
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev") {
            const today = new Date();
            const currentMonthIndex = today.getMonth();
            if (currYear > today.getFullYear() || (currYear === today.getFullYear() && currMonth > currentMonthIndex)) {
                currMonth--;
                if (currMonth < 0) {
                    currMonth = 11;
                    currYear--;
                }
            }
        } else {
            currMonth = (currMonth + 1) % 12;
            if (currMonth === 0) {
                currYear++;
            }
        }
        renderCalendar();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    renderAppointments(); // Render appointments after DOM content is loaded
});

// Modal close functionality
const appointmentModal = document.getElementById("appointmentDisplayModal");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
    appointmentModal.style.display = "none";
});
