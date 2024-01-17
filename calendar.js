const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
];

const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}" data-day="${formatDate(currYear, currMonth, i)}">${i}</li>`;
    }
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;

    const dayElements = document.querySelectorAll('.days li');
    dayElements.forEach(dayElement => {
        dayElement.addEventListener('click', () => handleDayClick(dayElement));
    });

    loadAppointments(); // Load appointments after rendering the calendar
    renderAppointments(); // Render appointments and update colors
};

const handleDayClick = (dayElement) => {
    const appointmentInfoString = dayElement.getAttribute('data-appointment-info');

    if (appointmentInfoString) {
        const appointmentInfo = JSON.parse(appointmentInfoString);
        displayAppointmentPopup(appointmentInfo);
    } else {
        // Handle the case where there's no appointment
        alert('No appointment for this date.');
    }
};

const displayAppointmentPopup = (appointmentInfo) => {
    console.log("Displaying pop-up for:", appointmentInfo);
    alert(`Appointment Info:\n\nTitle: ${appointmentInfo.title}\nDate: ${appointmentInfo.date}\nTime: ${appointmentInfo.time}`);
};

const formatDate = (year, month, day) => {
    const monthStr = (month + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${year}-${monthStr}-${dayStr}`;
};

const renderAppointments = () => {
    appointments.forEach(appointment => {
        const dayElement = document.querySelector(`.days li[data-day="${appointment.date}"]`);
        if (dayElement) {
            dayElement.classList.add("has-appointment");
            dayElement.setAttribute("data-appointment-info", JSON.stringify(appointment));
        }
    });
};

const loadAppointments = () => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    storedAppointments.forEach(appointment => {
        const dayElement = document.querySelector(`.days li[data-day="${appointment.date}"]`);
        if (dayElement) {
            dayElement.classList.add("has-appointment");
            dayElement.setAttribute("data-appointment-info", JSON.stringify(appointment));
        }
    });
};

const saveAppointment = (title, time, date) => {
    appointments.push({ title, time, date });
    localStorage.setItem("appointments", JSON.stringify(appointments));
};

renderCalendar();
renderAppointments();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        if (icon.id === "prev") {
            const today = new Date();
            const currentMonthIndex = today.getMonth();

            if (currYear > today.getFullYear() || (currYear === today.getFullYear() && currMonth > currentMonthIndex)) {
                currMonth--;
                if (currMonth < 0) {
                    currMonth = 11;
                    currYear--;
                }
            }
        } else {
            currMonth = (currMonth + 1) % 12;
            if (currMonth === 0) {
                currYear++;
            }
        }
        renderCalendar();
    });
});

