# TON Compass Monetization Plan

## Core decision

Do not charge for the first swap.

Keep `execution` free and frictionless:
- guided route selection
- live STON.fi swap
- Tonstakers continuation

Monetize the `decision layer`, `continuity`, and `alerts`.

This keeps the first experience strong for the hackathon demo and creates a believable path to recurring revenue later.

## Official basis

- STON.fi supports referral revenue through Omniston referral parameters such as `referrer_address`, `referrer_fee_bps`, and `flexible_referrer_fee`.
- Telegram supports digital goods payments and Star subscriptions for recurring billing through bots.
- Tonstakers already gives a strong second action after swap, which makes alerts and follow-up recommendations more valuable than a one-off transaction UI.

References:
- https://ston.fi/hackathon
- https://docs.ston.fi/developer-section/omniston/omniston-referral-fees
- https://docs.ston.fi/developer-section/dex/api
- https://core.telegram.org/bots/payments
- https://core.telegram.org/type/StarsSubscription
- https://github.com/tonstakers/tonstakers-sdk

## Monetization model

### Free

- guided route presets
- planner recommendation
- live STON.fi execution
- Tonstakers handoff
- basic readiness checklist

### Pro

- Telegram alerts for route-relevant events
- saved routes and watch targets
- target receive planning (`I want X STON, tell me when / how`)
- staking continuation insights
- weekly wallet digest
- next-best-action guidance after swap or stake

### Revenue mix

1. Referral fees from swap volume
2. Monthly Telegram subscription for power users

This is the right shape for the product:
- referral revenue monetizes intent immediately
- subscription monetizes retention and habit

## Product packaging

### Product name

`TON Compass Pro`

### Positioning

Free gets the user through the first action.

Pro stays with the user after the first action.

### Pro promise

"Do not just swap. Keep getting the right next move in Telegram."

## Conversion funnel

### In-product flow

1. User lands on the guided route page.
2. User gets one clear route and executes the swap.
3. User sees the next move and a compact `Pro` preview.
4. User clicks `Get alerts in Telegram`.
5. User enters the Telegram bot or channel flow.
6. User upgrades later once the free teaser proves value.

### Why this should convert

- The first swap creates intent.
- The next move creates uncertainty.
- Alerts and continuation solve that uncertainty.

Do not try to sell "premium analytics". Sell "timely next actions".

## What to build in the next one-pass implementation

### Scope for the next pass

Build the subscription-ready product layer without requiring a new backend yet.

Ship now:
- Pro preview card
- Telegram alerts CTA
- Free vs Pro feature framing
- route-specific Pro teaser copy
- revenue narrative in submission docs

Do later:
- real Telegram bot authentication
- real Star subscription billing
- real alert engine
- real referral fee dashboard

## Exact UI changes

### 1. Sidebar: add a compact `Compass Pro` card

Insert a new card below the planner in the sidebar.

Purpose:
- explain that the current app is free to start
- show what becomes recurring value later
- create one clear CTA

Card structure:
- eyebrow: `Compass Pro`
- headline: `Stay in the loop after the swap.`
- short copy: `Get Telegram alerts, saved routes, and next-move guidance instead of ending at the transaction screen.`
- three bullets:
  - `Telegram alerts`
  - `Saved route watchlists`
  - `Weekly wallet digest`
- CTA:
  - primary: `Get alerts in Telegram`
  - secondary microcopy: `Free at launch. Subscription later for advanced alerts.`

### 2. Main stage: upgrade the lower narrative section

Replace the current generic `Post-swap layer` framing with a more productized continuation story.

Current section:
- `Not just a swap page. A first TON journey.`

Next pass:
- keep the section compact
- make it about the retention loop, not just product philosophy

Suggested structure:
- card 1: `First move`
- card 2: `Monitor what changed`
- card 3: `Get the next action in Telegram`

### 3. Next move card: add Pro handoff copy

Keep the existing Tonstakers next step, but add one short line below it:

`After the first move, Compass Pro can keep watching for the next one.`

This keeps the monetization layer connected to the actual action flow.

## Exact code changes

### `public/index.html`

Add:
- new `subscription-section` card in the sidebar below `#planner`
- optional short follow-up line inside `.next-move-card`
- revised copy in `.journey-section`

Do not:
- add anything heavy above the fold
- push the widget lower on mobile
- create a new noisy pricing wall

### `public/app.js`

Extend `modeConfig` with route-specific Pro teaser copy:
- `proTitle`
- `proCopy`
- `proBullets`
- `proCta`
- `proFootnote`

Add new DOM bindings:
- `#pro-title`
- `#pro-copy`
- `#pro-list`
- `#pro-cta`
- `#pro-footnote`

Add a renderer:
- `renderProOffer(mode)`

Hook it into:
- `updateCopy(mode)`
- optional planner recommendation output if needed

Behavior:
- when route changes, the Pro offer changes too
- `learn` route should emphasize safety alerts
- `ecosystem` route should emphasize next-step guidance
- `open` route should emphasize watchlists and market change alerts

### `public/styles.css`

Add styles for:
- compact `subscription-section`
- locked/pro pill or subtle premium label
- bullet list with stronger hierarchy than plain paragraph copy
- responsive behavior that keeps the sidebar compact

Guardrails:
- no extra hero styling
- no giant gradient pricing card
- no second CTA competing with the swap widget

## Copy system for the next pass

### Ecosystem route

- title: `Compass Pro for ecosystem builders`
- copy: `After the first TON -> STON move, keep getting the next useful action in Telegram instead of reopening the app cold.`
- bullets:
  - `Route change alerts`
  - `Saved post-swap watchlist`
  - `Next move suggestions`

### Learn route

- title: `Compass Pro for cautious first-timers`
- copy: `Stay calm after the first swap with small, useful alerts about timing, readiness, and the next safe action.`
- bullets:
  - `Slippage and route watch alerts`
  - `Safer repeat-swap reminders`
  - `Staking follow-up guidance`

### Open route

- title: `Compass Pro for active explorers`
- copy: `Watch pairs, save routes, and return only when something worth acting on actually changed.`
- bullets:
  - `Saved route watchlists`
  - `Market movement alerts`
  - `Weekly portfolio digest`

## Submission positioning

In the application and demo, describe monetization like this:

`TON Compass uses a hybrid revenue model: swap referral fees through STON.fi and a future Telegram subscription for advanced alerts and continuation guidance.`

This is stronger than saying "we may monetize later".

## Acceptance criteria for the implementation pass

- The first viewport remains `swap-first`.
- No new above-the-fold clutter on mobile.
- The Pro card feels like product depth, not a fake paywall.
- The CTA is singular and obvious.
- Route-specific Pro copy updates correctly.
- Desktop, mobile, webview, and narrow screens remain visually tight.

## Explicit non-goals for the next pass

Do not build these yet:
- real Telegram bot backend
- real payment processing
- real Stars billing
- real account system
- complex pricing selector
- dashboard bloat

## Recommended implementation order

1. Add the subscription card markup in `public/index.html`.
2. Add the Pro data model and renderer in `public/app.js`.
3. Style the new card and lower-section adjustments in `public/styles.css`.
4. Verify viewport density again on desktop, mobile, and frame-like containers.
5. Update submission docs with the monetization line.

## Final rule

The page must still feel like a premium guided execution surface.

The monetization layer should feel like:
- continuity
- confidence
- retention

It must not feel like:
- a pricing page
- a crypto shill wall
- a generic premium dashboard
