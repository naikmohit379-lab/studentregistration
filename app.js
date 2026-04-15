// array to store student data
let students = [];

// this tells if we are editing a student
let editIndex = -1;

// getting elements from HTML
let form = document.getElementById("studentForm");
let nameInput = document.getElementById("studentName");
let idInput = document.getElementById("studentId");
let emailInput = document.getElementById("email");
let contactInput = document.getElementById("contact");
let submitBtn = document.getElementById("submitBtn");
let tableBody = document.querySelector("#studentsTable tbody");
let tableWrapper = document.getElementById("tableWrapper");

// load old data when page opens
window.onload = function () {
    let savedStudents = localStorage.getItem("studentData");

    if (savedStudents) {
        students = JSON.parse(savedStudents);
        displayStudents();
    }
};

// when form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let name = nameInput.value.trim();
    let id = idInput.value.trim();
    let email = emailInput.value.trim();
    let contact = contactInput.value.trim();

    // simple validation
    if (name === "" || id === "" || email === "" || contact === "") {
        alert("Please fill all fields");
        return;
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
        alert("Name should contain only letters");
        return;
    }

    if (!/^\d+$/.test(id)) {
        alert("Student USN should contain only numbers");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Enter a valid email");
        return;
    }

    if (!/^\d{10,}$/.test(contact)) {
        alert("Contact number must be at least 10 digits");
        return;
    }

    // creating one student object
    let student = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    // if editing, update the student
    if (editIndex !== -1) {
        students[editIndex] = student;
        editIndex = -1;
        submitBtn.textContent = "Add Student";
    } else {
        // otherwise add new student
        students.push(student);
    }

    // save data
    localStorage.setItem("studentData", JSON.stringify(students));

    // show data in table
    displayStudents();

    // clear form
    form.reset();
});

// function to show students in table
function displayStudents() {
    tableBody.innerHTML = "";

    for (let i = 0; i < students.length; i++) {
        tableBody.innerHTML += `
            <tr>
                <td>${students[i].name}</td>
                <td>${students[i].id}</td>
                <td>${students[i].email}</td>
                <td>${students[i].contact}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editStudent(${i})">Edit</button>
                    <button class="action-btn delete-btn" onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `;
    }

    // scrollbar
    if (students.length > 5) {
        tableWrapper.style.maxHeight = "250px";
        tableWrapper.style.overflowY = "auto";
    } else {
        tableWrapper.style.maxHeight = "320px";
        tableWrapper.style.overflowY = "auto";
    }
}

// function to edit student
function editStudent(index) {
    nameInput.value = students[index].name;
    idInput.value = students[index].id;
    emailInput.value = students[index].email;
    contactInput.value = students[index].contact;

    editIndex = index;
    submitBtn.textContent = "Update Student";
}

// function to delete student
function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("studentData", JSON.stringify(students));
    displayStudents();
}

