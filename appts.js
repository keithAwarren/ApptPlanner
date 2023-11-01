document.addEventListener("DOMContentLoaded", function () {
    // Function to handle the "New Appointment" button
    function handleNewAppointment() {
        const appointmentModal = document.getElementById("appointmentsModal");
        appointmentModal.style.display = "block";
    }

    const newAppointmentButton = document.querySelector(".showFormButton");
    if (newAppointmentButton) {
        newAppointmentButton.addEventListener("click", handleNewAppointment);
    }

    const appointmentsForm = document.getElementById("appointmentsForm");
    const contactSelect = document.querySelector("#contactSelect");

    // Add submit event listener to appointment form
    appointmentsForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get selected contact option from contact select
        const selectedOption = contactSelect.options[contactSelect.selectedIndex];

        // Get phone and email data from the selected contact
        const selectedFirstName = selectedOption.getAttribute("data-firstName");
        const selectedLastName = selectedOption.getAttribute('data-lastName');
        const selectedPhone = selectedOption.getAttribute("data-phone");
        const selectedEmail = selectedOption.getAttribute("data-email");

        // Get values from the appointment form
        const title = document.querySelector("#title").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;

        // Create div to display appointment details
        const appointmentInfo = document.createElement("div");
        appointmentInfo.classList.add("appointment-info");

        const fullName = `${selectedFirstName} ${selectedLastName}`;

        // Populate appointment info div with appointment details
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

        // Append the delete button to the appointment info
        appointmentInfo.appendChild(deleteButton);

        // Add appointment info to the display area
        const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay");
        appointmentInfoDisplay.appendChild(appointmentInfo);

        // Reset appointment forms and close modal
        appointmentsForm.reset();
        closeModal("appointmentsModal");
    });
});

