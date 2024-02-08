// Variables
const newAppointmentButton = document.querySelector(".addApptButton"); 
const appointmentsForm = document.getElementById("appointmentsForm"); 
const contactSelect = document.querySelector("#contactSelect"); 
const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay"); 
const clearApptFromButton = document.getElementById("clearApptForm"); 

// Functions

// Populate the contact select dropdown menu with contacts stored in local storage
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

// Handle the creation of a new appointment
function handleNewAppointment() {
    const appointmentModal = document.getElementById("appointmentsModal");
    appointmentModal.style.display = "block";
}

// Handle the submission of the appointment form
function handleFormSubmission(e) {
    e.preventDefault();

    // Retrieve selected contact information
    const selectedOption = contactSelect.options[contactSelect.selectedIndex];

    if (!selectedOption) {
        // Handle the case where no contact is selected
        return;
    }

    const selectedFirstName = selectedOption.getAttribute("data-firstName");
    const selectedLastName = selectedOption.getAttribute("data-lastName");
    const selectedPhone = selectedOption.getAttribute("data-phone");
    const selectedEmail = selectedOption.getAttribute("data-email");

    // Retrieve appointment details from the form
    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;

    // Create appointment information object
    const appointmentInfo = {
        fullName: `${selectedFirstName} ${selectedLastName}`,
        phone: selectedPhone,
        email: selectedEmail,
        title,
        date,
        time,
    };

    // Store appointment information in local storage
    storeAppointmentInfo(appointmentInfo);

    // Clear the form and close the modal
    appointmentsForm.reset();
    closeModal("appointmentsModal");
}

// Store appointment information in local storage
function storeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentInfo);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    // Render the calendar after storing the appointment
    renderCalendar();
}

// Function to close a modal by its ID
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Function to clear the appointment form fields
function clearFormFields() {
    appointmentsForm.reset();
}

// Event Listeners

// Add event listener for the button to add a new appointment
if (newAppointmentButton) {
    newAppointmentButton.addEventListener("click", handleNewAppointment);
}

// Add event listener for the form submission
if (appointmentsForm) {
    appointmentsForm.addEventListener("submit", handleFormSubmission);
}

// Add event listener for the button to clear the appointment form fields
if (clearApptFromButton) {
    clearApptFromButton.addEventListener("click", clearFormFields)
}

// Populate contact select after DOM is fully loaded
populateContactSelect();
