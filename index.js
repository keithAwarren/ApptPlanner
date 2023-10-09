// Regex pattern for email
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// Regex pattern for phone
const phonePattern = /^\d{10}$/;

document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with class "shoFormButton and close-button"
    const showFormButtons = document.querySelectorAll(".showFormButton");
    const closeButtons = document.querySelectorAll(".close-button");

    // Add click event listener to "showFormButton" elements
    showFormButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            modal.style.display = "block";
        });
    });

    // Add click event listener to "close-button" elements
    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetModalId = this.getAttribute("data-modal");
            const modal = document.getElementById(targetModalId);
            modal.style.display = "none";
        });
    });

    const contactForm = document.getElementById("contactForm");
    const appointmentsForm = document.getElementById("appointmentsForm");
    const contactSelect = document.querySelector("#contactSelect");

    // Add submit event listener to contact form
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting

        // Get values from contact form
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const phone = document.querySelector("#phone").value;
        const email = document.querySelector("#email").value;

        // Check if email matches regex
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if phone matches regex
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid 10 digit phone number.");
            return;
        }

        // Create option element to add to contact select 
        const option = document.createElement("option");

        const fullName = `${firstName} ${lastName}`;

        option.text = fullName;

        option.setAttribute("data-firstName", firstName);
        option.setAttribute("data-lastName", lastName);
        option.setAttribute("data-phone", phone);
        option.setAttribute("data-email", email);

        // Add created option element to select
        contactSelect.appendChild(option);

        // Reset contact form and close modal
        contactForm.reset();
        closeModal("contactsModal");
    });

    // Add submit event listener to appointment form
    appointmentsForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get selected contact option from contact select
        const selectedOption = contactSelect.options[contactSelect.selectedIndex];

        // Get phone and email data from selected contact
        const selectedFirstName = selectedOption.getAttribute("data-firstName");
        const selectedLastName = selectedOption.getAttribute('data-lastName')
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

        // Add appointment info to display area
        const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay");
        appointmentInfoDisplay.appendChild(appointmentInfo);

        // Reset appointment forms, close modal
        appointmentsForm.reset();
        closeModal("appointmentsModal");
    });

    // Function to close modal by setting display to "none"
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }
});
