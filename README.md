# TON Compass

TON Compass is a guided first-move app for TON DeFi. It wraps the official STON.fi swap flow in a calmer onboarding shell, adds live quote and wallet-aware decision layers, and gives the user a credible next step instead of ending at the trade itself.

## Why this concept

- It solves a real onboarding problem: first-time TON users need a trusted first action, not a raw DeFi terminal.
- It qualifies for the STON.fi track through a live STON.fi Omniston Widget integration.
- It already behaves like a product: route presets, persistent mode state, shared links, live official quote checks, wallet-aware suggestions, and a Tonstakers continuation path.
- It is still small enough to ship fast and keep evolving on the same server.

## Current product shape

- Journey Builder that recommends the best first route based on user intent
- Three guided swap routes:
  - Ecosystem entry
  - Open market mode
  - Learn before swap
- Interactive swap readiness / preflight layer before opening the wallet
- Live Decision Lab with official STON.fi simulation quotes
- Wallet-aware recommendation layer powered by STON.fi wallet asset endpoints
- Shareable route URLs via `?mode=...`
- Sticky live execution panel powered by the official STON.fi widget
- Tonstakers continuation planner with live TON ↔ tsTON market signals and official constraint hints
- Dynamic `tonconnect-manifest.json` endpoint

## Stack

- Lightweight static frontend in `public/`
- Dependency-free Node server for local development
- Native Node-RED HTTP flow for public serving
- Official STON.fi Omniston Widget via CDN

## Run locally

```bash
npm start
```

Then open `http://localhost:3000`.

## Public demo

`https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`

## GitHub

`https://github.com/ryuriymega/stonfi-hackathon`

## Submission assets

- `APPLICATION.md` – concise application answers for the form
- `SUBMISSION.md` – full submission pitch and demo flow
- `ROADMAP.md` – immediate post-hackathon expansion path
