# SpendWise — Interactive Budget Tracker

SpendWise is a responsive budgeting app built with HTML, CSS, and vanilla JavaScript. Set a monthly budget, record expenses by category, and see your spending and remaining balance update on the dashboard.

## Project and live site

- **Public GitHub repository:** https://github.com/akuch79/spendwise-javascript
- **Live Netlify site:** https://shimmering-frangipane-fdf844.netlify.app/

## Features

- Set a monthly budget and add expenses with a name, amount, and category.
- View total budget, spending, remaining balance, expense count, budget progress, and biggest spending category.
- Filter expenses by category, delete individual expenses, or clear all expenses.
- Get budget warnings and form validation feedback.
- Keep the budget and expenses in browser `localStorage` between visits.
- Use the responsive interface with accessible form labels and status feedback.

## JavaScript concepts

### Conditionals
`evaluateBudget()` uses `if`/`else if` statements to decide which message and style to show: no budget, on track, approaching the limit, or over budget. Other conditionals validate form values, apply filters, and show empty-state messages.

### Arrays and loops
The `expenses` array stores expense objects, each with an ID, name, amount, and category. Loops process records to calculate spending and category totals and render the filtered transaction list. Array methods remove records and validate loaded data.

### DOM updates
`renderDashboard()` and `renderList()` update page content with `textContent`, element attributes, and generated DOM elements. After data changes, `render()` refreshes the dashboard and transaction list. Expense names are inserted as text rather than HTML markup.

### Events and user interactions
Submit event listeners handle the budget and expense forms. A change listener applies the category filter. A delegated click listener handles dynamically created Delete buttons, and the Clear all button asks for confirmation before removing records.

### Saving data
The budget, expense array, and next record ID are saved in `localStorage`. On load, saved records are validated before use. If browser storage is unavailable or malformed, the tracker still starts and works for the current page session.

## Deployment with GitHub and Netlify

This is a static site: it does not require a build command. The repository is connected to Netlify for continuous deployment.

- **GitHub repository:** `akuch79/spendwise-javascript`
- **Production branch:** `main`
- **Build command:** none
- **Publish directory:** `.` (the repository root, where `index.html` is located)
- **Live URL:** https://shimmering-frangipane-fdf844.netlify.app/

To publish an update, commit and push changes to `main`. Netlify should create a deployment from that commit; check the site's **Deploys** page to confirm its status. The URL above is the current Netlify URL. If the assignment requires a more recognizable Netlify subdomain or a custom domain, configure it in Netlify's **Domain management** settings and replace the live URL here with the final address.

## Challenges and solutions

A key integration challenge was that the original HTML used IDs and table markup that did not match the selectors and list structure expected by the JavaScript and CSS. I resolved this by aligning the form, dashboard, and transaction-list markup with the app's selectors and using one consistent design. I also made storage loading defensive so invalid saved data does not prevent the app from opening.

For deployment, the app needs no compilation or dependency installation, so the main configuration is to publish the repository root containing `index.html`. After pushing changes, the Netlify deploy status can be checked in the site's **Deploys** page.

## Run and test locally

1. Open `index.html` in a modern browser (or use a local development server).
2. Set a monthly budget and add expenses with a name, positive amount, and category.
3. Check that totals, remaining balance, progress, and budget feedback change after each addition.
4. Try filtering categories, deleting one expense, clearing all expenses, and reloading the page to verify saved data.
5. Try invalid or empty values to check the validation messages.

## Files

- `index.html` — accessible page structure and forms.
- `style.css` — responsive dashboard and interaction styles.
- `script.js` — expense data, calculations, conditionals, DOM rendering, events, and browser storage.
- `README.md` — project details, deployment links, and instructions.
