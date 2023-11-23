// Variables
const addContactButton = document.querySelector(".contactPage-button");
const clearContactButton = document.getElementById("clearContactForm");
const contactForm = document.getElementById("contactForm");
const contactSelect = document.querySelector("#contactSelect");

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
    contacts.push(contactInfo);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function displayStoredContact(contact) {
    const contactList = document.getElementById("contactsList");
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    const phoneSpan = document.createElement("span");
    const emailSpan = document.createElement("span");

    nameSpan.innerHTML = `<strong>${contact.firstName} ${contact.lastName}</strong>`;
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

    contactList.innerHTML = "";

    contacts.forEach(function (contact, index) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        const phoneSpan = document.createElement("span");
        const emailSpan = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.textContent = `${contact.firstName} ${contact.lastName}`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;

        deleteButton.className = "deleteContact";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index);

        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(deleteButton);

        li.classList.add("contactListItem");
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
        email
    };

    storeContactInfo(contactInfo);

    const option = document.createElement("option");
    const fullName = `${firstName} ${lastName}`;
    option.text = fullName;
    option.setAttribute("data-firstName", firstName);
    option.setAttribute("data-lastName", lastName);
    option.setAttribute("data-phone", phone);
    option.setAttribute("data-email", email);

    contactSelect.appendChild(option);

    contactForm.reset();
    closeModal("contactsModal");
    displayContacts();
});

deleteContactEvent();
displayContacts();