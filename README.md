# [Academy Name] website
React + TypeScript + Vite. Run `npm install`, then `npm run dev` or `npm run build`.
- Content, tutors, FAQs and contact details: `src/content.ts`
- Enquiry form: set `CONFIG.formEndpoint` (Formspree or your backend). Until then the form validates but sends nothing.
- Deploy: `public/_redirects` handles SPA routing on Netlify; other hosts need a fallback to `index.html`. Replace `YOUR-DOMAIN` in `public/sitemap.xml` and `public/robots.txt`.
