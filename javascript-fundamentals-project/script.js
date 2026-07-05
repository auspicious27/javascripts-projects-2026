const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const studentEmail = document.getElementById("studentEmail");
const studentSkill = document.getElementById("studentSkill");
const studentLevel = document.getElementById("studentLevel");
const message = document.getElementById("message");
const stats = document.getElementById("stats");
const studentList = document.getElementById("studentList");
const resetBtn = document.getElementById("resetBtn");

let students = [];

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

function getLevelStatus(level) {
  if (level >= 8) {
    return "Advanced";
  }

  if (level >= 5) {
    return "Intermediate";
  }

  return "Beginner";
}

function renderStudents() {
  studentList.innerHTML = "";
  stats.textContent = "Total Students: " + students.length;

  if (students.length === 0) {
    studentList.innerHTML = '<p class="empty">No students added yet.</p>';
    return;
  }

  for (let student of students) {
    const card = document.createElement("article");
    card.className = "student-card";

    card.innerHTML = `
      <h3>${student.name}</h3>
      <p>Email: ${student.email}</p>
      <p>Skill: ${student.skill}</p>
      <span class="level-badge">${student.status} - Level ${student.level}</span>
    `;

    studentList.appendChild(card);
  }
}

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = studentName.value.trim();
  const emailValue = studentEmail.value.trim();
  const skillValue = studentSkill.value;
  const levelValue = Number(studentLevel.value);

  if (nameValue === "") {
    showMessage("Please enter student name.", "error");
    return;
  }

  if (!emailValue.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (skillValue === "") {
    showMessage("Please select a skill.", "error");
    return;
  }

  if (levelValue < 1 || levelValue > 10) {
    showMessage("Practice level must be between 1 and 10.", "error");
    return;
  }

  const student = {
    name: nameValue,
    email: emailValue,
    skill: skillValue,
    level: levelValue,
    status: getLevelStatus(levelValue)
  };

  students.push(student);
  renderStudents();
  showMessage("Student added successfully.", "success");
  studentForm.reset();
});

resetBtn.addEventListener("click", function () {
  students = [];
  renderStudents();
  showMessage("Student list reset successfully.", "success");
});

renderStudents();
