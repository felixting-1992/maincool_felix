# Receipe Secrets website Requirements

Build a simple, responsive website for "Recipe Secrets Restaurant".

## Tech constraints
- Plain HTML, CSS, and vanilla JavaScript only. No frameworks, no build step, no backend.
- Must deploy as static files to free hosting (GitHub Pages or Netlify). Open index.html locally and everything should work.
- One shared stylesheet (css/styles.css) and one small script (js/main.js). No external dependencies except Google Fonts.

## Pages (exactly 5)
1. **Home** (index.html): hero section with restaurant name, tagline, and a "Book a Table" button linking to the reservation page. Short intro, 3 featured dishes, opening hours, and a call to action.
2. **About** (about.html): restaurant story, chef/team section, and our cooking philosophy.
3. **Specials** (specials.html): this week's specials as cards (dish name, short description, price, optional dietary tags like V / GF / Spicy). Keep the data in a single JS array or clearly marked HTML block so it's easy to update weekly.
4. **Reservation** (reservation.html): form with name, email, phone, date, time, party size (1–12), and special requests. Client-side validation (required fields, no past dates, valid email). Submit via Formspree (use a placeholder endpoint `https://formspree.io/f/YOUR_FORM_ID` with a comment explaining how to replace it). Show a success message after submit.
5. **Contact** (contact.html): address, phone, email, opening hours, embedded Google Maps iframe (placeholder address), and a simple contact form (name, email, message) also using Formspree.

## Shared layout
- Consistent header with logo text and nav links to all 5 pages; highlight the current page.
- Mobile hamburger menu below 768px.
- Footer with address, hours, social media icon links (placeholders), and copyright year.

## Design
- Warm, upscale-but-welcoming feel. Suggested palette: deep burgundy, cream, and gold accents. Serif font for headings (e.g. Playfair Display), clean sans-serif for body (e.g. Inter).
- Mobile-first and responsive at 375px, 768px, and 1280px.
- Use placeholder images from Unsplash (food/restaurant themes) with descriptive alt text.

## Quality requirements
- Semantic HTML (header, nav, main, section, footer), accessible labels on all form fields, good color contrast, keyboard-navigable menu.
- Unique <title> and meta description on every page; favicon placeholder.
- No console errors. Keep code clean and commented where it helps a beginner edit it.

## Placeholder content
Use realistic placeholder text for anything I haven't provided, and mark it with `<!-- TODO: replace -->` so I can find it. Known details:
- Address: [FILL IN]
- Phone: [FILL IN]
- Email: [FILL IN]
- Opening hours: [FILL IN]
- Cuisine type: [FILL IN]

## Deliverables
1. All files in a clean folder structure (/, /css, /js, /images).
2. A README.md with: how to preview locally, how to set up Formspree, how to update the weekly specials, and step-by-step deployment to GitHub Pages and Netlify.

Before writing code, briefly outline the file structure and design choices, then build all pages.

