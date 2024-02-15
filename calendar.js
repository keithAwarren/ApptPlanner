// Variables
const daysTag = document.querySelector(".days"); // Selects the element containing the days in the calendar
const currentDate = document.querySelector(".current-date"); // Selects the element displaying the current date
const prevNextIcon = document.querySelectorAll(".icons span"); // Selects the previous and next icons in the calendar
let date = new Date(); // Creates a new Date object representing the current date
let currYear = date.getFullYear(); // Gets the current year
let currMonth = date.getMonth(); // Gets the current month
const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
]; // Array containing the names of the months

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

// Function to create appointment items
const createAppointmentItem = (appointment) => {
    const appointmentItem = document.createElement('div');
    appointmentItem.classList.add('appointmentItem');
    appointmentItem.dataset.timestamp = appointment.timestamp;

    const appointmentInfo = document.createElement('div');
    appointmentInfo.classList.add('appointmentInfo'); // Add a class for appointment info

    appointmentInfo.innerHTML = `
        <p><strong class="contact">Contact: ${appointment.fullName}</strong></p>
        <p class="title">Title: ${appointment.title}</p>
        <p class="time">Time: ${appointment.time}</p>
    `;

    const deleteButtonContainer = document.createElement('div');
    deleteButtonContainer.classList.add('deleteAppointmentButton');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteAppointment');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Event listener for delete button
    deleteButton.addEventListener('click', () => {
        const confirmation = confirm("Are you sure you want to delete this appointment?");
        if (confirmation) {
            const timestamp = appointment.timestamp;
            let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
            appointments = appointments.filter(app => app.timestamp !== timestamp);
            localStorage.setItem("appointments", JSON.stringify(appointments));
            appointmentItem.remove();
            renderCalendar();
        }
    });


    deleteButtonContainer.appendChild(deleteButton);
    appointmentItem.appendChild(appointmentInfo);
    appointmentItem.appendChild(deleteButtonContainer);
    
    return appointmentItem;
};

// Function to display appointment modal
const displayAppointmentModal = (day, appointmentsForDay) => {
    const appointmentDetails = document.getElementById('appointmentDetails');
    appointmentDetails.innerHTML = `<div id="appointmentDetails"><h3>Appointments for<br>${day}:</h3><span class="close closeButton">&times;</span></div>`;

    // Event listener for close button
    const closeButton = appointmentDetails.querySelector('.closeButton');
    closeButton.addEventListener('click', () => {
        const appointmentModal = document.getElementById("appointmentDisplayModal");
        appointmentModal.style.display = "none";
    });

    // Iterate over appointments for the day and create HTML elements for each appointment
    appointmentsForDay.forEach((appointment) => {
        const appointmentItem = createAppointmentItem(appointment);
        appointmentDetails.appendChild(appointmentItem);
    });

    // Get the modal element
    const appointmentModal = document.getElementById("appointmentDisplayModal");

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
// Add event listeners to previous and next icons for navigating months
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev") {
            currMonth--;
            if (currMonth < 0) {
                currMonth = 11;
                currYear--;
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

// Render appointments after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
    renderAppointments();
});
