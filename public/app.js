const TON_ASSET = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const STON_ASSET = "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";
const BASE_PATH = window.location.pathname.replace(/[^/]*$/, "");

const modeConfig = {
  ecosystem: {
    title: "Start inside the STON ecosystem",
    description:
      "The widget starts with TON → STON so the first action feels concrete. Users can still change either token directly in the swap UI.",
    checklist: [
      "Hold a small TON balance for network fees.",
      "Double-check the output token before confirming.",
      "Use this route if you want one obvious ecosystem first step.",
    ],
    outcome:
      "The user gets a clean first asset discovery moment, then executes through the official STON.fi flow instead of a custom mock interface.",
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
  open: {
    title: "Open market mode",
    description:
      "This preset removes the output token hint and lets the user browse the full widget as a clean first-swap terminal.",
    checklist: [
      "Treat this as a browse-first mode, not a rushed swap.",
      "Compare the pair and amount carefully before continuing.",
      "Use it when you already know which TON asset you want next.",
    ],
    outcome:
      "The page becomes a lightweight market entry screen: less intimidating than a raw DEX interface, but flexible enough for self-directed users.",
    widget: {
      defaultBidAsset: TON_ASSET,
    },
  },
  learn: {
    title: "Learn before you swap",
    description:
      "Use the same STON.fi execution path, but frame it as an onboarding experience with context and beginner guidance around the live action.",
    checklist: [
      "Read the prompt cards before touching the swap fields.",
      "Expect price movement and slippage on live markets.",
      "Start with a small test amount if this is your first on-chain action.",
    ],
    outcome:
      "This mode turns the swap into an education-first onboarding step, which makes the demo feel more like a real consumer product than a widget wrapper.",
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
};

const elements = {
  cards: Array.from(document.querySelectorAll(".idea-card")),
  container: document.querySelector("#omniston-widget-container"),
  fallback: document.querySelector("#widget-fallback"),
  status: document.querySelector("#widget-status"),
  title: document.querySelector("#mode-title"),
  description: document.querySelector("#mode-description"),
  prepList: document.querySelector("#prep-list"),
  outcome: document.querySelector("#mode-outcome"),
};

let mountedWidget = null;

function manifestUrl() {
  return `${window.location.origin}${BASE_PATH}tonconnect-manifest.json`;
}

function updateCopy(mode) {
  const config = modeConfig[mode];
  elements.title.textContent = config.title;
  elements.description.textContent = config.description;
  elements.outcome.textContent = config.outcome;
  elements.prepList.innerHTML = config.checklist.map((item) => `<li>${item}</li>`).join("");

  elements.cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.mode === mode);
  });
}

function unmountWidget() {
  if (mountedWidget && typeof mountedWidget.unmount === "function") {
    mountedWidget.unmount();
  }
  elements.container.innerHTML = "";
}

function mountWidget(mode) {
  if (!window.OmnistonWidget) {
    elements.status.textContent = "Widget unavailable";
    elements.fallback.classList.remove("hidden");
    return;
  }

  const config = modeConfig[mode];
  unmountWidget();

  mountedWidget = new window.OmnistonWidget({
    tonconnect: {
      type: "standalone",
      options: {
        manifestUrl: manifestUrl(),
      },
    },
    widget: {
      ...config.widget,
    },
  });

  mountedWidget.mount(elements.container);
  elements.status.textContent = "Widget ready";
  elements.fallback.classList.add("hidden");
}

function activateMode(mode) {
  updateCopy(mode);
  mountWidget(mode);
}

elements.cards.forEach((card) => {
  const button = card.querySelector(".mode-button");
  button?.addEventListener("click", () => activateMode(card.dataset.mode));
});

window.addEventListener("load", () => {
  activateMode("ecosystem");
});
