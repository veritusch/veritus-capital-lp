# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint validation
```

No test suite is configured.

## Directory Map

```
src/
├── app/
│   ├── page.tsx                  → Landing page (home)
│   ├── layout.tsx                → Root layout + fonts
│   ├── globals.css               → Tailwind v4 @theme (cores, fontes, animações)
│   ├── form/[token]/             → Formulário de onboarding (token-gated)
│   ├── generate/                 → Gerador de tokens (password-gated)
│   └── api/
│       ├── lead/                 → Submissão do formulário → Make.com
│       ├── cep/                  → Lookup de CEP
│       └── quotes/               → Cotações B3 (AlphaVantage)
├── components/
│   ├── forms/
│   │   ├── MultiStepForm.tsx     → Wizard de onboarding (~57KB)
│   │   ├── inputs/               → Inputs especializados BR
│   │   ├── Modal.tsx
│   │   ├── PasswordGateModal.tsx
│   │   └── LinkExpired..tsx
│   ├── ui/
│   │   └── WhatsAppButton.tsx
│   ├── Hero.tsx                  → Seção hero (inclui TickerBar)
│   ├── Strategies.tsx
│   ├── Calculators.tsx
│   ├── WhoWeAre.tsx
│   ├── Newsletter.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── TickerBar.tsx             → Ticker de ações animado
├── hooks/
│   ├── useTokenAccess.ts
│   └── usePasswordGate.ts
├── lib/
│   └── token.ts
├── services/
│   ├── cep.service.ts
│   ├── quotes.ts                 → AlphaVantage (cache 1h)
│   └── cotacoes.ts
├── types/
│   └── access.ts
└── utils/
    └── uuid.ts
```

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
- [src/app/api/quotes/route.ts](src/app/api/quotes/route.ts) — Stock quotes endpoint; fetches B3 tickers (ITUB4, B3SA3, VALE3, PETR4, WEGE3) via AlphaVantage API
- [src/services/quotes.ts](src/services/quotes.ts) — AlphaVantage integration; sequential requests with 12s delay (free tier: 5 req/min), 1h cache
- [src/lib/token.ts](src/lib/token.ts) — Token generation, validation, and localStorage persistence
- [src/hooks/useTokenAccess.ts](src/hooks/useTokenAccess.ts) — Hook for token-gated form access
- [src/hooks/usePasswordGate.ts](src/hooks/usePasswordGate.ts) — Hook for password-gated pages
- [src/components/forms/PasswordGateModal.tsx](src/components/forms/PasswordGateModal.tsx) — Modal for password entry on `/generate`
- [src/components/forms/LinkExpired..tsx](src/components/forms/LinkExpired..tsx) — Component shown when form token is invalid/expired
- [src/components/ui/WhatsAppButton.tsx](src/components/ui/WhatsAppButton.tsx) — Floating WhatsApp contact button
- [src/app/globals.css](src/app/globals.css) — Tailwind v4 `@theme` config; brand colors (brown `#9f8762`, beige variants), fonts (Libre Baskerville for titles, Inter for body)

## Form Input Components

Specialized inputs in [src/components/forms/inputs/](src/components/forms/inputs/) handle Brazilian document formats:
- **CPFInput** — auto-formats and validates check digits (XXX.XXX.XXX-XX)
- **CNPJInput** — CNPJ business registration formatting
- **CEPInput** — postal code with address auto-fill via `/api/cep`
- **RGInput** — Brazilian RG identity document formatting
- **PhoneInput** — international dialing support with formatting
- **CurrencyInput** — Brazilian Real (BRL) currency formatting
- **DateInput** — date input with BR format handling
- **NumberInput** — numeric input with formatting
- **TextInput** — generic text input with validation
- All inputs provide visual validation feedback

## Brazilian Context

The form collects Brazilian-specific data: CPF/CNPJ document numbers, CEP postal codes, UF state codes. All UI text is in PT-BR. Form data flows through Make.com for CRM automation.
