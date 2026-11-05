# SpendWise — Interactive Budget Tracker

SpendWise is a responsive budgeting app built with HTML, CSS, and vanilla JavaScript. Set a monthly budget, record expenses by category, and see your spending and remaining balance update on the dashboard.

## Improvements made this week

- Replaced the earlier console/prompt-focused flow with interactive budget and expense forms on the page.
- Added a live dashboard with total budget, spending, remaining balance, expense count, budget progress, and biggest spending category.
- Added expense categories, category filtering, individual deletion, and a clear-all action.
- Added budget warnings, input validation, responsive styling, accessible labels/status feedback, and browser storage so data remains after a reload.
- Aligned the HTML element IDs and classes with the JavaScript and stylesheet so all parts of the app work together.

## JavaScript concepts

### Conditionals
`evaluateBudget()` uses `if`/`else if` statements to decide which message and style to show: no budget, on track, approaching the limit, or over budget. Other conditionals validate form values, apply filters, and show empty-state messages.

### Arrays and loops
The `expenses` array stores multiple expense objects. Each record contains an ID, name, amount, and category. `for` loops process the records to calculate spending and category totals and to render the filtered transaction list. Array methods are used to remove records and validate loaded data.

### DOM updates
The `renderDashboard()` and `renderList()` functions update page content with `textContent`, element attributes, and generated DOM elements. After the data changes, `render()` refreshes the dashboard and transaction list. Expense names are added as text rather than HTML so user input is not interpreted as markup.

### Events and user interactions
Submit event listeners handle the budget and expense forms. A change listener applies the category filter. A delegated click listener handles Delete buttons created dynamically, and the Clear all button asks for confirmation before removing records. These handlers update the array, save it, and re-render the page.

### Saving data
The budget, expense array, and next record ID are saved in `localStorage`. On load, the app validates saved records before using them. If browser storage is unavailable or malformed, the tracker still starts and works for the current page session.

## Challenges and solutions

A key integration challenge was that the original HTML used IDs and table markup that did not match the selectors and list structure expected by the JavaScript and CSS. I resolved this by aligning the form, dashboard, and transaction-list markup with the app's selectors and by using one consistent design. I also made storage loading defensive so invalid saved data does not prevent the app from opening.

## Run and test

1. Open `index.html` in a modern browser (or use a local development server).
2. Set a monthly budget and add expenses with a name, positive amount, and category.
3. Check that totals, remaining balance, progress, and budget feedback change after each addition.
4. Try filtering categories, deleting one expense, clearing all expenses, and reloading the page to verify saved data.
5. Try invalid or empty values to check the validation messages.

## Files

- `index.html` — accessible page structure and forms.
- `style.css` — responsive dashboard and interaction styles.
- `script.js` — expense data, calculations, conditionals, DOM rendering, events, and browser storage.
- `README.md` — project notes and implementation details.
