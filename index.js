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

    const contactForm = document.getElementById("contactForm");
    const appointmentsForm = document.getElementById("appointmentsForm");
    const contactSelect = document.querySelector("#contactSelect"); 

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const name = document.querySelector("#name").value;
        const phone = document.querySelector("#phone").value;
        const email = document.querySelector("#email").value;

        const option = document.createElement("option");

        option.text = name;

        option.setAttribute("data-phone", phone);
        option.setAttribute("data-email", email);

        contactSelect.appendChild(option);

        contactForm.reset();
        closeModal("contactsModal");
    });

    appointmentsForm.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const selectedOption = contactSelect.options[contactSelect.selectedIndex];

        const selectedPhone = selectedOption.getAttribute("data-phone");
        const selectedEmail = selectedOption.getAttribute("data-email");

        const title = document.querySelector("#title").value;
        const date = document.querySelector("#date").value;
        const time = document.querySelector("#time").value;

        const appointmentInfo = document.createElement("div");
        appointmentInfo.classList.add("appointment-info");

        appointmentInfo.innerHTML = `
            <p><strong>Contact:</strong> ${selectedOption.textContent}</p>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Date:</strong> ${date}</p>
            <p><strong>Time:</strong> ${time}</p>
        `;

        const appointmentInfoDisplay = document.querySelector("#appointmentInfoDisplay");
        appointmentInfoDisplay.appendChild(appointmentInfo);

        appointmentsForm.reset();
        closeModal("appointmentsModal");
    });

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }
});
