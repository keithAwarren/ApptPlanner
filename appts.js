document.addEventListener("DOMContentLoaded", function () {
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

        const appointmentInfo = document.createElement("div");
        appointmentInfo.classList.add("appointment-info");

        const fullName = `${selectedFirstName} ${selectedLastName}`;

        appointmentInfo.innerHTML = `
            <p><strong>Contact:</strong> ${fullName}</p>
            <p><strong>Phone:</strong> ${selectedPhone}</p>
            <p><strong>Email:</strong> ${selectedEmail}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.addEventListener("click", function () {
            appointmentInfo.remove();
        });

        appointmentInfo.appendChild(deleteButton);
        appointmentInfoDisplay.appendChild(appointmentInfo);

        appointmentsForm.reset();
        closeModal("appointmentsModal");
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

    // Populate contact select after DOM is fully loaded
    populateContactSelect();
});
