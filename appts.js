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

    appointmentsForm.reset();
    closeModal("appointmentsModal");
}

function storeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentInfo);
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

function displayAppointmentInfo(appointmentInfo) {
    const appointmentInfoElement = document.createElement("div");
    appointmentInfoElement.classList.add("appointment-info");

    appointmentInfoElement.innerHTML = `
            <p><strong>Contact:</strong> ${appointmentInfo.fullName}</p>
            <p><strong>Phone:</strong> ${appointmentInfo.phone}</p>
            <p><strong>Email:</strong> ${appointmentInfo.email}</p>
            <p><strong>Title:</strong> ${appointmentInfo.title}</p>
            <p><strong>Date:</strong> ${appointmentInfo.date}</p>
            <p><strong>Time:</strong> ${appointmentInfo.time}</p>
        `;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
        appointmentInfoElement.remove();
        removeAppointmentInfo(appointmentInfo);
    });

    appointmentInfoElement.appendChild(deleteButton);
    appointmentInfoDisplay.appendChild(appointmentInfoElement);
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

// Load and display stored appointments
const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
storedAppointments.forEach(displayAppointmentInfo);

// Populate contact select after DOM is fully loaded
populateContactSelect();