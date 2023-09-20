document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with the classes "form-section" and "showFormButton"
    const formSections = document.querySelectorAll(".form-section");
    const showFormButtons = document.querySelectorAll(".showFormButton");

    // Add click event listener to "showFormButton" elements
    showFormButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            // Toggle visibility of the "form-section" elements
            formSections[index].classList.toggle("visible");
        });
    });

    // Select the contact form element and the select element for contacts in appointment form
    const contactForm = document.querySelector("#contactsCard form");
    const contactSelect = document.querySelector("#contactSelect");

    // Add a submit event listener to the contact form
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submitting

        // Get values from the contact form
        const name = document.querySelector("#name").value;
        const phone = document.querySelector("#phone").value;
        const email = document.querySelector("#email").value;

        // Create a new option element for the select element
        const option = document.createElement("option");

        // Set text of option to name
        option.text = name;

        // Store phone and email as data attributes
        option.setAttribute("data-phone", phone);
        option.setAttribute("data-email", email);

        // Append new option to select element
        contactSelect.appendChild(option);

        contactForm.reset();
    });

    // Select appointments form element
    const appointmentsForm = document.querySelector("#appointmentsCard form");
    const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay"); // Add this line

    // Add submit event listener to appointment form
    appointmentsForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting

        // Get contact option from select element
        const selectedOption = contactSelect.options[contactSelect.selectedIndex];

        // Get phone and email data attributes
        const selectedPhone = selectedOption.getAttribute("data-phone");
        const selectedEmail = selectedOption.getAttribute("data-email");

        // Get values from the Appointments form
        const title = document.querySelector("#title").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;

        // Create a new element to display the submitted information
        const appointmentInfo = document.createElement("div");
        appointmentInfo.classList.add("appointment-info");

        // Update the new element with the submitted information
        appointmentInfo.innerHTML = `
            <h3>Appointments</h3>
            <p><strong>Contact:</strong> ${selectedOption.textContent}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        // Append the new element to the display area
        appointmentInfoDisplay.appendChild(appointmentInfo);

        // Clear and hide the appointments and contacts forms
        appointmentsForm.reset();
        appointmentsForm.style.display = "none";
        contactsCard.style.display = "none";
        appointmentsCard.style.display = "none";
    });
});
