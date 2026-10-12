# Architecture & Codebase Map

This document outlines the architectural decisions and directory structure of the Himja Behl Next.js application, serving as a roadmap for future developers.

## Directory Structure

```text
/src
 ├── app/                  # Next.js 16 App Router (Pages, Layouts, API)
 │    ├── api/             # Serverless API routes (e.g., Nodemailer enquiry endpoint)
 │    ├── journeys/        # Dynamic routing for individual styling journeys
 │    ├── story/           # About/Philosophy static page
 │    ├── privacy/         # Legal pages
 │    ├── terms/           # Legal pages
 │    ├── error.tsx        # Global React error boundary 
 │    ├── not-found.tsx    # Custom 404 page for brand consistency
 │    └── sitemap.ts       # Dynamic XML sitemap generator
 │
 ├── components/           # Reusable React UI Components
 │    ├── hero.tsx         # Responsive homepage hero
 │    ├── story.tsx        # 50/50 split editorial layout
 │    ├── process.tsx      # Scroll-triggered methodology timeline
 │    ├── navbar.tsx       # Dynamic, scroll-aware navigation header
 │    └── footer.tsx       # Global footer with legal links
 │
 └── lib/                  # Utilities, Data, and Configs
      ├── data.ts          # Centralized data store (Journeys, Testimonials)
      ├── seo.ts           # Centralized SEO configurations and OG templates
      └── utils.ts         # Tailwind `cn()` merger and helper functions
```

## Core Architectural Decisions

### 1. Data Management (`src/lib/data.ts`)
Instead of over-engineering the application with a heavy Headless CMS (like Sanity or Contentful) for a site with relatively static portolio content, all "Journeys" and "Testimonials" are stored in a strongly-typed TypeScript file. This ensures:
*   Zero database latency (instant page loads).
*   Perfect type-safety when rendering components.
*   Easy modifications by a developer without needing CMS training.

### 2. Styling (Tailwind + Fluid Typography)
The application relies heavily on CSS `clamp()` functions within Tailwind arbitrary values (e.g. `text-[clamp(2.5rem,4vw,4.5rem)]`). This fluid typography architecture removes the need for dozens of complex `@media` breakpoint overrides, allowing the massive editorial headlines to scale down perfectly to mobile sizes.

### 3. Animations (Framer Motion)
Animations are not used for gimmicks. `Framer Motion` is utilized strictly for `whileInView` triggers (to softly fade elements in as the user scrolls) and layout transitions (e.g., the mobile menu overlay and navigation underlines). All animations use a custom spring config (`ease: [0.16, 1, 0.3, 1]`) to emulate premium, deliberate movement.

### 4. SEO & Routing
The site uses the native Next.js Metadata API. The dynamic route `journeys/[slug]/page.tsx` utilizes `generateMetadata()` to dynamically create SEO tags for individual portfolio items, ensuring Google indexes them properly with specific OpenGraph images.
