# TON Compass Premium Frontend Plan

## Goal

Ship a web experience that feels premium, intentional, and memorable across desktop, tablet, mobile, iframe, and Android WebView-like contexts without sacrificing clarity, speed, or accessibility.

## Core shift in approach

The current risk is incrementalism: tightening the existing layout until it becomes merely acceptable. That is not enough for a premium result.

The new approach must be:

1. Creative before deterministic
   - Start from a visual thesis and a product thesis, not from the current DOM.
   - Be willing to delete sections, merge regions, or completely recompose the page.
2. Product-first, not section-first
   - Every visible area must either drive a decision, execute a swap, or reinforce confidence.
   - Decorative explanation cannot outrank the task surface.
3. Whole-page, not first-screen-only
   - The first viewport must be strong.
   - The middle and lower halves must also feel deliberate, not like leftover panels.
4. Multi-device by design, not by breakpoint patching
   - The layout must be designed for wide desktop, narrow mobile, coarse pointer, iframe, and WebView constraints from the start.

## Authoritative guidance to follow

- Apple HIG Layout / Hierarchy
  - https://developer.apple.com/design/human-interface-guidelines/layout
- Material responsive layout and metrics
  - https://m1.material.io/layout/responsive-ui.html
  - https://m1.material.io/layout/metrics-keylines.html
- WCAG 2.2 updates
  - https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
  - https://www.w3.org/WAI/WCAG21/Understanding/meaningful-sequence
  - https://w3c.github.io/wcag/guidelines/22/
- web.dev interaction and motion guidance
  - https://web.dev/articles/accessible-tap-targets
  - https://web.dev/learn/accessibility/motion
- Container queries and input capability adaptation
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
  - https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/any-pointer
  - https://developer.mozilla.org/en-US/docs/Web/CSS/%40media/pointer

## Non-negotiable product rules

1. The live execution layer stays visually dominant.
2. Route choice, quote confidence, and next action must all be obvious without exploratory scrolling.
3. The product cannot feel like a dashboard mosaic.
4. The page must keep one strong visual idea across the full scroll.
5. Every supporting section must answer one question only:
   - What route should I take?
   - Is this route sane right now?
   - What should I do next after this?
6. Any section that does not improve decision quality, confidence, or conversion gets removed.

## Creative direction workflow

Before any more implementation work, define these three artifacts:

1. Visual thesis
   - One sentence that defines the mood, material language, and energy.
   - Example format: "A dark trading atelier with precise neon signals and minimal chrome."
2. Content plan
   - First viewport
   - Decision layer
   - Continuation layer
   - Final trust / conversion close
3. Interaction thesis
   - 2-3 motions only
   - One entrance motion
   - One state transition or layout transition
   - One calm micro-feedback motion

## Likely visual directions worth exploring

These should be explored as distinct directions, not mixed together.

1. Command Surface
   - Crisp dark workspace
   - Minimal chrome
   - High confidence, operator-grade clarity
   - Best if TON Compass should feel like a serious DeFi decision tool
2. Editorial Finance
   - Strong typography
   - More whitespace
   - Fewer hard borders
   - Best if the product should feel more premium and opinionated than technical
3. Telegram-native Orbit
   - Compact, high-density, embedded-first composition
   - Designed to survive iframe/WebView contexts cleanly
   - Best if distribution through Telegram or embedded flows becomes central

## Engineering plan

### Phase 1. Reframe the structure

- Define the primary workspace and the secondary region explicitly.
- Reduce the number of independent visual blocks.
- Make the page read as one orchestrated system, not stacked subsystems.
- Use more layout and less card treatment where possible.

### Phase 2. Rebuild the page around container behavior

- Add container-query strategy for key modules, not only viewport breakpoints.
- Build regions that adapt to parent width, iframe width, and WebView width.
- Stop assuming the page always has a generous root viewport.

### Phase 3. Tighten the design system

- Lock the spacing scale.
- Lock surface hierarchy.
- Lock accent usage.
- Lock text sizes, label sizes, and line lengths.
- Remove any inconsistent radius, shadow, or border density.

### Phase 4. Improve motion deliberately

- Add motion only where it sharpens hierarchy or state change.
- Respect `prefers-reduced-motion`.
- No ornamental motion loops.

### Phase 5. Device-specific adaptation

- Wide desktop
- Standard laptop
- Tablet portrait
- Tablet landscape
- Mobile narrow
- Mobile short-height
- Coarse pointer conditions
- iframe / embedded width
- Android WebView-like constrained width and safe-area behavior

### Phase 6. Accessibility and operability hardening

- DOM order must match visual order where sequence matters.
- Focus must stay visible and unobscured.
- Targets must meet at least WCAG 2.2 AA minimums and preferably the larger 48px comfort target for frequent controls.
- Motion must degrade gracefully.
- Forms and wallet input must have stable labels and clear error states.

### Phase 7. Performance and stability

- Watch Core Web Vitals discipline:
  - LCP
  - INP
  - CLS
- Avoid layout shifts from async data.
- Reserve space for dynamic quote and wallet states.
- Keep typography and loading states stable while data arrives.

## QA protocol

Every pass should include:

1. Structural QA
   - First viewport hierarchy
   - Whole-page scan
   - Section responsibility check
2. Responsive QA
   - 1920x1080
   - 1440x900
   - 1366x768
   - 1024x768
   - 834x1194
   - 393x873
   - 360x800
   - 320x568
3. Interaction QA
   - route switching
   - quote switching
   - amount entry
   - wallet analyze
   - builder apply
   - Telegram share
4. Accessibility QA
   - keyboard order
   - focus visibility
   - coarse-pointer targets
   - reduced-motion fallback
5. Embedded QA
   - iframe width stress
   - Android WebView-like viewport stress

## Skills to use aggressively

### Already installed and useful

- `frontend-skill`
  - Best for art direction, composition, hierarchy, and restraint
- `playwright`
  - Good for deterministic browser interaction and state verification
- `playwright-interactive`
  - Best for persistent visual QA loops when the environment supports it cleanly
- `screenshot`
  - Useful when browser-native capture is not enough
- `figma`
  - Useful if we want faster concept exploration before implementation
- `figma-generate-design`
  - Useful if we choose to prototype 2-3 high-level directions quickly
- `figma-implement-design`
  - Useful once a direction is locked
- `imagegen`
  - Useful only if the chosen direction needs a controlled background or branded visual anchor

### Current workflow gaps

1. No project-specific premium frontend protocol skill
   - We need one ruleset specialized for TON Compass so the same UI mistakes do not repeat
2. No unified visual QA skill
   - We still manually combine screenshots, DOM checks, and viewport audits
3. No creative exploration skill specific to this product
   - We need a lightweight workflow that forces multiple concept directions before implementation

## Proposed custom project protocol

Create a TON Compass-specific protocol with these rules:

- never start a UI pass without a visual thesis
- never ship a layout pass without desktop + mobile + full-page inspection
- never let lower-page sections degrade into generic card grids
- never add a new section unless it replaces or removes an old one
- never hide an important control below a long explanatory block
- never rely on one viewport to sign off the page

## Immediate execution order

1. Lock one creative direction for TON Compass
2. Recompose the full page around that direction
3. Replace leftover panel-grid patterns with deliberate layout
4. Re-run the full QA matrix
5. Only then do micro-polish

## What success looks like

- The page is unmistakable in the first screen
- The product feels more premium than a hackathon demo
- The lower half is as disciplined as the top
- The experience survives small screens and embedded contexts
- The interaction quality matches the visual quality
- The final result feels creative, not mechanically optimized
