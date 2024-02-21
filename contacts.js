// Variables
const addContactButton = document.querySelector(".contactPageButton"); // Button to add a new contact
const clearContactButton = document.getElementById("clearContactForm"); // Button to clear the contact form
const contactForm = document.getElementById("contactForm"); // Form for adding new contacts
const contactSelect = document.querySelector("#contactSelect"); // Select element for choosing contacts
const searchInput = document.getElementById("contactSearch"); // Input field for searching contacts
const sortSelect = document.getElementById("sortSelect"); // Select element for sorting contacts
const phoneInput = document.getElementById("phone"); // Input field for phone number

// Functions

// Function to handle click event on the "Add Contact" button
function handleAddContact() {
    const contactModal = document.getElementById("contactsModal");
    contactModal.style.display = "block";
}

// Function to close a modal dialog
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Function to clear the contact form
function closeContactForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

// Function to store contact information in local storage
function storeContactInfo(contactInfo) {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contactInfo.timestamp = new Date();
    contacts.push(contactInfo);
    localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Function to format phone number
function formatPhoneNumber(phone) {
    const digitsOnly = phone.replace(/\D/g, "");
    if (digitsOnly.length !== 10) {
        return phone;
    }
    const formatted = digitsOnly.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    return formatted;
}

// Function to display all contacts stored in local storage
function displayContacts() {
    // Retrieve contacts from local storage
    const contactList = document.getElementById("contactsList");
    const placeholder = document.querySelector(".placeholderContainer")
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    // Check if there are any contacts
    if (contacts.length === 0) {
        contactList.style.display = "none";
        placeholder.style.display = "flex"
    } else {
        contactList.style.display = "grid"; 
        placeholder.style.display = "none";
    }

    // Clear the contact list
    contactList.innerHTML = "";

    // Iterate over each contact and display it
    contacts.forEach(function (contact, index) {
        const li = document.createElement("li");
        li.classList.add("contactCard")

        const span = document.createElement("span");
        const phoneSpan = document.createElement("span");
        const emailSpan = document.createElement("span");
        const dateSpan = document.createElement("span");
        const deleteButton = document.createElement("button");

        // Set content for each contact detail
        span.innerHTML = `<strong>${contact.firstName} ${contact.lastName}</strong>`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;
        dateSpan.textContent = `Date Added: ${new Date(contact.timestamp).toLocaleDateString()}`

        // Set up delete button for the contact
        deleteButton.className = "deleteContact fas fa-trash-alt";
        deleteButton.setAttribute("data-index", index);

        // Append details and delete button to list item
        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(dateSpan);
        li.appendChild(deleteButton);

        // Append list item to contact list
        contactList.appendChild(li);
    });

    // Set up event listeners for delete buttons
    deleteContactEvent();
}

// Function to handle deletion of a contact
function deleteContact(index) {
    const confirmation = confirm("Are you sure you want to delete this contact?");
    if (confirmation) {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.splice(index, 1);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        displayContacts();
    }
}

// Function to set up delete contact event listener
function deleteContactEvent() {
    const deleteButtons = document.querySelectorAll(".deleteContact");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const index = this.getAttribute("data-index");
            deleteContact(index);
        });
    });
}

// Function to filter contacts based on search term
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

// Function to display filtered contacts
function displayFilteredContacts(filteredContacts) {
    const contactList = document.getElementById("contactsList");
    contactList.innerHTML = "";

    filteredContacts.forEach(function (contact, index) {
        const li = document.createElement("li");
        li.classList.add("contactCard")

        const span = document.createElement("span");
        const phoneSpan = document.createElement("span");
        const emailSpan = document.createElement("span");
        const dateSpan = document.createElement("span");
        const deleteButton = document.createElement("button");

        span.innerHTML = `<strong>${contact.firstName} ${contact.lastName}</strong>`;
        phoneSpan.textContent = `Phone: ${contact.phone}`;
        emailSpan.textContent = `Email: ${contact.email}`;
        dateSpan.textContent = `Date Added: ${new Date(contact.timestamp).toLocaleDateString()}`;

        deleteButton.className = "deleteContact fas fa-trash-alt";
        deleteButton.setAttribute("data-index", index);

        li.appendChild(span);
        li.appendChild(document.createElement("br"));
        li.appendChild(phoneSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(emailSpan);
        li.appendChild(document.createElement("br"));
        li.appendChild(dateSpan);
        li.appendChild(deleteButton);

        contactList.appendChild(li);
    });
}

// Function to sort contacts
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

// Add click event listener to "addContactButton" to show the contact modal
if (addContactButton) {
    addContactButton.addEventListener("click", handleAddContact);
}

// Add click event listener to "clearContactButton" to clear the contact form
if (clearContactButton) {
    clearContactButton.addEventListener("click", closeContactForm);
}

// Event listener to format phone number input
phoneInput.addEventListener("input", function(event) {
    const currentValue = event.target.value;
    event.target.value = formatPhoneNumber(currentValue);
});

// Event listener for submitting the contact form
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;

    if (phone.replace(/\D/g, "").length !== 10) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

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

// Set up event listeners for searching contacts
searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterContacts(searchTerm);
});

// Set up event listeners for sorting contacts
sortSelect.addEventListener("change", function () {
    const sortType = sortSelect.value;
    sortContacts(sortType);
});

// Initial display of contacts
deleteContactEvent();
displayContacts();
