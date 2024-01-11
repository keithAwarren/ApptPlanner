// Variables
const newAppointmentButton = document.querySelector(".showFormButton");
const appointmentsForm = document.getElementById("appointmentsForm");
const contactSelect = document.querySelector("#contactSelect");
const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay");

// Functions
function populateContactSelect() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    for (const contact of contacts) {
        const option = document.createElement("option");
        option.textContent = `${contact.firstName} ${contact.lastName}`;
        option.setAttribute("data-firstName", contact.firstName);
        option.setAttribute("data-lastName", contact.lastName);
        option.setAttribute("data-phone", contact.phone);
        option.setAttribute("data-email", contact.email);
        contactSelect.appendChild(option);
    }
}

function handleNewAppointment() {
    const appointmentModal = document.getElementById("appointmentsModal");
    appointmentModal.style.display = "block";
}

function handleFormSubmission(e) {
    e.preventDefault();

    const selectedOption = contactSelect.options[contactSelect.selectedIndex];

    if (!selectedOption) {
        // Handle the case where no contact is selected
        return;
    }

    const selectedFirstName = selectedOption.getAttribute("data-firstName");
    const selectedLastName = selectedOption.getAttribute("data-lastName");
    const selectedPhone = selectedOption.getAttribute("data-phone");
    const selectedEmail = selectedOption.getAttribute("data-email");

    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    const appointmentInfo = {
        fullName: `${selectedFirstName} ${selectedLastName}`,
        phone: selectedPhone,
        email: selectedEmail,
        title,
        date,
        time,
    };

    storeAppointmentInfo(appointmentInfo);

    displayAppointmentInfo(appointmentInfo);

    const selectedDay = document.querySelector(`.days li[data-day="${date}"]`);
    if (selectedDay) {
        // Store appointment info 
        selectedDay.setAttribute('data-appointment-info', JSON.stringify(appointmentInfo));
        // Change the color of the selected day 
        selectedDay.style.backgroundColor = '#D9B4FF'; 
    }

    const dateParts = date.split("-");
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1;
    const day = parseInt(dateParts[2]);

    // Create a Date object for the selected date
    const selectedDate = new Date(year, month, day);

    // Add the appointment to the calendar
    addAppointmentToCalendar(selectedDate, appointmentInfo);

    // Clear the form and close the modal
    appointmentsForm.reset();
    closeModal("appointmentsModal");
}

function storeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentInfo);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    renderCalendar();
}

function addAppointmentToCalendar(selectedDate, appointmentInfo) {
   
    const dayElement = document.querySelector(`.days li[data-day="${selectedDate.toISOString()}"]`);
    if (dayElement) {
        dayElement.classList.add("has-appointment");
        dayElement.setAttribute("data-appointment-info", JSON.stringify(appointmentInfo));
    }
}

function displayAppointmentInfo(appointmentInfo) {
    
}

function removeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const index = appointments.findIndex(appointment => (
        appointment.fullName === appointmentInfo.fullName &&
        appointment.phone === appointmentInfo.phone &&
        appointment.email === appointmentInfo.email &&
        appointment.title === appointmentInfo.title &&
        appointment.date === appointmentInfo.date &&
        appointment.time === appointmentInfo.time
    ));

    if (index !== -1) {
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Event Listeners
if (newAppointmentButton) {
    newAppointmentButton.addEventListener("click", handleNewAppointment);
}

if (appointmentsForm) {
    appointmentsForm.addEventListener("submit", handleFormSubmission);
}

// Load and display stored appointments after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    storedAppointments.forEach(displayAppointmentInfo);
});

// Populate contact select after DOM is fully loaded
populateContactSelect();
