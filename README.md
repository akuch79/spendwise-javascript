# SpendWise — Interactive Budget Tracker

## Project description

SpendWise is a responsive, browser-based monthly budget tracker built with vanilla HTML, CSS, and JavaScript. Set a budget, add expenses by category, review your spending and remaining balance, filter transactions, and remove expenses. The app saves data in the browser's `localStorage`.

## Technologies used

- HTML5 for the page structure and accessible forms
- CSS3 for responsive styling
- Vanilla JavaScript for validation, calculations, interactions, and browser storage
- Git and GitHub for source control
- Netlify for static-site hosting and continuous deployment

## GitHub repository information

- Repository: [akuch79/spendwise-javascript](https://github.com/akuch79/spendwise-javascript)
- Repository visibility: Public
- Site files are in the repository root: `index.html`, `style.css`, and `script.js`.

## Live Netlify website URL

**Add the published Netlify URL here after deploying:** `https://YOUR-CUSTOM-SITE-NAME.netlify.app`

Replace the example URL above with the actual URL shown in your Netlify site settings before submitting. The Netlify deployment and live URL cannot be confirmed from this repository change alone.

## Deployment process summary

1. Push the complete project to the public GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project** and connect GitHub.
3. Select `akuch79/spendwise-javascript` and authorize access if prompted.
4. Configure the site as a static site. The included `netlify.toml` sets the repository root as the publish directory; no build command is required.
5. Deploy the site, then choose a meaningful available Netlify site name under **Site configuration → Site details → Change site name**. The resulting address will be `https://YOUR-CUSTOM-SITE-NAME.netlify.app`.
6. Add the actual live URL to the section above.
7. Make a visible change, push it to the connected deployment branch, and check Netlify's **Deploys** page to confirm a new deploy completes. This commit changes the page's eyebrow text to “YOUR BUDGET, AT A GLANCE”; check for that text on the live page after deployment.
8. Test the live site on desktop and mobile, including CSS/JavaScript loading, setting a budget, adding expenses, filtering, deleting, clearing, and reloading to confirm browser storage.

## Challenges encountered during deployment

This project is a static site with no package manager or build step, so the important deployment configuration is making sure Netlify publishes the repository root where `index.html`, `style.css`, and `script.js` live. A second step that must be completed in Netlify is choosing an available custom subdomain. The actual Netlify deployment has not been run or verified as part of this repository update, so record any additional issues encountered there before submitting.

## Lessons learned

- Keep the entry-point HTML and its linked CSS and JavaScript in the published directory.
- Static sites can be deployed without a build command when their files are already ready to serve.
- Connecting GitHub to Netlify enables automatic deployments when the connected branch changes.
- Confirm a deployment in Netlify and test the public URL; a successful GitHub push alone does not prove that the live site updated.
- Update documentation with the real live URL rather than a guessed or placeholder address.

## Submission steps

1. Complete the Netlify deployment and set a custom site name.
2. Verify the visible update appears on the live site after an automatic deployment.
3. Test the deployed website and replace the placeholder in **Live Netlify website URL** with the real URL.
4. Commit and push the updated README to GitHub, then confirm Netlify deploys that update too.
5. Submit only this GitHub repository link through the LMS: <https://github.com/akuch79/spendwise-javascript>.

## Project files

- `index.html` — page structure and forms
- `style.css` — responsive visual design
- `script.js` — budget and expense behavior
- `netlify.toml` — Netlify static-site publish configuration
- `README.md` — project and deployment documentation
