document.addEventListener("DOMContentLoaded", function () {
    // Function to handle the "Add Contact" button
    function handleAddContact() {
        const contactModal = document.getElementById("contactsModal");
        contactModal.style.display = "block";
    }

    const addContactButton = document.querySelector(".contactPage-button");
    if (addContactButton) {
        addContactButton.addEventListener("click", handleAddContact);
    }

    function closeContactForm() {
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
    }

    const clearContactButton = document.getElementById("clearContactForm");
    if (clearContactButton) {
        clearContactButton.addEventListener("click", closeContactForm);
    }

    const contactForm = document.getElementById("contactForm");
    const contactSelect = document.querySelector("#contactSelect");

    // Add submit event listener to contact form
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting

        // Get values from contact form
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const phone = document.querySelector("#phone").value;
        const email = document.querySelector("#email").value;

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
});
