// Variables
const newAppointmentButton = document.querySelector(".addApptButton"); // Button to add a new appointment
const appointmentsForm = document.getElementById("appointmentsForm"); // Form for adding new appointments
const contactSelect = document.querySelector("#contactSelect"); // Select element for choosing contacts
const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay"); // Display area for appointment information
const clearApptFromButton = document.getElementById("clearApptForm"); // Button to clear appointment form

// Functions

// Function to populate the contact select dropdown menu with contacts stored in local storage
function populateContactSelect() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.forEach(contact => {
        const option = document.createElement("option");
        option.textContent = `${contact.firstName} ${contact.lastName}`;
        option.value = JSON.stringify(contact); // Store contact object as option value
        contactSelect.appendChild(option);
    });
}

// Function to handle the creation of a new appointment
function handleNewAppointment() {
    const appointmentModal = document.getElementById("appointmentsModal");
    appointmentModal.style.display = "block";
}

// Function to handle the submission of the appointment form
function handleFormSubmission(e) {
    e.preventDefault();

    // Retrieve selected contact information
    const selectedContact = JSON.parse(contactSelect.value);

    // Retrieve appointment details from the form
    const title = document.querySelector("#title").value;
    const date = document.querySelector("#date").value;
    const time = document.querySelector("#time").value;
    const details = document.querySelector("#details").value;

    if (!time) {
        alert("Please enter a time for the appointment.")
        return;
    }

    // Create appointment information object
    const appointmentInfo = {
        fullName: `${selectedContact.firstName} ${selectedContact.lastName}`,
        phone: selectedContact.phone,
        email: selectedContact.email,
        title,
        date,
        time,
        details,
    };

    // Store appointment information in local storage
    storeAppointmentInfo(appointmentInfo);

    // Clear the form and close the modal
    appointmentsForm.reset();
    closeModal("appointmentsModal");
}

// Function to store appointment information in local storage
const storeAppointmentInfo = (appointmentInfo) => {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointmentInfo.timestamp = new Date().getTime(); // Adding timestamp property
    appointments.push(appointmentInfo);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    
    renderCalendar();
};

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
