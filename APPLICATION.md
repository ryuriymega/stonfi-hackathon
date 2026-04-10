# TON Compass Application Notes

## Project name

TON Compass

## Short description

TON Compass is a guided first-move app for TON DeFi. It wraps the official STON.fi swap flow in a calmer onboarding shell, adds shareable route presets, introduces a subscription-ready Telegram continuation layer, and gives the user a clear next step instead of ending at the transaction itself.

## Problem

Most DeFi products assume the user already understands wallets, gas, slippage, token selection, and swap flows. For a new TON user, that creates too much friction at the very first interaction.

## Solution

TON Compass narrows the first TON DeFi action into guided routes. Each route updates the live STON.fi widget, a preflight readiness layer, and the suggested next step. The current version supports a lightweight Journey Builder that recommends the right route for the user profile, three entry modes, persistent route selection, shareable route URLs, a Tonstakers continuation layer for users who want a yield-oriented follow-up action, and a subscription-ready Compass Pro layer that previews Telegram-based alerts and saved routes.

## Why this project should be accepted

- It solves a real onboarding problem for TON users instead of recreating a generic swap page
- It is a new project being built specifically for this hackathon rather than a pre-existing product
- It already has a working live demo and public repository
- It uses the official STON.fi widget for real execution rather than a mocked on-chain flow
- It is compact enough to finish during the hackathon, but already structured like a product that can keep growing
- It already has a believable revenue path through STON.fi referral fees plus a future Telegram subscription layer for advanced alerts
- We are ready to keep building during the full hackathon window and submit a polished working TON product on time

## Current status

- Public demo is live
- GitHub repository is live
- The app includes a Journey Builder that maps user intent to the recommended route
- The live panel now includes an interactive readiness / preflight layer
- The app now supports three guided swap routes
- Route presets are shareable through URL state
- The product includes a Tonstakers continuation path for the next TON action
- The product now previews a Compass Pro layer for Telegram continuity, saved routes, and subscription-ready follow-up alerts

## Public demo

`https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`

## GitHub repository

`https://github.com/ryuriymega/stonfi-hackathon`

## Fast form version

### One-sentence pitch

TON Compass is a guided onboarding layer for first-time TON swaps that uses the official STON.fi widget for execution, adds shareable intent routes plus a Tonstakers-ready continuation path, and previews a subscription-ready Telegram follow-up layer.

### Why it stands out

- The UX is product-shaped, not SDK-shaped
- The integration is real and live today
- The project is new and hackathon-appropriate
- It already demonstrates how a STON.fi-first onboarding app can expand into a broader TON journey with a credible recurring monetization path

## Motivation and commitment

### Why join this hackathon

STON.fi and Tonstakers are offering exactly the right constraint for this build: ship a small but real TON product fast, with a real integration and a public result. TON Compass fits that brief well because it targets a concrete user problem and can realistically be pushed from MVP to polished onboarding product during the hackathon window.

### Commitment statement

We are prepared to use the full build window to improve the product, tighten the user flow, record the demo, and submit a complete package with live URL, GitHub repository, and video on time.

### New project statement

TON Compass is a new build prepared for this hackathon. It is not an established pre-existing product.

## Demo day talk track

1. Open the live page and explain the onboarding problem
2. Switch between the three route presets
3. Show that the URL updates for shareable routes
4. Open the live STON.fi widget and execute the swap path
5. Show the Tonstakers continuation panel as the next TON action
6. Show the Compass Pro layer as the retention and subscription-ready continuation after the first move
