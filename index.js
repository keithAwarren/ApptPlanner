document.addEventListener("DOMContentLoaded", function () {

    function toggleMobileMenu() {
        const mobileMenu = document.querySelector(".mobile-menu");
        mobileMenu.classList.toggle("show-mobile-menu");
    }

    const mobileMenuButton = document.querySelector(".mobile-menu-button");

    mobileMenuButton.addEventListener("click", toggleMobileMenu);

    const timeInput = document.getElementById("time");

    flatpickr(timeInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    // Select all elements with class "showFormButton and close-button"
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
});
