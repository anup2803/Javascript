let currentId = 0;
let students = [];
let editingId = null;

//generated id
function idGenerator() {
  currentId++;
  return currentId;
}

//id provide to the each students
let generatedId = idGenerator();
document.getElementById("idDisplay").innerText = generatedId;

// elements from the html
const form = document.getElementById("student-form");
const addButton = document.getElementById("add-button");
const tableContainer = document.getElementById("table-container");
const tableBody = document.getElementById("studentTableBody");
const modal = document.getElementById("studentModal");
const closeModal = document.getElementById("closeModal");

//when clicking the add student button
addButton.onclick = () => {
  editingId = null;
  form.reset();
  document.getElementById("idDisplay").innerText = generatedId;
  modal.style.display = "block";
};

closeModal.onclick = () => {
  modal.style.display = "none";
};

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

//showing the details of student
function showStudentDetails(show) {
  tableContainer.style.display = show ? "block" : "none";
}

//render table data
const renderTable = (data = students) => {
  tableBody.innerHTML = "";

  data.forEach((student) => {
    tableBody.innerHTML += `
      <tr>
        <td>${student.id}</td>
        <td>${student.fullName}</td>
        <td>${student.email}</td>
        <td>${student.rollNumber}</td>
        <td>${student.studentClass}</td>
        <td>${student.city}</td>
        <td>${student.university}</td>
        <td>${student.startDate}</td>
        <td>${student.endDate}</td>
        <td>
          <button onclick="viewStudent(${student.id})">View</button>
          <button onclick="editStudent(${student.id})">Edit</button>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      </tr>
    `;
  });
};

//submit form
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const student = {
    id: editingId ?? generatedId,
    fullName: document.getElementById("fullname").value,
    email: document.getElementById("email").value,
    rollNumber: document.getElementById("rollnumber").value,
    studentClass: document.getElementById("class").value,
    city: document.getElementById("city").value,
    university: document.getElementById("university").value,
    startDate: document.getElementById("startingDate").value,
    endDate: document.getElementById("endingDate").value,
  };

  if (editingId === null) {
    students.push(student);

    generatedId = idGenerator();
    document.getElementById("idDisplay").innerText = generatedId;
  } else {
    const index = students.findIndex((s) => s.id === editingId);

    students[index] = student;

    editingId = null;
  }

  renderTable();
  showStudentDetails(true);

  form.reset();
  modal.style.display = "none";
});

//delete the students
const deleteStudent = (id) => {
  students = students.filter((student) => student.id !== id);
  renderTable();

  if (students.length === 0) {
    showStudentDetails(false);
  }
};

//view students
const viewStudent = (id) => {
  const student = students.find((student) => student.id === id);
  const studentDetails = document.getElementById("studentDetails");

  studentDetails.innerHTML = `
    <p><strong>Id:</strong> ${student.id}</p>
    <p><strong>Full Name:</strong> ${student.fullName}</p>
    <p><strong>Email:</strong> ${student.email}</p>
    <p><strong>Roll No:</strong> ${student.rollNumber}</p>
    <p><strong>Class:</strong> ${student.studentClass}</p>
    <p><strong>City:</strong> ${student.city}</p>
    <p><strong>University:</strong> ${student.university}</p>
    <p><strong>Starting Date:</strong> ${student.startDate}</p>
    <p><strong>Ending Date:</strong> ${student.endDate}</p>
  `;
  viewModal.style.display = "block";
};

const viewModal = document.getElementById("viewModal");
const closeViewModal = document.getElementById("closeViewModal");

closeViewModal.addEventListener("click", () => {
  viewModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === viewModal) {
    viewModal.style.display = "none";
  }
});

//Edit Students
const editStudent = (id) => {
  const student = students.find((s) => s.id === id);

  editingId = id;
  document.getElementById("saveBtn").innerText = "Update Student";
  document.getElementById("modalTitle").innerText = "Edit Student";
  document.getElementById("idDisplay").innerText = student.id;
  document.getElementById("fullname").value = student.fullName;
  document.getElementById("email").value = student.email;
  document.getElementById("rollnumber").value = student.rollNumber;
  document.getElementById("class").value = student.studentClass;
  document.getElementById("city").value = student.city;
  document.getElementById("university").value = student.university;
  document.getElementById("startingDate").value = student.startDate;
  document.getElementById("endingDate").value = student.endDate;

  modal.style.display = "block";
};

//search student
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(keyword),
  );
  renderTable(filteredStudents);
});
