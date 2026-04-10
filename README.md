# TON Compass

TON Compass is a guided first-move app for TON DeFi. It wraps the official STON.fi swap flow in a calmer onboarding shell, adds shareable route presets, and gives the user a credible next step instead of ending at the trade itself.

## Why this concept

- It solves a real onboarding problem: first-time TON users need a trusted first action, not a raw DeFi terminal.
- It qualifies for the STON.fi track through a live STON.fi Omniston Widget integration.
- It already behaves like a product: route presets, persistent mode state, shared links, and a Tonstakers continuation path.
- It is still small enough to ship fast and keep evolving on the same server.

## Current product shape

- Three guided swap routes:
  - Ecosystem entry
  - Open market mode
  - Learn before swap
- Shareable route URLs via `?mode=...`
- Sticky live execution panel powered by the official STON.fi widget
- Tonstakers-ready post-swap continuation for yield-oriented users
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
