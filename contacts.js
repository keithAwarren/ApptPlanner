// Variables
const addContactButton = document.querySelector(".contactPageButton");
const clearContactButton = document.getElementById("clearContactForm");
const contactForm = document.getElementById("contactForm");
const contactSelect = document.querySelector("#contactSelect");
const searchInput = document.getElementById("contactSearch");
const sortSelect = document.getElementById("sortSelect");

// Functions
function handleAddContact() {
    const contactModal = document.getElementById("contactsModal");
    contactModal.style.display = "block";
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function closeContactForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

function storeContactInfo(contactInfo) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactInfo.timestamp = new Date();
    contacts.push(contactInfo);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function displayStoredContact(contact) {
    const contactList = document.getElementById("contactsList");
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    const phoneSpan = document.createElement("span");
    const emailSpan = document.createElement("span");

    nameSpan.innerHTML = `${contact.firstName} ${contact.lastName}`;
    phoneSpan.textContent = `Phone: ${contact.phone}`;
    emailSpan.textContent = `Email: ${contact.email}`;

    li.appendChild(nameSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(phoneSpan);
    li.appendChild(document.createElement("br"));
    li.appendChild(emailSpan);

    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteContact";
    deleteButton.textContent = "Delete";
    li.appendChild(deleteButton);

    contactList.appendChild(li);
}

function displayContacts() {
    const contactList = document.getElementById("contactsList");
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (contacts.length === 0) {
        contactList.style.display = "none"
    } else {
        contactList.style.display = "grid"
    }

    contactList.innerHTML = "";

    contacts.forEach(function (contact, index) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const phoneSpan = document.createElement("span");
        const emailSpan = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.innerHTML = `<strong>${contact.firstName} ${contact.lastName}</strong>`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;

        deleteButton.className = "deleteContact fas fa-trash-alt";
        deleteButton.setAttribute("data-index", index);

        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(deleteButton);

        contactList.appendChild(li);
    });

    const deleteButtons = document.querySelectorAll(".deleteContact");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteContact(index);
        });
    });
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.splice(index, 1);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}

function deleteContactEvent() {
    const deleteButtons = document.querySelectorAll(".deleteContact");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteContact(index);
        });
    });
}

function filterContacts(searchTerm) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const filteredContacts = contacts.filter(function (contact) {
        const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
        const phone = contact.phone.toLowerCase();
        const email = contact.email.toLowerCase();

        return fullName.includes(searchTerm) || phone.includes(searchTerm) || email.includes(searchTerm);
    });

    displayFilteredContacts(filteredContacts);
}

function displayFilteredContacts(filteredContacts) {
    const contactList = document.getElementById("contactsList");
    contactList.innerHTML = "";

    filteredContacts.forEach(function (contact, index) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const phoneSpan = document.createElement("span");
        const emailSpan = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.innerHTML = `<strong>${contact.firstName} ${contact.lastName}</strong>`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;

        deleteButton.className = "deleteContact fas fa-trash-alt";
        deleteButton.setAttribute("data-index", index);

        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(deleteButton);

        contactList.appendChild(li);
    });
}

function sortContacts(sortType) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    if (sortType === "alphabetical") {
        contacts.sort(function (a, b) {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (sortType === "recent") {
        contacts.sort(function (a, b) {
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
}

// Event Listeners
if (addContactButton) {
    addContactButton.addEventListener("click", handleAddContact);
}

if (clearContactButton) {
    clearContactButton.addEventListener("click", closeContactForm);
}

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;

    const contactInfo = {
        firstName,
        lastName,
        phone,
        email,
        timestamp: new Date()
    };

    storeContactInfo(contactInfo);

    // Add the contact to the select option
    const option = document.createElement("option");
    option.textContent = `${firstName} ${lastName}`;
    contactSelect.appendChild(option);

    // Reset the form and close the modal
    contactForm.reset();
    closeModal("contactsModal");

    // Refresh the displayed contacts
    displayContacts();
});

deleteContactEvent();
displayContacts();

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterContacts(searchTerm);
});

sortSelect.addEventListener("change", function () {
    const sortType = sortSelect.value;
    sortContacts(sortType);
});

