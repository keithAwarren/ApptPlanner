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

    const appointmentInfo = {
        fullName: `${selectedFirstName} ${selectedLastName}`,
        phone: selectedPhone,
        email: selectedEmail,
        title,
        date,
        time,
    };

    storeAppointmentInfo(appointmentInfo);

    displayAppointmentInfo(appointmentInfo);

    appointmentsForm.reset();
    closeModal("appointmentsModal");
}

function storeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    appointments.push(appointmentInfo);
    localStorage.setItem("appointments", JSON.stringify(appointments));
}

function displayAppointmentInfo(appointmentInfo) {
    const appointmentInfoElement = document.createElement("div");
    appointmentInfoElement.classList.add("appointment-info");

    appointmentInfoElement.innerHTML = `
            <p><strong>Contact:</strong> ${appointmentInfo.fullName}</p>
            <p><strong>Phone:</strong> ${appointmentInfo.phone}</p>
            <p><strong>Email:</strong> ${appointmentInfo.email}</p>
            <p><strong>Title:</strong> ${appointmentInfo.title}</p>
            <p><strong>Date:</strong> ${appointmentInfo.date}</p>
            <p><strong>Time:</strong> ${appointmentInfo.time}</p>
        `;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", function () {
        appointmentInfoElement.remove();
        removeAppointmentInfo(appointmentInfo);
    });

    appointmentInfoElement.appendChild(deleteButton);
    appointmentInfoDisplay.appendChild(appointmentInfoElement);
}

function removeAppointmentInfo(appointmentInfo) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
    const index = appointments.findIndex(appointment => (
        appointment.fullName === appointmentInfo.fullName &&
        appointment.phone === appointmentInfo.phone &&
        appointment.email === appointmentInfo.email &&
        appointment.title === appointmentInfo.title &&
        appointment.date === appointmentInfo.date &&
        appointment.time === appointmentInfo.time
    ));

    if (index !== -1) {
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }
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

// Load and display stored appointments
const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
storedAppointments.forEach(displayAppointmentInfo);

// Populate contact select after DOM is fully loaded
populateContactSelect();

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});