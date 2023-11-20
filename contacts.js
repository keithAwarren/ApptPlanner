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

    const contactInfo = {
        firstName,
        lastName,
        phone,
        email
    };

    storeContactInfo(contactInfo);

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

    displayContacts();
});

// Load and display stored contacts
const storedContacts = JSON.parse(localStorage.getItem("contacts")) || [];
storedContacts.forEach(displayStoredContact);

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

    // Add "Delete" button
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteContact";
    deleteButton.textContent = "Delete";
    li.appendChild(deleteButton);

    // Append the list item to the contact list
    contactList.appendChild(li);
}

function storeContactInfo(contactInfo) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    contacts.push(contactInfo);

    localStorage.setItem("contacts", JSON.stringify(contacts));
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
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

        // Set the content and attributes
        span.textContent = `${contact.firstName} ${contact.lastName}`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;
        deleteButton.className = "deleteContact";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute("data-index", index);

        // Append elements to the li
        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(deleteButton);

        // Add a class to the li element for styling
        li.classList.add("contactListItem");

        // Append the li to the contactList
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

function deletContactEvent() {
    const deleteButtons = document.querySelectorAll(".deleteContact");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteContact(index);
        });
    });
}

deletContactEvent();
