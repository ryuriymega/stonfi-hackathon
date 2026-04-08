# TON Compass

TON Compass is a fast-to-ship hackathon MVP for the STON.fi track: a guided first-swap app for new TON users.

## Why this concept

- It has a clear use case: help a first-time TON user take one confident DeFi action.
- It qualifies for the STON.fi track through a real STON.fi integration.
- It is small enough to finish quickly, but still looks like a product instead of a raw SDK demo.

## Stack

- Node-RED `HTTP In` flow deployment for production
- Dependency-free Node server for local fallback development
- Dynamic `tonconnect-manifest.json` endpoint
- Official STON.fi Omniston Widget via CDN
- Static frontend in `public/`

## Run

```bash
npm start
```

Then open `http://localhost:3000`.

## Node-RED deployment

This server already has Node-RED running as a system service with HTTPS enabled. The intended public app path is:

`https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html`

The production deployment is driven by:

- `ops/nodered/flows.json` – the flow definition
- `ops/deploy-to-nodered.sh` – copies the flow into `~/.node-red/flows.json` and restarts `nodered.service`

The frontend is written to work from a subpath so it can be mounted by Node-RED routes.

## Suggested application pitch

TON Compass is a beginner-friendly front door to TON DeFi. Instead of exposing a new user to every possible token and action at once, it frames the first move with simple presets and plain-language guidance, while delegating the real swap execution to the official STON.fi widget. The result is a lightweight product that is fast to ship, easy to demo, and directly useful for onboarding.

## Repo extras

- `SUBMISSION.md` – ready-to-use pitch and demo draft
- `ROADMAP.md` – immediate post-hackathon growth plan
- `ops/nodered/flows.json` – working Node-RED flow deployment
- `ops/deploy-to-nodered.sh` – deployment helper for the Node-RED instance
