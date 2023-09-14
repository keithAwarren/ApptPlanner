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
});

document.addEventListener("DOMContentLoaded", function () {

    // Select the contact form element and the select element for conracts in appointment form
    const contactForm = document.querySelector("#contactsCard form");
    const contactSelect = document.querySelector("#contactSelect");

    // Add a submit event listener to the contact form
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form submitting

            // Get values from the contact form
            const name = document.querySelector("#name").value;
            const phone = document.querySelector("#phone").value;
            const email = document.querySelector("#email").value;

            // Create a new optiont element for the select element
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

    // Add submit evnet listener to appointment form
    appointmentsForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting

            // Get contact option from select element
            const selectedOption = contactSelect.options[contactSelect.selectedIndex];

            // Get phone and email data attributes
            const selectedPhone = selectedOption.getAttribute("data-phone");
            const selectedEmail = selectedOption.getAttribute("data-email");

            // Log phone and email to the console
            console.log("Selected Phone:", selectedPhone);
            console.log("Selected Email:", selectedEmail);
    });
});
