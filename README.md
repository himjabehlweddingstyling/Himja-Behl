# Himja Behl — Premium Wedding Styling

A highly-curated, editorial web experience for Himja Behl, a luxury Indian wedding stylist. This repository contains the source code for the official website, built with modern web standards emphasizing performance, responsive design, and fluid micro-interactions.

## 🚀 Tech Stack
*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Language**: TypeScript
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Mailing**: Nodemailer (via Next.js API Routes)

## 📦 Local Setup

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file in the root directory based on `.env.example`.
   You will need to generate a Google App Password for the contact form to function securely.
   ```bash
   GMAIL_USER=your.email@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Design Philosophy
The UI is strictly designed to emulate a high-fashion, editorial coffee-table book. It utilizes extreme typography contrast (Cormorant Garamond vs Inter), generous whitespace, and a heavily desaturated maroon/gold palette to convey heritage and luxury without the visual noise typical of wedding vendors.

## 🚢 Production Delivery Checklist
*   ✅ **Technical SEO**: Dynamic Metadata, OpenGraph images, and `sitemap.xml` implemented.
*   ✅ **Accessibility**: Semantic HTML, screen-reader optimized `aria-labels`, and high contrast ratios.
*   ✅ **Resilience**: Custom `error.tsx` (Error Boundary) and `not-found.tsx` (Custom 404) designed to maintain brand immersion during crashes.
*   ✅ **Legal**: Privacy Policy and Terms of Service structurally included.

## 📄 License
All visual assets, imagery, and copywriting are the exclusive property of Himja Behl. 
Source code is proprietary and confidential unless otherwise specified.
