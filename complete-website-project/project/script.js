const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const themeButton = document.getElementById("themeButton");
const faqQuestions = document.querySelectorAll(".faq-question");
const contactForm = document.getElementById("contactForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const course = document.getElementById("course");
const formMessage = document.getElementById("formMessage");

menuButton.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeButton.textContent = "Light Mode";
  } else {
    themeButton.textContent = "Dark Mode";
  }
});

faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    const answer = question.nextElementSibling;
    answer.classList.toggle("open");
  });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameValue = fullName.value.trim();
  const emailValue = email.value.trim();
  const courseValue = course.value;

  if (nameValue === "") {
    showMessage("Please enter your full name.", "error");
    return;
  }

  if (!emailValue.includes("@")) {
    showMessage("Please enter a valid email address.", "error");
    return;
  }

  if (courseValue === "") {
    showMessage("Please select a course.", "error");
    return;
  }

  showMessage(`Thank you ${nameValue}. Your demo request for ${courseValue} is submitted.`, "success");
  contactForm.reset();
});

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = "form-message " + type;
}
