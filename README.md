# 🌸 For My Flower — Breathing Heart

> *A handcrafted romantic web experience built for one person.*

---

## Overview

**For My Flower** is a single-file immersive romantic website, styled as a cinematic dark literary experience. It tells a story in chapters, each accompanied by moody imagery, poetic captions, and dialogue bubbles between two characters — *Her* and *Him*. The site ends with a locked final chapter that reveals a secret message when the correct password is entered.

Built for a specific recipient (Elyana), the site detects the browser language and automatically switches between **English** and **Persian (Farsi)** for all visible text.

---

## Features

### 🎬 Animated Preloader
- A full-screen dark preloader with a pulsing flower icon.
- Loader text updates in stages:
  - *"Gathering petals…"* → *"Almost there, Flower."*
- Fades out with a GSAP animation after ~4.5 seconds.
- Text switches to Farsi automatically if the browser language is Persian.

---

### 🌸 Falling Petals Canvas
- A persistent full-screen canvas overlays the entire page.
- 50 organic petal shapes drift downward with subtle sway, rotation, and varying opacity.
- Petal colors shift dynamically based on the **active weather theme**.

---

### 🌦️ Dynamic Weather System
- Detects the user's location via the browser **Geolocation API**.
- Fetches live weather from **Open-Meteo** (no API key required).
- Applies one of four visual themes based on the weather code and local time:

| Theme | Trigger Condition |
|---|---|
| `default` | Clear daytime weather |
| `night` | Hour ≥ 21 or < 6 (or nighttime weather) |
| `rain` | Drizzle / rain / showers (WMO codes 51–86) |
| `winter` | Snow (WMO codes 71–77) |

- Each theme changes: body background, hero gradient, petal colors, fog overlay, star canvas, and rain canvas.
- Weather state is **cached in `localStorage`** for 20 minutes to avoid repeat network calls.
- A small badge in the bottom-left corner displays the active weather mode (e.g. `✦ night mode`, `❄ snow`).

---

### 🎵 Audio Player
- A fixed circular button in the top-right corner toggles background music.
- Source: an ambient MP3 hosted externally.
- Glows gold when playing.

---

### 💛 Mood Switcher
- Three visual themes that restyle the entire color palette:
  - **Midnight** (default) — deep purple and gold
  - **Rose** — dark crimson and dusty pink
  - **Ivory** — inverted light parchment theme
- Mood dots are fixed UI elements (bottom area) that apply CSS class overrides on `<body>`.

---

### 📖 Chapter-Based Story Layout

The main content is divided into literary chapters, each with:
- A **chapter divider** with an ornamental gold line and title.
- A **full-width or side-by-side image panel** with sepia/contrast filters and corner gold brackets.
- **Chat bubble overlays** positioned on images — one for *Her*, one for *Him* — with bilingual text.
- **Italic poetic captions** beneath each image.
- **Blockquote sections** styled with a decorative large quotation mark.

**Chapters:**
1. **Chapter I — First Bloom** — A full-width image with a morning-light caption.
2. **Chapter II — Falling Pages** — Side-by-side layout with a dialogue bubble from *Him*.
3. **Chapter III — The Drama of Us** — Full image with two dialogue bubbles.
4. **Chapter — Withered Flower** — Split layout: a sepia image + a bordered poetic text block.
5. **The Final Chapter — Locked** — Password-protected section.

---

### 🔒 Password-Protected Final Chapter

A styled **lock box** with a numeric input field. When the correct number is entered:

1. The lock box fades out.
2. An **animated envelope** appears — complete with a 3D folding flap, a wax seal (`✦`), and a rising letter card inside.
3. After the envelope animation completes, the final chapter (Chapter IV) reveals itself:
   - A large full-width image.
   - A **typewriter-animated final message** written in the *Pinyon Script* cursive font.

The wrong password shows: *"That is not the right memory."*

---

### 🎨 Art Sanctuary — Live Drawing Gallery

A full section beneath the story where visitors can leave their own mark:

**Drawing Studio:**
- HTML5 `<canvas>` drawing area with mouse and touch support.
- **Tools:** Pen, Eraser, Clear canvas.
- **Color palette:** Gold, Rose Pink, White, Pale Gold, Mauve.
- **Brush size slider:** 1–10px range.
- An overlay hint (*"Begin drawing here…"*) fades when drawing starts.

**Saving:**
- The user enters their name (or stays anonymous).
- Artwork is compressed to JPEG (quality 0.6) and saved to a **Supabase** database via REST API.
- Each save is identified by a row ID stored in `localStorage` so the owner can later delete their own entry.

**Gallery:**
- Loads the latest entries from Supabase on scroll (lazy via GSAP `ScrollTrigger`).
- Displays each drawing with the artist's name.
- Owners see a **trash icon** to delete their own entry (with GSAP fade-out animation).
- GSAP staggered entrance animation when gallery loads.

---

### ✨ Scroll & Entrance Animations (GSAP)

All major elements animate in on scroll using **GSAP ScrollTrigger**:
- Hero text, lines, and tags fade/slide in on load.
- Chapter dividers, image panels, captions, and quote blocks animate as they enter the viewport.
- Art Sanctuary header and studio fade in on scroll.
- Scroll hint at the bottom of the hero pulses and fades.

---

### 🖱️ Custom Cursor Effects
- The cursor is set to `crosshair` globally.
- Clicking anywhere on the page creates a **petal burst** — 8 small petals scatter outward from the click point in random directions, then fade out.
- Small gold spark dots follow the cursor position.

---

### 🌐 Bilingual Support (EN / FA)

Every visible text element has `data-en` and `data-fa` attributes. On page load, the site detects `navigator.language`:
- If the browser is set to **Farsi (`fa`)**, all text switches to Persian automatically.
- This applies to: hero tag, title, subtitle, all chapter labels, all dialogue bubbles, all captions, blockquotes, the lock box, the envelope letter, the footer, and the scroll hint.

---

## Tech Stack

| Technology | Usage |
|---|---|
| **HTML5 / CSS3** | Single-file structure, all styles inline |
| **GSAP 3.12.5** | Scroll animations, entrance effects, preloader transitions |
| **GSAP ScrollTrigger** | Deferred scroll-based animations |
| **HTML5 Canvas API** | Falling petals, weather overlays (stars, rain), drawing studio |
| **Open-Meteo API** | Free live weather data (no API key) |
| **Supabase REST API** | Drawing gallery — save, load, and delete artwork |
| **Google Fonts** | Cormorant Garamond, IM Fell English, Pinyon Script |
| **postimg.cc** | External image hosting |
| **catbox.moe** | External audio hosting |

---

## Structure (Single File)

```
index.html
├── <head>
│   ├── Language detection script (runs before GSAP)
│   ├── GSAP + ScrollTrigger CDN
│   └── All CSS styles (inline)
│
├── #preloader          — Animated loading screen
├── #petal-canvas       — Full-screen falling petals
├── #weather-canvas     — Weather overlay (stars/rain)
├── #wx-fog             — Night fog overlay
├── #wx-rain-canvas     — Rain animation canvas
├── #wx-badge           — Weather mode indicator
├── #audio-btn          — Background music toggle
│
├── #hero               — Title section with breathing background
├── <main>
│   ├── Chapter I       — First Bloom
│   ├── Chapter II      — Falling Pages
│   ├── Chapter III     — The Drama of Us
│   ├── Chapter IV      — Withered Flower
│   └── #secret-section — Locked final chapter + envelope + reveal
│
├── #art-sanctuary      — Drawing studio + shared gallery
├── <footer>            — Tagline
│
└── <script> blocks
    ├── Falling petals system
    ├── Dynamic weather system
    ├── Mood switcher
    ├── GSAP hero animations
    ├── GSAP scroll animations
    ├── Bilingual text switcher
    ├── Password + envelope animation
    ├── Cursor spark + petal burst
    └── Art Sanctuary (canvas drawing + Supabase gallery)
```

---

## Configuration

To reuse or adapt this project, these values need to be updated:

| Item | Location in code |
|---|---|
| **Password** | Inside the `unlock-btn` click handler — compare against hardcoded number |
| **Final message text** | Typewriter content in the `#secret-reveal` section |
| **Images** | `src` attributes on `<img>` tags (hosted on postimg.cc) |
| **Audio** | `<source src="...">` inside `#bg-audio` |
| **Supabase URL + Key** | Constants `SUPABASE_URL` and `SUPABASE_KEY` in the Art Sanctuary script block |
| **Supabase table name** | Constant `TABLE` in the Art Sanctuary script block |

---

## Notes

- The site is **fully mobile-responsive** — font sizes use `clamp()`, layouts collapse to single-column below 640px, and the drawing canvas supports touch events.
- The noise texture overlay on `body::after` adds film-grain depth using an inline SVG filter.
- All GSAP scroll animations are deferred to `window.load` to prevent conflicts with the preloader sequence.
- The gallery uses **native lazy loading** (`loading="lazy"`) on all images.
- Artwork is saved as **JPEG at 60% quality** to keep Supabase storage small.

---

*Made with petals and patience.*

