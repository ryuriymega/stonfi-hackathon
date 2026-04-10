# TON Compass Application Notes

## Project name

TON Compass

## Short description

TON Compass is a guided first-move app for TON DeFi. It wraps the official STON.fi swap flow in a calmer onboarding shell, adds shareable route presets, and gives the user a clear next step instead of ending at the transaction itself.

## Problem

Most DeFi products assume the user already understands wallets, gas, slippage, token selection, and swap flows. For a new TON user, that creates too much friction at the very first interaction.

## Solution

TON Compass narrows the first TON DeFi action into guided routes. Each route updates the live STON.fi widget, a plain-language checklist, and the suggested next step. The current version supports three entry modes, persistent route selection, shareable route URLs, and a Tonstakers continuation layer for users who want a yield-oriented follow-up action.

## Why this project should be accepted

- It solves a real onboarding problem for TON users instead of recreating a generic swap page
- It already has a working live demo and public repository
- It uses the official STON.fi widget for real execution rather than a mocked on-chain flow
- It is compact enough to finish during the hackathon, but already structured like a product that can keep growing

## Current status

- Public demo is live
- GitHub repository is live
- The app now supports three guided swap routes
- Route presets are shareable through URL state
- The product includes a Tonstakers continuation path for the next TON action

## Public demo

`https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`

## GitHub repository

`https://github.com/ryuriymega/stonfi-hackathon`

## Fast form version

### One-sentence pitch

TON Compass is a guided onboarding layer for first-time TON swaps that uses the official STON.fi widget for execution and adds shareable intent routes plus a Tonstakers-ready continuation path.

### Why it stands out

- The UX is product-shaped, not SDK-shaped
- The integration is real and live today
- It already demonstrates how a STON.fi-first onboarding app can expand into a broader TON journey

## Demo day talk track

1. Open the live page and explain the onboarding problem
2. Switch between the three route presets
3. Show that the URL updates for shareable routes
4. Open the live STON.fi widget and execute the swap path
5. Show the Tonstakers continuation panel as the next TON action
