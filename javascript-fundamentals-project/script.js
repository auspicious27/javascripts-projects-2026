let outputText = document.getElementById("outputText");

document.getElementById("syntaxBtn").addEventListener("click", function () {
  outputText.textContent = "Syntax demo: Hello JavaScript. 10 + 5 = " + (10 + 5);
});

document.getElementById("variableBtn").addEventListener("click", function () {
  let studentName = "Aman";
  let age = 21;
  outputText.textContent = "Variables demo: " + studentName + " is " + age + " years old.";
});

document.getElementById("conditionBtn").addEventListener("click", function () {
  let marks = 75;

  if (marks >= 40) {
    outputText.textContent = "Conditions demo: Student passed with " + marks + " marks.";
  } else {
    outputText.textContent = "Conditions demo: Student failed.";
  }
});

document.getElementById("loopBtn").addEventListener("click", function () {
  let subjects = ["HTML", "CSS", "JavaScript"];
  let result = "";

  for (let subject of subjects) {
    result = result + subject + " ";
  }

  outputText.textContent = "Loops demo: " + result;
});

document.getElementById("functionBtn").addEventListener("click", function () {
  function calculateTotal(price, quantity) {
    return price * quantity;
  }

  outputText.textContent = "Functions demo: Total bill is Rs. " + calculateTotal(500, 3);
});

document.getElementById("arrayBtn").addEventListener("click", function () {
  let destinations = ["Manali", "Goa", "Jaipur"];
  destinations.push("Kerala");
  outputText.textContent = "Arrays demo: " + destinations.join(", ");
});

document.getElementById("objectBtn").addEventListener("click", function () {
  let user = {
    name: "Sara",
    course: "JavaScript",
    active: true
  };

  outputText.textContent = "Objects demo: " + user.name + " is learning " + user.course + ". Active: " + user.active;
});

document.getElementById("domBtn").addEventListener("click", function () {
  outputText.textContent = "DOM demo: JavaScript changed this text and color.";
  outputText.style.color = "green";
});

let signupForm = document.getElementById("signupForm");
let studentName = document.getElementById("studentName");
let studentEmail = document.getElementById("studentEmail");
let studentPassword = document.getElementById("studentPassword");
let formMessage = document.getElementById("formMessage");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (studentName.value.trim() === "") {
    formMessage.textContent = "Please enter student name.";
    formMessage.style.color = "red";
    return;
  }

  if (!studentEmail.value.includes("@")) {
    formMessage.textContent = "Please enter a valid email.";
    formMessage.style.color = "red";
    return;
  }

  if (studentPassword.value.length < 6) {
    formMessage.textContent = "Password must be at least 6 characters.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Form submitted successfully.";
  formMessage.style.color = "green";
});
