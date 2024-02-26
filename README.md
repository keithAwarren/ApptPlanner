README

Project Name: PLANR

**NOTE** this project utilizes local storage to store and retrieve data

PLANR is a project designed with the purpose of creating a single place where your contacts and your appointments can be easily entered and accessed in a clean and modern looking site. 

I decided to create this site after having used Google and Apple operating system smartphones, desktops, and laptops. The calendars and the appointment integration for these systems had never been an interesting experience, causing me and many others to simply not want to use them and instead rely on notes apps or alarm clocks.

Throughout this project I discovered the importance of utilizing local storage in order to store contact info and appointment info, while also being able to delete or manipulate this data in ways that make the project more user friendly and dynamic. I was challenged specifically at 2 points:

1: Assigning properties to contact information that could be accessed for deletion. By accessing the local storage I was able to assign each contact with an index and then retrieve that index in order to delete the correct contact.

2: Populating appointment information across individual pages. This particular challenge was faced very early on into the build, it was at this point that I took the time to learn about local storage and I discovered how useful it can be. With my information stored it was extremely easy to grab that information in order to manipulate it and make it accessible wherever I needed.


Some of the technologies I incorporated into this project include:

Font Awesome: A great library for icons like social media logos and utilities (close buttons, etc.)
Flatpickr: A lightweight and comprehensive date/time picker for form inputs.
Google Fonts: A robust library of fonts to achieve clean and modern styling.
Randomuser: A comprehensive open-source API that can be used to generate random user information, which I used to add a demo mode button so that developers can test the features of the project with ease.
Live Server: A visual studio code extension that hosts a live server to dynamically view my project. This was very useful for fine-tuning styles and dimensions.
StackOverflow/GitHub/Reddit: For the calendar I used a combination of these resources to build a calendar using open source code provided by developers.


Features:

Contacts Page:
Adding contacts by name, email and phone number
Sorting contacts by most recent vs. Alphabetical
Dynamic search bar which will automatically filter out your contacts depending on input
Demo button that will generate 10 random contacts for demonstration purposes

Appointments Page:
Add appointments using the contacts entered on the contacts page
Calendar which will show current date and days with appointments 
Clicking on days with appointments will open up a modal with appointment info

Home Page:
Week at a glance feature:
Updates the dates and days from Sunday to Saturday depending on the current week
Appointments added from the appointments page will be displayed in the week at a glance section 


Usage:

Code can be viewed here: https://github.com/keithAwarren/ApptPlanner
Github Pages link: https://keithawarren.github.io/ApptPlanner/
