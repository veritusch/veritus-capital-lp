---
name: ui-component
description: Guide for creating new components and landing page sections for Veritus. Use when the user asks to add a new section, card, or visual component following the project's design patterns.
allowed tools: Read, Edit, Write, Glob
---

# Creating components and sections — Veritus Capital LP

Stack: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS v4.

---

## Landing page section structure

Sections live in `src/components/`. The standard pattern is:

```tsx
"use client"; // only if state or events are needed

export default function SectionName() {
  return (
    <section className="relative mt-32 w-full">
      {/* TITLE */}
      <div className="mx-auto mb-16 w-full px-4 md:w-[1167px] md:px-0">
        <h2 className="typography-title text-brand-text-light text-3xl md:text-4xl">
          Section Title
        </h2>
      </div>

      {/* CONTENT */}
      <div className="mx-auto w-full px-4 md:w-[1167px]">
        {/* ... */}
      </div>
    </section>
  );
}
```

> Max content width: `md:w-[1167px]`
> Mobile horizontal padding: `px-4`
> Spacing between sections: `mt-32`

---

## Brand colors (Tailwind)

All defined in `src/app/globals.css` as `@theme` tokens:

| Tailwind class | Value | Usage |
|---|---|---|
| `bg-brand-beige` | `#efebe2` | Light background (Hero) |
| `bg-brand-beige-alt` | `#e0d9c9` | Alternative light background |
| `bg-brand-beige-subtle` | `#f8f7f3` | Subtle light background |
| `text-brand-brown` | `#9f8762` | Primary brand color |
| `bg-brand-brown` | `#9f8762` | Decorative blocks (cards) |
| `text-brand-golden` | `#bda277` | Golden highlight |
| `text-brand-text-primary` | `#1e1e1e` | Main text (light background) |
| `text-brand-text-light` | `#f8f7f3` | Text on dark background |
| `bg-brand-dark` | `#1e1e1e` | Dark background |
| `bg-brand-dark-bg-primary` | `#1c1c1d` | Primary dark background |

---

## Typography classes

Defined in `@layer components` inside `globals.css`:

| Class | Font | Usage |
|---|---|---|
| `typography-title` | Libre Baskerville Bold | Headings (`h1`, `h2`, `h3`) |
| `typography-text-italic` | Libre Baskerville Italic | Subheadings, highlights |
| `typography-helvetica` | Helvetica Regular | Alternative body text |
| `typography-helvetica-bold` | Helvetica Bold | Labels, CTAs |
| `typography-helvetica-italic` | Helvetica Italic | Quotes |

> For regular body text, use plain `font-sans` (Inter via Tailwind).

---

## Responsive pattern

Mobile-first. Always add `md:` variants for desktop:

```tsx
// Responsive grid example
<div className="flex flex-col gap-6 md:flex-row md:gap-10">
  ...
</div>

// Responsive text example
<h2 className="typography-title text-2xl md:text-4xl">
  Title
</h2>
```

---

## Card pattern

Based on `StrategyCard` in `src/components/Strategies.tsx`:

```tsx
<div className="
  flex
  h-auto
  w-full
  rounded-[26px]
  bg-white
  shadow-sm
  md:h-[343px]
  md:w-[879px]
">
  {/* Left content */}
  <div className="flex max-w-[420px] flex-col justify-center p-8 md:p-10">
    <h3 className="typography-title text-2xl text-brand-text-primary">
      Card Title
    </h3>
    <p className="mt-4 text-sm text-neutral-600">Description</p>
  </div>

  {/* Right decorative block (desktop only) */}
  <div className="ml-auto hidden h-full w-[320px] rounded-r-[26px] bg-brand-brown md:block" />
</div>
```

---

## Registering on the landing page

After creating the component, import it in `src/app/page.tsx`:

```tsx
import SectionName from "../components/SectionName";

// Inside <main>, add with an id for navigation:
<div id="section-name">
  <SectionName />
</div>
```

---

## Checklist

- [ ] File at `src/components/ComponentName.tsx`
- [ ] `"use client"` only if using state or events
- [ ] Max width `md:w-[1167px]` respected
- [ ] Colors and typography using brand tokens
- [ ] Responsive (mobile-first with `md:`)
- [ ] Exported as `default`
- [ ] Registered in `page.tsx` if it's a landing page section
