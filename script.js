/* SpendWise – interactive budget tracker
   Flow: user action (event) -> update data (array) -> re-render page (DOM) */

// ---------- Data ----------
let budget = 0;
let expenses = []; // array of { id, name, amount, category }
let nextId = 1;

// ---------- DOM references ----------
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
const bar = document.getElementById("bar");
const barFill = document.getElementById("bar-fill");
const statusMessage = document.getElementById("status-message");
const topCategory = document.getElementById("top-category");

const LARGE_EXPENSE_RATIO = 0.25; // an expense above 25% of budget is flagged

// ---------- Helpers ----------
function money(n) {
  return n.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// ---------- Data processing (loops) ----------
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
    if (totals[expense.category] === undefined) {
      totals[expense.category] = 0;
    }
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

// ---------- Decision making (conditionals) ----------
function evaluateBudget(spent) {
  if (budget <= 0) {
    return { level: "neutral", text: "Set a budget to get started." };
  }
  const percent = (spent / budget) * 100;

  if (spent > budget) {
    return { level: "danger", text: `Over budget by KES ${money(spent - budget)}. Time to cut back.` };
  } else if (percent >= 90) {
    return { level: "danger", text: `Careful: you've used ${percent.toFixed(0)}% of your budget.` };
  } else if (percent >= 70) {
    return { level: "warning", text: `Heads up: ${percent.toFixed(0)}% of your budget is gone.` };
  } else if (spent === 0) {
    return { level: "good", text: "No spending yet. Great start!" };
  } else {
    return { level: "good", text: `On track: ${percent.toFixed(0)}% used.` };
  }
}

// ---------- DOM updates ----------
function renderDashboard() {
  const spent = getTotalSpent();
  const remaining = budget - spent;

  statBudget.textContent = money(budget);
  statSpent.textContent = money(spent);
  statRemaining.textContent = money(remaining);
  statRemaining.style.color = remaining < 0 ? "var(--red)" : "inherit";
  statCount.textContent = expenses.length;

  const percent = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  barFill.style.width = percent + "%";
  bar.setAttribute("aria-valuenow", Math.round(percent));

  const result = evaluateBudget(spent);
  statusMessage.textContent = result.text;
  statusMessage.className = "status " + result.level;
  barFill.className = "bar-fill" + (result.level === "warning" || result.level === "danger" ? " " + result.level : "");

  const top = getTopCategory();
  topCategory.textContent = top
    ? `Biggest spending category: ${top.category} (KES ${money(top.amount)})`
    : "";
}

function renderList() {
  expenseList.innerHTML = "";
  const filter = filterSelect.value;
  let shown = 0;

  for (const expense of expenses) {
    if (filter !== "All" && expense.category !== filter) {
      continue;
    }
    shown++;

    const li = document.createElement("li");
    if (budget > 0 && expense.amount > budget * LARGE_EXPENSE_RATIO) {
      li.classList.add("large");
    }

    const name = document.createElement("span");
    name.className = "expense-name";
    name.textContent = expense.name;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = expense.category;

    const amount = document.createElement("span");
    amount.className = "expense-amount";
    amount.textContent = "KES " + money(expense.amount);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.type = "button";
    del.textContent = "Delete";
    del.dataset.id = expense.id;
    del.setAttribute("aria-label", "Delete " + expense.name);

    li.append(name, badge, amount, del);
    expenseList.appendChild(li);
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

// ---------- Events ----------
budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const value = parseFloat(budgetInput.value);
  if (isNaN(value) || value <= 0) {
    return;
  }
  budget = value;
  budgetInput.value = "";
  render();
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  // Validation with conditionals
  if (name === "") {
    formError.textContent = "Enter a description for the expense.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    formError.textContent = "Enter an amount greater than zero.";
    return;
  }
  formError.textContent = "";

  expenses.push({ id: nextId++, name: name, amount: amount, category: categoryInput.value });

  expenseForm.reset();
  nameInput.focus();
  render();
});

// Event delegation: one listener handles every Delete button
expenseList.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const id = Number(e.target.dataset.id);
    expenses = expenses.filter(function (expense) {
      return expense.id !== id;
    });
    render();
  }
});

filterSelect.addEventListener("change", renderList);

clearBtn.addEventListener("click", function () {
  if (expenses.length === 0) {
    return;
  }
  if (confirm("Delete all expenses?")) {
    expenses = [];
    render();
  }
});

// Initial paint
render();