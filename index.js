document.addEventListener("DOMContentLoaded", function () {
    const showFormButtons = document.querySelectorAll(".showFormButton");
    const closeButtons = document.querySelectorAll(".close-button");

    showFormButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const modal = document.getElementById(targetId);
            modal.style.display = "block";
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetModalId = this.getAttribute("data-modal");
            const modal = document.getElementById(targetModalId);
            modal.style.display = "none";
        });
    });
});
