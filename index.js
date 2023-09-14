document.addEventListener("DOMContentLoaded", function() {
    // Get references to all form sections and buttons
    const formSections = document.querySelectorAll(".form-section");
    const showFormButtons = document.querySelectorAll(".showFormButton");

    // Add click event listeners to each button
    showFormButtons.forEach((button, index) => {
        button.addEventListener("click", function() {
            // Toggle the 'visible' class on the corresponding form section
            formSections[index].classList.toggle("visible");
        });
    });
});