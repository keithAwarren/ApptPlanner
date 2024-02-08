// Variables
const newAppointmentButton = document.querySelector(".addApptButton");
const appointmentsForm = document.getElementById("appointmentsForm");
const contactSelect = document.querySelector("#contactSelect");
const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay");
const clearApptFromButton = document.getElementById("clearApptForm");

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

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function clearFormFields() {
    appointmentsForm.reset();
}

// Event Listeners
if (newAppointmentButton) {
    newAppointmentButton.addEventListener("click", handleNewAppointment);
}

if (appointmentsForm) {
    appointmentsForm.addEventListener("submit", handleFormSubmission);
}

if (clearApptFromButton) {
    clearApptFromButton.addEventListener("click", clearFormFields)
}

// Populate contact select after DOM is fully loaded
populateContactSelect();
