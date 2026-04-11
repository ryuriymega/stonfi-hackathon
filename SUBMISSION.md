# TON Compass Submission Draft

## One-line summary

TON Compass is a guided onboarding layer for first-time TON swaps that uses the official STON.fi widget for execution, adds live STON.fi route simulation and wallet-aware hints, and extends naturally into a Tonstakers-ready next step.

## Problem

For a new TON user, most DeFi interfaces feel like too much too early. The first interaction should feel clear and trustworthy, not like a raw terminal with every choice exposed at once.

## Solution

TON Compass reduces the first move into guided routes. Each route updates the live STON.fi widget, the plain-language checklist, and the suggested next action. Instead of rebuilding swap logic from scratch, the app delegates execution to the official STON.fi Omniston Widget, then uses official STON.fi public quote and wallet endpoints to add a Decision Lab around simulation, wallet-aware next-step logic, and Tonstakers continuation planning.

## Why it fits the STON.fi track

- Real integration with the official STON.fi widget
- Clear user problem and consumer-facing use case
- Live public demo and public GitHub repository
- Easy to extend into a broader TON onboarding product without changing the core architecture

## Current functionality

- Premium product-style landing experience around the live swap flow
- Journey Builder that maps user intent into the recommended first route
- Three guided routes:
  - Ecosystem entry
  - Open market mode
  - Learn before swap
- Shareable route presets via URL state such as `?mode=learn`
- Interactive readiness / preflight layer before opening the wallet
- Dynamic route-specific next-step panel
- Tonstakers continuation layer for users who want a yield-oriented follow-up action
- Dynamic TON Connect manifest endpoint
- Live STON.fi widget mount via the official CDN script

## What makes it credible

- The core transaction flow is real, not mocked
- The app behaves like a product, not a single embed block
- The Journey Builder gives the user an onboarding decision path instead of a static mode switcher
- Route sharing and persistent intent state make the onboarding logic reusable
- The Tonstakers handoff proves this can grow into a full TON journey instead of a one-screen demo

## Next evolution after the hackathon

1. Add route analytics to see which onboarding intent converts best
2. Personalize route defaults for stablecoins, ecosystem tokens, or education-first flows
3. Expand the wallet-aware layer into richer route recommendations and saved wallet states
4. Expand the post-swap layer into more TON-native actions beyond staking

## Demo script

1. Open TON Compass
   `https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`
2. Explain the problem: most first-time TON users do not need a raw DeFi interface
3. Use the Journey Builder to generate a recommended route for a first-time user
4. Switch between the three route presets and show that the page changes around the same live widget
5. Show the interactive readiness layer before opening the wallet
6. Show that the route is shareable by copying the preset URL
7. Open the live STON.fi widget and execute the swap flow
8. Show the Tonstakers continuation panel as the next TON action after the swap
9. Close by framing TON Compass as the first layer of a broader TON onboarding product

## Quick links

- Live demo: `https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`
- GitHub: `https://github.com/ryuriymega/stonfi-hackathon`
