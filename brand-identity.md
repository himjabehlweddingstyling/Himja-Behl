# Himja Behl — Brand Identity

Premium wedding styling & wardrobe curation. This document is the single source of truth for how the brand looks, sounds, and behaves across the website and beyond.

**Live site:** https://himjabehl.com · **Stack:** Next.js 16 · Tailwind CSS v4 · Framer Motion · TypeScript

---

## 1. Brand Essence

- **Positioning:** A fashion editor for the Indian wedding — somebody who reads the celebration first and dresses the people in it second.
- **Mission:** Not clothes for an occasion. A visual language for your celebration.
- **Core belief (signature line):** *"Style isn't about choosing more. It's about choosing right."*
- **Filter for everything:** Is it intentional? Is it considered? `curated`, `intentional`, `belongs`.

### Copy lexicon
Always ("noise" words) | Never
--- | ---
curated, edit, wardrobe, visual language | fancy, trendy, makeover
celebration, occasions, functions | dress-up, glitz, bling
the bride, the groom, the family | client/orders (in customer-facing copy, use "client" in SEO/JSON-LD only)
silhouette, colour, fabric, detail | cheap, affordable, luxury-lite
intentional, considered, refined | "best prices", "buy now"

### Signature phrases (repeatable)
- **Hero:** "Style the celebration."
- **Enquire section:** "Begin Your Edit."
- **Story section:** "Style isn't about choosing more. It's about choosing right."
- **CTAs:** "Start Your Edit" · "Let's Talk" · "Begin the conversation."
- **Case studies are "The Journeys"; the process is "Discover · Curate · Refine · Deliver".**

Case is always **UPPERCASE** for display and eyebrows, with wide tracking. Italic serif is reserved for emotional/voice lines — quotes and the "it's about choosing right" line.

---

## 2. Color System

### Core tokens (`globals.css`)
| Token | Hex | Role |
|---|---|---|
| **Maroon** | `#641D26` | Primary brand color, buttons, blocks |
| **Maroon (deep)** | `#4A151C` | Radial-gradient base, theme color (iOS/Android toolbar), primary backgrounds |
| **Maroon (dark)** | `#3F0E14` | Gradient shadows |
| **Night (maroon-black)** | `#1A0407` | Near-black warm base — dark text, footer/hero/dark radial end-stop, mobile menu |
| **Rose (radial highlight)** | `#58171f` | Radial-gradient core (0%) |
| **Dust Gold** | `#C8B273` | Signature gold accent — micro-labels, hairlines, active states, CTAs |
| **Warm White** | `#F6F3EE` | Primary light background + text on dark |
| **Ivory** | `#EEE9E1` | Secondary warm surfaces, image backdrops |
| **Charcoal** | `#171515` | `--foreground` default text |

### The signature background
```css
radial-gradient(circle at 50% 45%, #58171f 0%, #4A151C 40%, #1A0407 100%)
```
Used for: Hero, Testimonials, Enquiry, Footer, Loader stage. It's *the* dark-mode canvas of the brand.

### Rules
- **Dark sections:** warm-white text, dust-gold accents, hairline `border-white/10`.
- **Light sections:** charcoal/`#1A0407` text, dust-gold filigree, hairline `border-dust-gold/20`.
- Gold is always an *accent*, never a fill for large surfaces (buttons are the one exception: `bg-dust-gold` + `#1A0407` text).
- Never pure black on dark surfaces; always `#1A0407`.

---

## 3. Typography

Three families, loaded via `next/font/google`, exposed as `--font-display`, `--font-sans`, `--font-quote`.

| Role | Family | Weights | Notes |
|---|---|---|---|
| **Display** | Cormorant Garamond | 300–700 | Headlines, logo, big numbers, `<h1>–<h3>`, ghosts. Always UPPERCASE, `tracking-tight`, `leading-[0.9–1.05]` |
| **Sans (UI/body)** | Inter | variable | All body copy, buttons, labels, forms, meta. Small sizes carry wide tracking |
| **Quote (voice)** | Playfair Display | normal + italic | Pull quotes, Himja's voice, "choosing right" line, testimonial quotes. Italic = emotion |

### Scale (key reproducible sizes)
- Hero H1: `clamp(4rem, 8vw, 8rem)`
- Section H2: `text-4xl → lg:text-7xl/8xl`, `leading-[0.9–0.95]`
- Eyebrows: `text-[10px]`/`text-xs`, `tracking-[0.2em–0.4em]`, uppercase, dust-gold
- Display numerals (process/journey IDs): `text-6xl → text-8xl`, gold at 40% opacity
- Body: `font-light`, `leading-[1.8–2.2]`, `text-[#1A0407]/70` on light

### Rules
- Uppercase + wide tracking for everything label-like; Cormorant for grandeur, Inter for precision.
- Never set body copy in a serif; never set a headline in Inter.

---

## 4. Typography & Interface Details

- **Micro-labels / eyebrows:** dust-gold, `text-[10px] md:text-xs`, `tracking-[0.2em]`+ uppercase — section openers.
- **Hairlines:** 1px rules in `border-white/10` (dark) or `border-dust-gold/20` (light) under headers, over dividers, under the nav, above the footer bottom bar.
- **Ghost typography:** the brand name set at `text-[28vw]/[12vw]`, `opacity-5`, `whitespace-nowrap` (footer) — scale text luxury.
- **Buttons:** uppercase `text-xs`, `tracking-[0.2em]`, small padding `px-5 py-2.5` (nav CTA) to `px-12 py-4` (hero). Two families — solid `bg-dust-gold`/`bg-Maroon` and outline `border-dust-gold/40`.
- **Selection:** `selection:bg-dust-gold selection:text-maroon` on light; `selection:bg-dust-gold selection:text-maroon` on dark sections.

---

## 5. Motion Language

Everything moves with restraint; nothing moves without easing. Reveals are driven by Framer Motion `whileInView` (with `margin: "-100px"`, `once: true`).

### Easing
| Use | Curve |
|---|---|
| Standard luxe reveal (opacity + y) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Route transition veil cover/uncover | `[0.76, 0, 0.24, 1]` |
| Underlines / indicators (layoutId) | spring, `bounce 0.2, duration 0.5` |
| Mobile menu / overlays | `[0.22, 1, 0.36, 1]` |
| Marquee | `linear`, infinite, 240s |

### Recipes
- **Reveal:** `initial {opacity 0, y 20/40} → animate {1, 0}`, 0.6–1s. Stagger children with `delay: 0.1–0.3`.
- **Cinematic image:** `opacity + clipPath: inset(10% 0 0 0) → inset(0)`, 1.5s.
- **Nav underline:** animated `layoutId="nav-underline"` stroke that springs between active links.
- **Testimonial indicator:** `layoutId="active-indicator"` underline that glides between cards.
- **Hover:** images scale `1.05` (1.2s luxe); process images `grayscale → 0` on hover.
- **Route transition:** a maroon→night panel sweeps across on route change (cover 0.22s, hold, uncover 0.3s). Never on first load (loader owns that).
- **Marquee:** edge-fade mask, `✦` separators, duplicated content for continuity.
- **Reduced motion:** wrapped in `MotionConfig reducedMotion="user"` — the brand respects accessibility.

### Curtain loader (home page, every hard reload; skipped on soft nav; `?loader=1` forces it)
Two velvet curtains (dust-gold + warm-white), per-letter gold wordmark stagger, "CURATING THE EDIT" tagline, `backdrop-blur` frosted stage, display 1.8s + 0.7s exit.

---

## 6. Imagery

- **Himja's portrait** (`himja-hero.webp`, 100KB): hero right side at `opacity-30` behind a `linear-gradient(to left)` mask — she is *felt*, not shouted.
- **Story portrait** (`himja-story-portrait.webp`, 3:4 native): editorial frame, `object-top`, always keep native 3:4 crop — never `aspect-video` (cuts the face).
- **Process images** (`himja-process-*.webp`): grayscale, reveal in colour on hover.
- **Journey case studies:** currently AI-generated placeholders (`journey-*.jpg`) — **to be replaced** with real photos (see §11).

### Image rules
- WebP everywhere possible; keep ≤120KB per image; hero is `priority`.
- `object-top` for portraits, `object-[center_30%]` for hero crops.
- Gold hairline borders + soft shadows on editorial frames.

---

## 7. Page Architecture & Components

| Page | Purpose |
|---|---|
| `/` Home | Loader → Navbar → Hero → Story → Marquee → Testimonials → Process → Enquiry → Footer |
| `/story` | The Philosophy — full editorial copy |
| `/journeys` | Archive of case studies |
| `/journeys/[slug]` | Case study: Full-bleed hero → tags → brief → process → result → next journey |

### Component inventory
`Loader` · `Navbar` · `Hero` · `Story` · `Marquee` · `Journeys` · `Testimonials` · `Process` · `Enquiry`/`EnquiryForm`/`HimjaEdit` · `Footer` · `RouteTransition` · `JsonLd`

### System rules
- **Section IDs (scroll-spy):** `#story #testimonials #process #enquire`. Correlates with the nav exactly.
- **Nav** (route-aware): Home `/` · Story `/story` · Testimonials `/#testimonials` · Process `/#process` · Enquire `/#enquire`. Solid warm-white bar on light pages, transparent + gradient over dark heroes. CTA: **LET'S TALK** → `/#enquire`.
- **Contact/pricing mark:** `priceRange: "₹₹₹"`, near-luxury positioning. Area served: New Delhi, Mumbai, all-India.

---

## 8. The Six Style Archetypes (interactive product)

Presented at the end of the 6-step enquiry as "the Edit":

| Direction | Archetype name | Vibe |
|---|---|---|
| Traditional | THE HERITAGE ROMANTIC | Classic, opulent, timeless |
| Contemporary | THE MODERNIST | Clean, sculptural, bold |
| Fusion | THE GLOBAL NOMAD | Eclectic, fluid, expressive |
| Minimal | THE QUIET LUXURY | Understated, refined, effortless |
| Regal | THE IMPERIAL | Majestic, grand, unapologetic |
| Experimental | THE AVANT-GARDE | Fearless, artistic, unconventional |

These mock up the bride's palette (3 swatch circles), aesthetic description, and styling direction — the product-level "wow" moment that turns a lead form into an experience.

---

## 9. Voice & Tone

- **POV:** The studio speaks with one voice — considered, warm, precise. Zero hype, zero hard-sell.
- **Sentence shape:** short declaratives; one idea per line in display; long flowing lines in body. Fragments are allowed for rhythm.
- **Me vs. we:** The brand speaks as "I" (Himja) only in Story/quotes; as "we" in Process and Journeys; as the studio everywhere else.
- **Tone of the site vs. brand elsewhere:** the site is the collector's-editorial; social should be warmer, more personal, more candid — same lexicon, looser grammar.

---

## 10. SEO & Structured Data (brand consistency)

- **Schema:** `ProfessionalService` (root) + `Service` (home) + `ItemList` + `BreadcrumbList` (`/journeys/[slug]`).
- **Keywords:** wedding stylist, trousseau curation, bridal styling, groom styling, luxury Indian weddings, Delhi/Mumbai.
- **`og.jpg`:** 1200×630 real-photo social card; hero/story crops reuse the same portrait assets.
- **Theme color:** `#4A151C`. Site name: **Himja Behl**.
- **Docs to keep in sync:** `src/lib/seo.ts`, `src/components/json-ld.tsx`, `src/app/sitemap.ts`.

---

## 11. Honest Status / Known Gaps (as of this doc)

1. **Testimonials** use `[NAME]` placeholders and reuse journey/AI images — do **not** ship to a real client in this state. Needs real client words + consent or section removal.
2. **Journey case studies** are AI-generated imagery presented as past work — a real trust risk. Replace with real photography.
3. **Contact channel:** footer utility email + generic Instagram link need replacing with Himja's real email/Instagram/WhatsApp.
4. **Pricing/packages** do not exist on the site — the first question every bride asks. Add an "investment" section or a tasteful consultation line.
5. Original high-res photos live in `Himja Website Content-*.zip` / `himja-content-extracted/` (untracked) — source of future real imagery.

---

*Maintained alongside the codebase — update this file whenever the design system changes (new fonts, colors, easings, components).*