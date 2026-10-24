
// ===================================
// 1. STORE APPLICATION DATA
// ===================================

// Variables
let budgetAmount = 0;
let totalExpenses = 0;
let remainingBalance = 0;

// Array to store expenses
let expensesList = [];

// ===================================
// 2. REUSABLE FUNCTIONS
// ===================================

// Function to calculate remaining balance
function calculateRemainingBalance(budget, expenses) {
    return budget - expenses;
}

// Function to display budget information
function displayBudgetSummary() {

    remainingBalance = calculateRemainingBalance(
        budgetAmount,
        totalExpenses
    );

    document.getElementById("budget").textContent =
        `KES ${budgetAmount.toFixed(2)}`;

    document.getElementById("expenses").textContent =
        `KES ${totalExpenses.toFixed(2)}`;

    document.getElementById("balance").textContent =
        `KES ${remainingBalance.toFixed(2)}`;

    // Display results in browser console
    console.log("===== SPENDWISE BUDGET SUMMARY =====");
    console.log("Total Budget: KES " + budgetAmount.toFixed(2));
    console.log("Total Expenses: KES " + totalExpenses.toFixed(2));
    console.log("Remaining Balance: KES " + remainingBalance.toFixed(2));
}

// Function to add an expense
function addExpense(name, amount) {

    if (name.trim() === "" || !Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    const expense = {
        name: name,
        amount: amount
    };

    expensesList.push(expense);

    totalExpenses += amount;

    // Update remaining balance
    displayBudgetSummary();

    // Display expense in the browser
    displayExpenses();
}

// Function to display expenses
function displayExpenses() {

    const expenseList = document.getElementById("expenseList");

    expenseList.innerHTML = "";

    expensesList.forEach(function(expense) {

        const listItem = document.createElement("li");

        listItem.textContent =
            `${expense.name} - KES ${expense.amount.toFixed(2)}`;

        expenseList.appendChild(listItem);
    });
}

// ===================================
// 3. COLLECT USER INPUT
// ===================================

// Collect budget information
document.getElementById("budgetForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const budgetInput = Number(
            document.getElementById("budgetInput").value
        );

        if (!Number.isFinite(budgetInput) || budgetInput <= 0) {
            alert("Please enter a valid budget.");
            return;
        }

        if (budgetInput < totalExpenses) {
            alert("Your budget cannot be less than your current expenses.");
            return;
        }

        budgetAmount = budgetInput;

        console.log("New budget set: KES " + budgetAmount);

        displayBudgetSummary();
    }
);

// Collect expense information
document.getElementById("expenseForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const expenseName =
            document.getElementById("expenseName").value;

        const expenseAmount = Number(
            document.getElementById("expenseAmount").value
        );

        if (budgetAmount <= 0) {
            alert("Please set your budget first.");
            return;
        }

        if (!Number.isFinite(expenseAmount) || expenseAmount <= 0) {
            alert("Please enter a valid expense amount.");
            return;
        }

        if (totalExpenses + expenseAmount > budgetAmount) {
            alert("This expense exceeds your remaining budget.");
            return;
        }

        addExpense(expenseName, expenseAmount);

        document.getElementById("expenseForm").reset();
    }
);

// ===================================
// 4. JAVASCRIPT PROMPT INPUT
// ===================================

document.getElementById("promptButton").addEventListener(
    "click",
    function() {

        // Get budget from user
        const userBudget = Number(
            prompt("Enter your total budget in KES:")
        );

        if (!Number.isFinite(userBudget) || userBudget <= 0) {
            alert("Please enter a valid budget.");
            return;
        }

        // Get expenses from user
        const userExpenses = Number(
            prompt("Enter your total expenses in KES:")
        );

        if (!Number.isFinite(userExpenses) || userExpenses < 0) {
            alert("Please enter valid expenses.");
            return;
        }

        if (userExpenses > userBudget) {
            alert("Your expenses cannot exceed your budget.");
            return;
        }

        // Store user information
        budgetAmount = userBudget;
        totalExpenses = userExpenses;

        // Calculate remaining balance
        remainingBalance = calculateRemainingBalance(
            budgetAmount,
            totalExpenses
        );

        // Display results in console
        console.log("===== PROMPT BUDGET CALCULATION =====");
        console.log("User Budget: KES " + budgetAmount);
        console.log("User Expenses: KES " + totalExpenses);
        console.log("Remaining Balance: KES " + remainingBalance);

        // Update dashboard
        expensesList = [];
        displayExpenses();
        displayBudgetSummary();

        alert("Your budget calculation is complete! Check the console.");
    }
);

// ===================================
// 5. INITIAL APPLICATION OUTPUT
// ===================================

console.log("Welcome to SpendWise!");
console.log("JavaScript loaded successfully.");

displayBudgetSummary();
