# TON Compass frontend research and execution notes

Date: 2026-04-11

## Official guidance used

- Material Design structure:
  - avoid slicing interfaces into too many regions
  - prefer whitespace and grouping over extra panels
  - keep a clear content canvas plus secondary regions
- Material metrics and keylines:
  - 8dp spacing rhythm
  - 48dp minimum touch targets
  - consistent margins across breakpoints
- WCAG meaningful sequence:
  - DOM order must preserve a sensible reading order
  - responsive layout must not bury decision tools below secondary content
- WCAG contrast:
  - small text needs strong luminance contrast
  - tiny muted labels are a common failure mode

## Main issues found before the final integrated pass

1. The page still had too many separate regions.
2. The support story was fragmented across multiple cards.
3. Small labels were too quiet.
4. Some controls were still under the 48px recommendation.
5. The planner output was still too document-like.
6. Desktop and mobile were cleaner than before, but the support rail still felt assembled instead of inevitable.

## Plan that was executed

1. Merge the support story into one coherent after-route region.
2. Increase legibility for tiny labels and status text.
3. Normalize key touch targets to 48px.
4. Tighten copy without shrinking it into illegibility.
5. Keep narrow mobile focused on the decision path by hiding optional story layers.
6. Re-run full-page audits across desktop, wide, tablet, mobile, and narrow mobile.

## What changed

- Merged next-step, Telegram continuity, and route summary into one integrated after-route section.
- Raised control sizes for key interactive elements to the 48px bar.
- Increased small-label and status-text sizes.
- Tightened planner copy and support copy.
- Preserved the shell rule that planner must appear before readiness on tablet/mobile.
- Kept optional lower-half narrative hidden on narrow mobile where it hurts the decision path.

## Verification highlights

- Planner is before readiness on tablet and mobile.
- Header links and main controls now hit 48px height.
- The support story is now one region instead of three competing cards.
- Narrow mobile still removes optional lower-half narrative blocks.
