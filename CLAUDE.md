# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint validation
```

No test suite is configured.

## Architecture

Brazilian investment firm landing page with token-gated investor onboarding form.

**Stack**: Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4

**Key flows**:
1. **Landing page** (`/`) — marketing page with sections: Hero, Strategies, Calculators, WhoWeAre, Newsletter
2. **Token-gated form** (`/form/[token]`) — multi-step investor onboarding; token validated via localStorage, marked used after submission
3. **Password-gated generator** (`/generate`) — internal page for creating form access tokens; password is hardcoded as `"veritus2026"` in the frontend

**Form submission path**: `MultiStepForm` → `POST /api/lead` → Make.com webhook (dev vs prod URLs from env vars)

## Environment Variables

```
MAKE_WEBHOOK_URL=       # Production webhook (Make.com)
MAKE_WEBHOOK_URL_DEV=   # Development webhook (Make.com)
```

The API route selects between these based on `NODE_ENV`.

## Key Files

- [src/components/forms/MultiStepForm.tsx](src/components/forms/MultiStepForm.tsx) — Core form logic (~57KB); handles multi-step wizard, conditional fields (heirs, third-party deposits), and submission
- [src/app/api/lead/route.ts](src/app/api/lead/route.ts) — Form submission endpoint; forwards to Make.com with retry logic and 50KB payload limit
- [src/app/api/cep/route.ts](src/app/api/cep/route.ts) — CEP lookup; tries BrasilAPI first, falls back to ViaCEP
- [src/lib/token.ts](src/lib/token.ts) — Token generation, validation, and localStorage persistence
- [src/hooks/useTokenAccess.ts](src/hooks/useTokenAccess.ts) — Hook for token-gated form access
- [src/app/globals.css](src/app/globals.css) — Tailwind v4 `@theme` config; brand colors (brown `#9f8762`, beige variants), fonts (Libre Baskerville for titles, Inter for body)

## Form Input Components

Specialized inputs in [src/components/forms/inputs/](src/components/forms/inputs/) handle Brazilian document formats:
- **CPFInput** — auto-formats and validates check digits (XXX.XXX.XXX-XX)
- **CNPJInput** — CNPJ business registration formatting
- **CEPInput** — postal code with address auto-fill via `/api/cep`
- All inputs provide visual validation feedback

## Brazilian Context

The form collects Brazilian-specific data: CPF/CNPJ document numbers, CEP postal codes, UF state codes. All UI text is in PT-BR. Form data flows through Make.com for CRM automation.
