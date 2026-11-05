/* SpendWise — user action -> update array data -> render the DOM. */

const STORAGE_KEY = "spendwise-data-v1";
const LARGE_EXPENSE_RATIO = 0.25;

// The array holds all expense records; each record is an object.
let budget = 0;
let expenses = [];
let nextId = 1;

const budgetForm = document.getElementById("budget-form");
const budgetInput = document.getElementById("budget-input");
const expenseForm = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const formError = document.getElementById("form-error");
const filterSelect = document.getElementById("filter");
const clearBtn = document.getElementById("clear-btn");
const expenseList = document.getElementById("expense-list");

const statBudget = document.getElementById("stat-budget");
const statSpent = document.getElementById("stat-spent");
const statRemaining = document.getElementById("stat-remaining");
const statCount = document.getElementById("stat-count");
const budgetPercent = document.getElementById("budget-percent");
const bar = document.getElementById("bar");
const barFill = document.getElementById("bar-fill");
const statusMessage = document.getElementById("status-message");
const topCategory = document.getElementById("top-category");

function money(value) {
  return Number(value).toLocaleString("en-KE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ budget, expenses, nextId }));
  } catch (error) {
    // The tracker still works for this page session if browser storage is unavailable.
    console.warn("SpendWise could not save data in this browser.", error);
  }
}

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved !== "object") return;

    if (Number.isFinite(saved.budget) && saved.budget >= 0) budget = saved.budget;
    if (Array.isArray(saved.expenses)) {
      expenses = saved.expenses.filter(function (expense) {
        return expense && Number.isFinite(expense.id) && typeof expense.name === "string" &&
          Number.isFinite(expense.amount) && expense.amount > 0 && typeof expense.category === "string";
      });
    }
    const largestId = expenses.reduce(function (largest, expense) {
      return Math.max(largest, expense.id);
    }, 0);
    nextId = Number.isInteger(saved.nextId) && saved.nextId > largestId ? saved.nextId : largestId + 1;
  } catch (error) {
    // Ignore invalid or unavailable saved data and start with an empty tracker.
    budget = 0;
    expenses = [];
    nextId = 1;
  }
}

// Loops process all stored expense records to calculate totals.
function getTotalSpent() {
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

function getCategoryTotals() {
  const totals = {};
  for (const expense of expenses) {
    if (totals[expense.category] === undefined) totals[expense.category] = 0;
    totals[expense.category] += expense.amount;
  }
  return totals;
}

function getTopCategory() {
  const totals = getCategoryTotals();
  let top = null;
  let topAmount = 0;
  for (const category in totals) {
    if (totals[category] > topAmount) {
      top = category;
      topAmount = totals[category];
    }
  }
  return top ? { category: top, amount: topAmount } : null;
}

// Conditionals provide feedback based on the user's budget and spending.
function evaluateBudget(spent) {
  if (budget <= 0) {
    return { level: "neutral", text: "Set a budget to get started." };
  }
  const percent = (spent / budget) * 100;
  if (spent > budget) {
    return { level: "danger", text: `Over budget by KES ${money(spent - budget)}. Review your spending.` };
  } else if (percent >= 90) {
    return { level: "danger", text: `Careful: you have used ${percent.toFixed(0)}% of your budget.` };
  } else if (percent >= 70) {
    return { level: "warning", text: `Heads up: you have used ${percent.toFixed(0)}% of your budget.` };
  } else if (spent === 0) {
    return { level: "good", text: "No spending yet. You are off to a great start!" };
  }
  return { level: "good", text: `On track: ${percent.toFixed(0)}% of your budget used.` };
}

// DOM manipulation keeps the dashboard synchronized with the array data.
function renderDashboard() {
  const spent = getTotalSpent();
  const remaining = budget - spent;
  const actualPercent = budget > 0 ? (spent / budget) * 100 : 0;
  const visiblePercent = Math.min(actualPercent, 100);

  statBudget.textContent = money(budget);
  statSpent.textContent = money(spent);
  statRemaining.textContent = money(remaining);
  statRemaining.style.color = remaining < 0 ? "var(--red)" : "inherit";
  statCount.textContent = String(expenses.length);
  budgetPercent.textContent = `${Math.round(actualPercent)}%`;
  barFill.style.width = `${visiblePercent}%`;
  bar.setAttribute("aria-valuenow", String(Math.round(visiblePercent)));

  const result = evaluateBudget(spent);
  statusMessage.textContent = result.text;
  statusMessage.className = `status ${result.level}`;
  barFill.className = "bar-fill" + (result.level === "warning" || result.level === "danger" ? ` ${result.level}` : "");

  const top = getTopCategory();
  topCategory.textContent = top ? `Biggest spending category: ${top.category} (KES ${money(top.amount)})` : "";
}

function renderList() {
  expenseList.replaceChildren();
  const selectedCategory = filterSelect.value;
  let shown = 0;

  for (const expense of expenses) {
    if (selectedCategory !== "All" && expense.category !== selectedCategory) continue;
    shown++;

    const item = document.createElement("li");
    if (budget > 0 && expense.amount > budget * LARGE_EXPENSE_RATIO) item.classList.add("large");

    const name = document.createElement("span");
    name.className = "expense-name";
    name.textContent = expense.name;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = expense.category;

    const amount = document.createElement("span");
    amount.className = "expense-amount";
    amount.textContent = `KES ${money(expense.amount)}`;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = String(expense.id);
    deleteButton.setAttribute("aria-label", `Delete ${expense.name}`);

    item.append(name, badge, amount, deleteButton);
    expenseList.appendChild(item);
  }

  if (shown === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = expenses.length === 0
      ? "No expenses yet. Add your first one above."
      : "No expenses in this category.";
    expenseList.appendChild(empty);
  }
}

function render() {
  renderDashboard();
  renderList();
}

// Events connect user actions to data changes and refreshed dashboard content.
budgetForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const value = Number.parseFloat(budgetInput.value);
  if (!Number.isFinite(value) || value <= 0) {
    budgetInput.setCustomValidity("Enter a budget greater than zero.");
    budgetInput.reportValidity();
    return;
  }
  budgetInput.setCustomValidity("");
  budget = value;
  budgetInput.value = "";
  saveData();
  render();
});

budgetInput.addEventListener("input", function () {
  budgetInput.setCustomValidity("");
});

expenseForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const amount = Number.parseFloat(amountInput.value);

  if (!name) {
    formError.textContent = "Enter a description for the expense.";
    nameInput.focus();
    return;
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    formError.textContent = "Enter an amount greater than zero.";
    amountInput.focus();
    return;
  }
  if (!categoryInput.value) {
    formError.textContent = "Choose an expense category.";
    categoryInput.focus();
    return;
  }

  formError.textContent = "";
  expenses.push({ id: nextId++, name, amount, category: categoryInput.value });
  saveData();
  expenseForm.reset();
  nameInput.focus();
  render();
});

// Event delegation lets one listener handle every dynamically created Delete button.
expenseList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-btn")) return;
  const id = Number(event.target.dataset.id);
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveData();
  render();
});

filterSelect.addEventListener("change", renderList);

clearBtn.addEventListener("click", function () {
  if (expenses.length === 0) return;
  if (window.confirm("Delete all expenses?")) {
    expenses = [];
    saveData();
    render();
  }
});

loadData();
render();
