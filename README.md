# Shrey Chauhan — Developer Portfolio

Single-page portfolio for **Chauhan Shreykumar Harshadbhai**, Microsoft Dynamics 365 Business Central Developer.

Built with **React 18**, **Tailwind CSS v4**, **Vite**, and **Lucide React** icons. Dark mode by default, glassmorphism cards, gradient accents, smooth scrolling, and scroll-triggered entrance animations.

## Sections

- **Hero** — headline, resume download, GitHub / LinkedIn links
- **About** — professional summary + quick stats + education
- **Experience** — timeline of roles at Leaping Frog Solutions
- **Projects** — dimension-based reporting, GST/TDS/TCS automation, E-Way Bill & E-Invoicing integration, EXIM / MSME modules, container tracking
- **Skills** — categorized badge grid
- **Contact** — email, phone, social links

## Running locally

Requires [Node.js](https://nodejs.org/) 18+ (LTS recommended).

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build
```

The `dist/` folder is a fully static site — deploy it to GitHub Pages, Netlify, Vercel, or any static host.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages at https://shreychauhan29.github.io/Portfolio/

## Things to customize

- **Resume file** — `public/Shrey-Chauhan-Resume.docx` is served by the "Download Resume" button. Replace it when your resume updates.
- All content (experience bullets, projects, skills) lives in the constant arrays at the top of `src/App.jsx`.
