const TON_ASSET = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const STON_ASSET = "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";

const modeConfig = {
  ecosystem: {
    title: "Start inside the STON ecosystem",
    description:
      "The widget starts with TON → STON so the first action feels concrete. Users can still change either token directly in the swap UI.",
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
  open: {
    title: "Open market mode",
    description:
      "This preset removes the output token hint and lets the user browse the full widget as a clean first-swap terminal.",
    widget: {
      defaultBidAsset: TON_ASSET,
    },
  },
  learn: {
    title: "Learn before you swap",
    description:
      "Use the same STON.fi execution path, but frame it as an onboarding experience with context and beginner guidance around the live action.",
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
};

let mountedWidget = null;

function manifestUrl() {
  return `${window.location.origin}/tonconnect-manifest.json`;
}

function updateCopy(mode) {
  const config = modeConfig[mode];
  elements.title.textContent = config.title;
  elements.description.textContent = config.description;

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
