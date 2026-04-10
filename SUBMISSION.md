# TON Compass Submission Draft

## One-line summary

TON Compass is a guided onboarding layer for first-time TON swaps that uses the official STON.fi widget for execution, adds shareable route presets, and extends naturally into a Tonstakers-ready next step.

## Problem

For a new TON user, most DeFi interfaces feel like too much too early. The first interaction should feel clear and trustworthy, not like a raw terminal with every choice exposed at once.

## Solution

TON Compass reduces the first move into guided routes. Each route updates the live STON.fi widget, the plain-language checklist, and the suggested next action. Instead of rebuilding swap logic from scratch, the app delegates execution to the official STON.fi Omniston Widget while focusing product design on onboarding, confidence, and continuity.

## Why it fits the STON.fi track

- Real integration with the official STON.fi widget
- Clear user problem and consumer-facing use case
- Live public demo and public GitHub repository
- Easy to extend into a broader TON onboarding product without changing the core architecture

## Current functionality

- Premium product-style landing experience around the live swap flow
- Three guided routes:
  - Ecosystem entry
  - Open market mode
  - Learn before swap
- Shareable route presets via URL state such as `?mode=learn`
- Dynamic route-specific checklist and next-step panel
- Tonstakers continuation layer for users who want a yield-oriented follow-up action
- Dynamic TON Connect manifest endpoint
- Live STON.fi widget mount via the official CDN script

## What makes it credible

- The core transaction flow is real, not mocked
- The app behaves like a product, not a single embed block
- Route sharing and persistent intent state make the onboarding logic reusable
- The Tonstakers handoff proves this can grow into a full TON journey instead of a one-screen demo

## Next evolution after the hackathon

1. Add route analytics to see which onboarding intent converts best
2. Personalize route defaults for stablecoins, ecosystem tokens, or education-first flows
3. Add lightweight wallet-aware hints such as TON balance checks before opening the widget
4. Expand the post-swap layer into more TON-native actions beyond staking

## Demo script

1. Open TON Compass
   `https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`
2. Explain the problem: most first-time TON users do not need a raw DeFi interface
3. Switch between the three route presets and show that the page changes around the same live widget
4. Show that the route is shareable by copying the preset URL
5. Open the live STON.fi widget and execute the swap flow
6. Show the Tonstakers continuation panel as the next TON action after the swap
7. Close by framing TON Compass as the first layer of a broader TON onboarding product

## Quick links

- Live demo: `https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`
- GitHub: `https://github.com/ryuriymega/stonfi-hackathon`
