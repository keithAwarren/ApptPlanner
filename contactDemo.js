// Variables
const contactsList = document.getElementById("contactsList");
const placeholder = document.querySelector(".placeholderContainer");

// Functions

// Function to generate demo contacts
function generateDemoContacts() {
    const numContacts = 10;

    // Make AJAX request to fetch random users
    $.ajax({
        url: `https://randomuser.me/api/?results=${numContacts}`,
        dataType: 'json',
        success: function(data) {
            // Process fetched data to generate contacts
            const contacts = data.results.map((result, index) => {
                const phoneDigits = result.phone.replace(/\D/g, "").slice(0, 10);
                const formattedPhone = `(${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 10)}`;

                return {
                    firstName: result.name.first,
                    lastName: result.name.last,
                    phone: formattedPhone,
                    email: result.email,
                    timestamp: new Date()
                };
            });

            // Store generated contacts in local storage
            localStorage.setItem("contacts", JSON.stringify(contacts));

            // Populate the contact select dropdown
            populateContactSelect();

            // Add contacts to the contact list
            contacts.forEach(contact => {
                displayContacts(contact);
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching random users:', error);
        }
    });
}

// Function to populate contact select dropdown
function populateContactSelect() {
    const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    const contactSelect = document.getElementById("contactSelect");

    contacts.forEach((contact, index) => {
        const option = document.createElement("option");
        option.textContent = `${contact.firstName} ${contact.lastName}`;
        // Store contact index in local storage
        option.value = index.toString();
        contactSelect.appendChild(option);
    });
}

// Event Listeners

// Event listener for populating demo contacts on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    const demoButton = document.getElementById('populateDemoContactsButton');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            generateDemoContacts();
        });
    }
});

populateContactSelect();
