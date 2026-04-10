const TON_ASSET = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const STON_ASSET = "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";
const BASE_PATH = window.location.pathname.replace(/[^/]*$/, "");
const STORAGE_KEY = "ton-compass-mode";

const modeConfig = {
  ecosystem: {
    title: "Start inside the STON ecosystem",
    description:
      "The widget starts with TON → STON so the first action feels concrete. Users can still change either token directly in the swap UI.",
    routeShort: "TON → STON",
    stance: "One obvious ecosystem first step for a brand-new TON user.",
    briefBadge: "Ecosystem first move",
    bestFor: "First asset discovery",
    watch: "Gas buffer and pair confirmation",
    afterSwap: "Optional Tonstakers yield path",
    orbitNext: "Tonstakers-ready",
    readinessTitle: "Confirm fees, pair, and route before you connect the wallet.",
    builderExecution: "STON.fi guided TON → STON route",
    builderAfter: "Continue into Tonstakers when the user is ready",
    checklist: [
      "Hold a small TON balance for network fees.",
      "Double-check the output token before confirming.",
      "Use this route when you want one obvious ecosystem first step.",
    ],
    nextMove: {
      badge: "Optional handoff",
      title: "Continue into Tonstakers when the user wants yield",
      copy:
        "Once the first swap is no longer intimidating, the product can hand the user into an official TON staking route instead of ending at the transaction screen.",
      href: "https://app.tonstakers.com/",
      cta: "Open official Tonstakers app",
      note:
        "Tonstakers official FAQ says staking starts from 1 TON, but the wallet should hold at least 2.2 TON because about 1.2 TON is reserved for fees.",
    },
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
  open: {
    title: "Open market mode",
    description:
      "This preset removes the output token hint and lets the user browse the full widget as a clean first-swap terminal.",
    routeShort: "TON → Any",
    stance: "A calmer wrapper for users who already know they want optionality.",
    briefBadge: "Market browsing route",
    bestFor: "Self-directed exploration",
    watch: "Pair selection and live pricing",
    afterSwap: "Stay in market discovery",
    orbitNext: "Full market view",
    readinessTitle: "Use this route only if the user already understands the pair they want.",
    builderExecution: "Open STON.fi market entry route",
    builderAfter: "Stay inside STON.fi for broader asset discovery",
    checklist: [
      "Treat this as a browse-first mode, not a rushed swap.",
      "Compare the pair and amount carefully before continuing.",
      "Use it when you already know which TON asset you want next.",
    ],
    nextMove: {
      badge: "Open continuation",
      title: "Expand from guided mode into the full STON.fi surface",
      copy:
        "When the guided route has done its job, keep the user inside the official STON.fi app for wider market discovery and more self-directed trading.",
      href: "https://app.ston.fi/",
      cta: "Open official STON.fi app",
      note:
        "This route is for users who already understand the pair they want and just need a cleaner launch surface.",
    },
    widget: {
      defaultBidAsset: TON_ASSET,
    },
  },
  learn: {
    title: "Learn before you swap",
    description:
      "Use the same STON.fi execution path, but frame it as an onboarding experience with context and beginner guidance around the live action.",
    routeShort: "Learn → Swap",
    stance: "Keep the trade live, but let explanation lead the interaction.",
    briefBadge: "Explanation-first route",
    bestFor: "First-time TON users",
    watch: "Price movement and slippage",
    afterSwap: "Move into staking or repeat with confidence",
    orbitNext: "Guided continuation",
    readinessTitle: "Finish the learning checks first so the live swap is not the first surprise.",
    builderExecution: "STON.fi live swap with guided framing",
    builderAfter: "Repeat safely or continue into staking",
    checklist: [
      "Read the prompt cards before touching the swap fields.",
      "Expect price movement and slippage on live markets.",
      "Start with a small test amount if this is your first on-chain action.",
    ],
    nextMove: {
      badge: "Yield option",
      title: "Turn the learning route into a TON staking next step",
      copy:
        "A user who understands fees, slippage, and wallet flow is more likely to trust a second move. Tonstakers gives that move a clear TON-denominated continuation.",
      href: "https://app.tonstakers.com/",
      cta: "Open official Tonstakers app",
      note:
        "Use only official Tonstakers links. Their FAQ lists app.tonstakers.com as the official app domain.",
    },
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
};

const elements = {
  body: document.body,
  cards: Array.from(document.querySelectorAll(".route-option")),
  builderChoices: Array.from(document.querySelectorAll(".builder-choice")),
  container: document.querySelector("#omniston-widget-container"),
  fallback: document.querySelector("#widget-fallback"),
  status: document.querySelector("#widget-status"),
  title: document.querySelector("#mode-title"),
  description: document.querySelector("#mode-description"),
  routeShort: document.querySelector("#route-short"),
  routeStance: document.querySelector("#route-stance"),
  routeBestFor: document.querySelector("#route-best-for"),
  routeWatch: document.querySelector("#route-watch"),
  routeAfter: document.querySelector("#route-after"),
  orbitNextTag: document.querySelector("#orbit-next-tag"),
  briefBadge: document.querySelector("#brief-badge"),
  readinessTitle: document.querySelector("#readiness-title"),
  readinessScore: document.querySelector("#readiness-score"),
  readinessBarFill: document.querySelector("#readiness-bar-fill"),
  readinessList: document.querySelector("#readiness-list"),
  nextBadge: document.querySelector("#next-badge"),
  nextTitle: document.querySelector("#next-title"),
  nextCopy: document.querySelector("#next-copy"),
  nextLink: document.querySelector("#next-link"),
  nextNote: document.querySelector("#next-note"),
  copyRouteLink: document.querySelector("#copy-route-link"),
  shareStatus: document.querySelector("#share-status"),
  builderRouteTitle: document.querySelector("#builder-route-title"),
  builderReason: document.querySelector("#builder-reason"),
  builderSummaryExecution: document.querySelector("#builder-summary-execution"),
  builderSummaryAfter: document.querySelector("#builder-summary-after"),
  applyBuilderRoute: document.querySelector("#apply-builder-route"),
};

let currentMode = "ecosystem";
let mountedWidget = null;
let readinessState = [];
const builderState = {
  goal: "ecosystem",
  experience: "first",
  balance: "small",
};

function manifestUrl() {
  return `${window.location.origin}${BASE_PATH}tonconnect-manifest.json`;
}

function shareUrl(mode) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  return url.toString();
}

function readStoredMode() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function persistMode(mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch {
    // Ignore storage failures and keep the route working from URL state only.
  }
}

function resolveInitialMode() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("mode");

  if (fromUrl && modeConfig[fromUrl]) {
    return fromUrl;
  }

  const fromStorage = readStoredMode();
  if (fromStorage && modeConfig[fromStorage]) {
    return fromStorage;
  }

  return "ecosystem";
}

function syncLocation(mode) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  window.history.replaceState({}, "", url);
  persistMode(mode);
}

function updateCopy(mode) {
  const config = modeConfig[mode];

  elements.body.dataset.mode = mode;
  elements.title.textContent = config.title;
  elements.description.textContent = config.description;
  elements.routeShort.textContent = config.routeShort;
  elements.routeStance.textContent = config.stance;
  elements.routeBestFor.textContent = config.bestFor;
  elements.routeWatch.textContent = config.watch;
  elements.routeAfter.textContent = config.afterSwap;
  elements.briefBadge.textContent = config.briefBadge;
  elements.nextBadge.textContent = config.nextMove.badge;
  elements.nextTitle.textContent = config.nextMove.title;
  elements.nextCopy.textContent = config.nextMove.copy;
  elements.nextLink.href = config.nextMove.href;
  elements.nextLink.textContent = config.nextMove.cta;
  elements.nextNote.textContent = config.nextMove.note;
  elements.orbitNextTag.textContent = config.orbitNext;
  elements.readinessTitle.textContent = config.readinessTitle;
  elements.shareStatus.textContent = "Shareable preset ready";

  elements.cards.forEach((card) => {
    card.classList.toggle("active", card.dataset.mode === mode);
  });
}

function renderReadiness(mode) {
  const config = modeConfig[mode];
  const doneCount = readinessState.filter(Boolean).length;
  const percent = Math.round((doneCount / config.checklist.length) * 100);

  elements.readinessScore.textContent = `${percent}%`;
  elements.readinessBarFill.style.width = `${percent}%`;
  elements.readinessList.innerHTML = config.checklist
    .map(
      (item, index) => `
        <button
          class="readiness-item ${readinessState[index] ? "done" : ""}"
          data-index="${index}"
          type="button"
        >
          <span class="readiness-dot" aria-hidden="true"></span>
          <span>${item}</span>
        </button>
      `,
    )
    .join("");
}

function resetReadiness(mode) {
  readinessState = modeConfig[mode].checklist.map(() => false);
  renderReadiness(mode);
}

function updateBuilderControls() {
  elements.builderChoices.forEach((choice) => {
    choice.classList.toggle("selected", builderState[choice.dataset.group] === choice.dataset.value);
  });
}

function getBuilderRecommendation() {
  const scores = {
    ecosystem: 0,
    open: 0,
    learn: 0,
  };

  const { goal, experience, balance } = builderState;

  if (goal === "ecosystem") {
    scores.ecosystem += 4;
    scores.learn += 1;
  }
  if (goal === "explore") {
    scores.open += 4;
  }
  if (goal === "learn") {
    scores.learn += 4;
  }
  if (goal === "yield") {
    scores.learn += 3;
    scores.ecosystem += 2;
  }

  if (experience === "first") {
    scores.learn += 4;
    scores.ecosystem += 1;
    scores.open -= 2;
  }
  if (experience === "some") {
    scores.ecosystem += 1;
    scores.learn += 1;
    scores.open += 1;
  }
  if (experience === "ready") {
    scores.open += 3;
    scores.ecosystem += 1;
  }

  if (balance === "small") {
    scores.learn += 2;
    scores.ecosystem += 1;
  }
  if (balance === "enough") {
    scores.ecosystem += 2;
    scores.open += 1;
  }
  if (balance === "browse") {
    scores.open += 2;
    scores.learn += 1;
  }

  const mode = Object.entries(scores).sort((left, right) => right[1] - left[1])[0][0];
  const config = modeConfig[mode];

  let reason = "This route balances clarity and real execution for the current user profile.";
  if (mode === "learn") {
    reason = "This profile needs explanation before optionality, so the product should teach through the live flow.";
  }
  if (mode === "ecosystem") {
    reason = "This profile benefits from one obvious ecosystem-first action instead of a blank market search.";
  }
  if (mode === "open") {
    reason = "This profile already has enough confidence to browse the market, but still benefits from a calmer wrapper.";
  }

  if (goal === "yield" && balance === "enough") {
    reason = "The user wants yield later and already has enough TON, so start with a confident first route and hand off cleanly to Tonstakers after.";
  }

  return {
    mode,
    reason,
    execution: config.builderExecution,
    after: config.builderAfter,
    title: config.title,
  };
}

function renderBuilderRecommendation() {
  const recommendation = getBuilderRecommendation();
  elements.builderRouteTitle.textContent = recommendation.title;
  elements.builderReason.textContent = recommendation.reason;
  elements.builderSummaryExecution.textContent = recommendation.execution;
  elements.builderSummaryAfter.textContent = recommendation.after;
  elements.applyBuilderRoute.dataset.mode = recommendation.mode;
}

function unmountWidget() {
  if (mountedWidget && typeof mountedWidget.unmount === "function") {
    mountedWidget.unmount();
  }

  mountedWidget = null;
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

  try {
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
  } catch (error) {
    console.error("Failed to mount widget", error);
    elements.status.textContent = "Widget error";
    elements.fallback.classList.remove("hidden");
  }
}

function activateMode(mode) {
  currentMode = mode;
  syncLocation(mode);
  updateCopy(mode);
  resetReadiness(mode);
  mountWidget(mode);
}

async function copyRouteLink() {
  try {
    await navigator.clipboard.writeText(shareUrl(currentMode));
    elements.shareStatus.textContent = "Route link copied";
  } catch (error) {
    console.error("Clipboard copy failed", error);
    elements.shareStatus.textContent = "Clipboard unavailable";
  }
}

elements.cards.forEach((card) => {
  const button = card.querySelector(".mode-button");
  button?.addEventListener("click", () => activateMode(card.dataset.mode));
});

elements.builderChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    builderState[choice.dataset.group] = choice.dataset.value;
    updateBuilderControls();
    renderBuilderRecommendation();
  });
});

elements.readinessList?.addEventListener("click", (event) => {
  const item = event.target.closest(".readiness-item");
  if (!item) {
    return;
  }

  const index = Number(item.dataset.index);
  readinessState[index] = !readinessState[index];
  renderReadiness(currentMode);
});

elements.copyRouteLink?.addEventListener("click", copyRouteLink);
elements.applyBuilderRoute?.addEventListener("click", () => {
  const recommendationMode = elements.applyBuilderRoute.dataset.mode || "ecosystem";
  activateMode(recommendationMode);
  elements.shareStatus.textContent = "Recommendation applied";
  document.querySelector("#swap-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
});

window.addEventListener("load", () => {
  updateBuilderControls();
  renderBuilderRecommendation();
  activateMode(resolveInitialMode());
  window.requestAnimationFrame(() => {
    elements.body.classList.add("is-ready");
  });
});
