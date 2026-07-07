const expenseForm = document.getElementById("expenseForm");
const expenseTitle = document.getElementById("expenseTitle");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const filterCategory = document.getElementById("filterCategory");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const totalItems = document.getElementById("totalItems");
const highestExpense = document.getElementById("highestExpense");
const message = document.getElementById("message");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function showMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
}

function getFilteredExpenses() {
  const selectedCategory = filterCategory.value;

  if (selectedCategory === "All") {
    return expenses;
  }

  return expenses.filter(function (expense) {
    return expense.category === selectedCategory;
  });
}

function updateSummary() {
  const total = expenses.reduce(function (sum, expense) {
    return sum + expense.amount;
  }, 0);

  const highest = expenses.length === 0 ? 0 : Math.max(...expenses.map(function (expense) {
    return expense.amount;
  }));

  totalAmount.textContent = "Rs. " + total;
  totalItems.textContent = expenses.length;
  highestExpense.textContent = "Rs. " + highest;
}

function renderExpenses() {
  const filteredExpenses = getFilteredExpenses();
  expenseList.innerHTML = "";

  if (filteredExpenses.length === 0) {
    expenseList.innerHTML = '<p class="empty">No expenses found for this category.</p>';
    updateSummary();
    return;
  }

  filteredExpenses.forEach(function (expense) {
    const card = document.createElement("article");
    card.className = "expense-card";
    card.innerHTML = `
      <div>
        <h3>${expense.title}</h3>
        <p class="expense-meta">${expense.category}</p>
      </div>
      <div>
        <div class="amount">Rs. ${expense.amount}</div>
        <button class="delete-btn" data-id="${expense.id}">Delete</button>
      </div>
    `;
    expenseList.appendChild(card);
  });

  updateSummary();
}

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const titleValue = expenseTitle.value.trim();
  const amountValue = Number(expenseAmount.value);
  const categoryValue = expenseCategory.value;

  if (titleValue === "") {
    showMessage("Please enter expense title.", "error");
    return;
  }

  if (amountValue <= 0) {
    showMessage("Please enter a valid amount.", "error");
    return;
  }

  if (categoryValue === "") {
    showMessage("Please choose a category.", "error");
    return;
  }

  const expense = {
    id: Date.now(),
    title: titleValue,
    amount: amountValue,
    category: categoryValue
  };

  expenses.push(expense);
  saveExpenses();
  renderExpenses();
  showMessage("Expense added successfully.", "success");
  expenseForm.reset();
});

expenseList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    const expenseId = Number(event.target.dataset.id);
    expenses = expenses.filter(function (expense) {
      return expense.id !== expenseId;
    });
    saveExpenses();
    renderExpenses();
    showMessage("Expense deleted successfully.", "success");
  }
});

filterCategory.addEventListener("change", function () {
  renderExpenses();
});

renderExpenses();
