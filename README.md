# Recipe Secrets Restaurant — Website

A simple, responsive 5-page website built with plain HTML, CSS, and vanilla
JavaScript. No frameworks, no build tools, no backend required.

## File structure

```
recipe_website/
├── index.html         Home page
├── about.html          About page
├── specials.html        Weekly specials page
├── reservation.html      Reservation form page
├── contact.html         Contact page + map
├── css/
│   └── styles.css       Shared stylesheet (all pages)
├── js/
│   └── main.js         Shared script (nav, specials data, form validation)
├── images/            (placeholder — Unsplash images are currently loaded
│                        directly by URL; add local images here if you'd
│                        rather self-host them)
└── README.md
```

## Preview locally

No build step needed. Either:

1. Double-click `index.html` to open it directly in your browser, **or**
2. For the best experience (and to avoid any browser quirks with `fetch`),
   serve the folder with a simple local server, e.g.:
   ```bash
   cd recipe_website
   python3 -m http.server 8000
   ```
   then open `http://localhost:8000` in your browser.

## Setting up Formspree (for the Reservation and Contact forms)

Both forms submit to [Formspree](https://formspree.io), a free service that
emails you form submissions without needing your own backend.

1. Go to <https://formspree.io> and sign up for a free account.
2. Create a new form and copy the endpoint it gives you — it looks like
   `https://formspree.io/f/abcd1234`.
3. Open `reservation.html` and `contact.html`, and find the line:
   ```html
   <form id="reservation-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
   ```
   Replace `https://formspree.io/f/YOUR_FORM_ID` with your real endpoint.
   (You can use the same endpoint for both forms, or create two separate
   Formspree forms if you'd like the submissions kept apart.)
4. That's it — `js/main.js` already handles submitting the form data via
   `fetch` and showing the green success message once Formspree confirms
   the submission. No other code changes are needed.
5. The first submission to a new Formspree form usually requires you to
   confirm the destination email address — check your inbox after testing.

## Updating the weekly specials

The specials shown on `specials.html` come from a single JavaScript array
so it's quick to update each week without touching any HTML.

1. Open `js/main.js`.
2. Find the `weeklySpecials` array near the top of the file.
3. Edit, add, or remove entries. Each dish looks like this:
   ```js
   {
     name: "Seared Duck Breast",
     description: "Pan-seared duck breast with a cherry-port reduction...",
     price: "$28",
     tags: ["GF"],              // optional: "V", "GF", "Spicy", etc.
     image: "https://images.unsplash.com/...",
   },
   ```
4. Save the file and refresh `specials.html` — the cards update automatically.

## Replacing placeholder content

Search the project for `<!-- TODO: replace -->` to find every placeholder
that should be swapped with real restaurant details, including:

- Address, phone, email, and opening hours (in every page's footer, the
  Contact page, and the Home page hours table)
- The Google Maps iframe on `contact.html` (replace the `src` query with
  your real address)
- Social media links in the footer
- Team photos and bios on `about.html`
- The favicon (`<link rel="icon">` in each `<head>`) — currently a simple
  emoji placeholder; swap it for a real `favicon.ico` or SVG in the project
  root and update the `<link>` tags

## Deployment

### GitHub Pages

1. Create a new GitHub repository and push this folder's contents to it
   (the repo root should contain `index.html`, not a subfolder):
   ```bash
   cd recipe_website
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch".
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. After a minute, your site will be live at
   `https://YOUR_USERNAME.github.io/YOUR_REPO/`.

### Netlify

**Option A — drag and drop (fastest):**
1. Go to <https://app.netlify.com/drop>.
2. Drag the `recipe_website` folder onto the page.
3. Netlify will give you a live URL immediately.

**Option B — connect to Git (for ongoing updates):**
1. Push the project to a GitHub (or GitLab/Bitbucket) repository as above.
2. In Netlify, click **Add new site → Import an existing project**.
3. Connect your Git provider and select the repository.
4. Leave the build command blank and set the publish directory to the
   project root (`.` or `recipe_website` depending on your repo layout).
5. Click **Deploy site** — Netlify will redeploy automatically on every
   push to the connected branch.
