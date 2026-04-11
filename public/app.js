const TON_ASSET = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const STON_ASSET = "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";
const BASE_PATH = window.location.pathname.replace(/[^/]*$/, "");
const STORAGE_KEY = "ton-compass-mode";

const modeConfig = {
  ecosystem: {
    title: "Start with TON → STON",
    description:
      "Start with one obvious route, then adjust inside the live STON.fi swap.",
    routeShort: "TON → STON",
    stance: "One obvious ecosystem first step for a brand-new TON user.",
    briefBadge: "Ecosystem first move",
    orbitNext: "Tonstakers-ready",
    readinessTitle: "Check route, pair, and fees before wallet connect.",
    builderExecution: "STON.fi guided TON → STON route",
    builderAfter: "Continue into Tonstakers when the user is ready",
    checklist: [
      "Keep a small TON buffer for fees.",
      "Confirm the output token before you sign.",
      "Use this when you want one obvious ecosystem first step.",
    ],
    nextMove: {
      badge: "Optional handoff",
      title: "Hand off to Tonstakers when yield matters",
      copy:
        "After the first swap, offer an official TON staking continuation instead of ending at confirmation.",
      followup: "Compass Pro can keep that handoff warm in Telegram.",
      href: "https://app.tonstakers.com/",
      cta: "Open official Tonstakers app",
      note:
        "Tonstakers starts from 1 TON, but the wallet should keep about 2.2 TON available to cover reserved fees.",
    },
    proOffer: {
      title: "Keep this route warm in Telegram",
      copy:
        "Save the route and come back only when the next move is useful.",
      bullets: [
        "Route alerts",
        "Saved return path",
        "Next-step prompts",
      ],
      cta: "Send route to Telegram",
      footnote:
        "Free at launch. Telegram subscriptions later unlock deeper alerts and weekly digests.",
      telegramText:
        "TON Compass ecosystem route saved. Keep the next TON move close in Telegram.",
    },
    widget: {
      defaultBidAsset: TON_ASSET,
      defaultAskAsset: STON_ASSET,
    },
  },
  open: {
    title: "Open market mode",
    description:
      "Keep the wrapper calm, remove the preset output, and browse the full STON.fi surface.",
    routeShort: "TON → Any",
    stance: "A calmer wrapper for users who already know they want optionality.",
    briefBadge: "Market browsing route",
    orbitNext: "Full market view",
    readinessTitle: "Use this only when the pair is already clear.",
    builderExecution: "Open STON.fi market entry route",
    builderAfter: "Stay inside STON.fi for broader asset discovery",
    checklist: [
      "Treat this as browse-first mode, not a rushed swap.",
      "Check pair and amount carefully before signing.",
      "Use it only when you already know the next asset.",
    ],
    nextMove: {
      badge: "Open continuation",
      title: "Stay inside STON.fi for broader market browsing",
      copy:
        "Once the guided route has done its job, keep the user inside the official STON.fi app for broader browsing.",
      followup: "Compass Pro can watch this route and pull the user back only when something changes.",
      href: "https://app.ston.fi/",
      cta: "Open official STON.fi app",
      note:
        "This route fits users who already understand the pair and only need a cleaner launch surface.",
    },
    proOffer: {
      title: "Watch open routes in Telegram",
      copy:
        "Watch pairs, save routes, and return only when the market gives a real reason to act.",
      bullets: [
        "Saved route watchlist",
        "Market movement alerts",
        "Weekly wallet digest",
      ],
      cta: "Send route to Telegram",
      footnote:
        "Free route handoff now. Telegram subscriptions later unlock deeper watchlists and digests.",
      telegramText:
        "TON Compass open-market route saved. Bring this path into Telegram and revisit it when the market changes.",
    },
    widget: {
      defaultBidAsset: TON_ASSET,
    },
  },
  learn: {
    title: "Learn the route first",
    description:
      "Keep the live STON.fi swap, but let explanation lead the first move.",
    routeShort: "Learn → Swap",
    stance: "Keep the trade live, but let explanation lead the interaction.",
    briefBadge: "Explanation-first route",
    orbitNext: "Guided continuation",
    readinessTitle: "Finish the learning checks before wallet connect.",
    builderExecution: "STON.fi live swap with guided framing",
    builderAfter: "Repeat safely or continue into staking",
    checklist: [
      "Read the prompts before touching the swap fields.",
      "Expect live price movement and slippage.",
      "Start with a small test amount if this is your first action.",
    ],
    nextMove: {
      badge: "Yield option",
      title: "Turn the learning route into a staking follow-up",
      copy:
        "Once fees, slippage, and wallet flow are clear, Tonstakers becomes a clean TON-denominated next step.",
      followup: "Compass Pro can keep that follow-up calm with safety-first reminders in Telegram.",
      href: "https://app.tonstakers.com/",
      cta: "Open official Tonstakers app",
      note:
        "Use only official Tonstakers links. Their FAQ lists app.tonstakers.com as the official app domain.",
    },
    proOffer: {
      title: "Keep calm follow-ups in Telegram",
      copy:
        "Stay calm after the first swap with small follow-ups about timing, safety, and the next low-stress move.",
      bullets: [
        "Route watch alerts",
        "Safer repeat reminders",
        "Staking follow-up prompts",
      ],
      cta: "Send route to Telegram",
      footnote:
        "Free at launch. Telegram subscriptions later add deeper alerts, digests, and richer follow-up guidance.",
      telegramText:
        "TON Compass learning route saved. Keep a calmer next move ready in Telegram.",
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
  quickModes: Array.from(document.querySelectorAll("[data-mode-switch]")),
  builderChoices: Array.from(document.querySelectorAll(".builder-choice")),
  container: document.querySelector("#omniston-widget-container"),
  fallback: document.querySelector("#widget-fallback"),
  status: document.querySelector("#widget-status"),
  title: document.querySelector("#mode-title"),
  description: document.querySelector("#mode-description"),
  routeShort: document.querySelector("#route-short"),
  routeStance: document.querySelector("#route-stance"),
  orbitNextTag: document.querySelector("#orbit-next-tag"),
  briefBadge: document.querySelector("#brief-badge"),
  readinessTitle: document.querySelector("#readiness-title"),
  readinessScore: document.querySelector("#readiness-score"),
  readinessBarFill: document.querySelector("#readiness-bar-fill"),
  readinessList: document.querySelector("#readiness-list"),
  nextBadge: document.querySelector("#next-badge"),
  nextTitle: document.querySelector("#next-title"),
  nextCopy: document.querySelector("#next-copy"),
  nextFollowup: document.querySelector("#next-followup"),
  nextLink: document.querySelector("#next-link"),
  nextNote: document.querySelector("#next-note"),
  copyRouteLink: document.querySelector("#copy-route-link"),
  shareStatus: document.querySelector("#share-status"),
  jumpPlanner: document.querySelector("#jump-planner"),
  inlineBuilderTitle: document.querySelector("#inline-builder-title"),
  inlineAfterTag: document.querySelector("#inline-after-tag"),
  inlineProLink: document.querySelector("#inline-pro-link"),
  inlineProTag: document.querySelector("#inline-pro-tag"),
  builderRouteTitle: document.querySelector("#builder-route-title"),
  builderReason: document.querySelector("#builder-reason"),
  builderSummaryExecution: document.querySelector("#builder-summary-execution"),
  builderSummaryAfter: document.querySelector("#builder-summary-after"),
  applyBuilderRoute: document.querySelector("#apply-builder-route"),
  proTitle: document.querySelector("#pro-title"),
  proCopy: document.querySelector("#pro-copy"),
  proList: document.querySelector("#pro-list"),
  proCta: document.querySelector("#pro-cta"),
  proFootnote: document.querySelector("#pro-footnote"),
};

let currentMode = null;
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

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function shareUrl(mode) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  return url.toString();
}

function telegramPreviewUrl(mode) {
  const config = modeConfig[mode];
  const url = new URL("https://t.me/share/url");
  url.searchParams.set("url", shareUrl(mode));
  url.searchParams.set("text", config.proOffer.telegramText);
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

function readModeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get("mode");

  if (fromUrl && modeConfig[fromUrl]) {
    return fromUrl;
  }

  return null;
}

function resolveInitialMode() {
  const fromUrl = readModeFromUrl();
  if (fromUrl) {
    return fromUrl;
  }

  const fromStorage = readStoredMode();
  if (fromStorage && modeConfig[fromStorage]) {
    return fromStorage;
  }

  return "ecosystem";
}

function syncLocation(mode, { replace = false } = {}) {
  const url = new URL(window.location.href);
  url.searchParams.set("mode", mode);
  const method = replace ? "replaceState" : "pushState";
  window.history[method]({ mode }, "", url);
  persistMode(mode);
}

function scrollSwapPanelIntoView() {
  document.querySelector("#swap-panel")?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
}

function updateCopy(mode) {
  const config = modeConfig[mode];

  elements.body.dataset.mode = mode;
  elements.title.textContent = config.title;
  elements.description.textContent = config.description;
  elements.routeShort.textContent = config.routeShort;
  elements.routeStance.textContent = config.stance;
  elements.briefBadge.textContent = config.briefBadge;
  elements.nextBadge.textContent = config.nextMove.badge;
  elements.nextTitle.textContent = config.nextMove.title;
  elements.nextCopy.textContent = config.nextMove.copy;
  elements.nextFollowup.textContent = config.nextMove.followup;
  elements.nextLink.href = config.nextMove.href;
  elements.nextLink.textContent = config.nextMove.cta;
  elements.nextNote.textContent = config.nextMove.note;
  elements.orbitNextTag.textContent = config.orbitNext;
  elements.inlineAfterTag.textContent = config.orbitNext;
  elements.readinessTitle.textContent = config.readinessTitle;
  elements.shareStatus.textContent = "";

  elements.cards.forEach((card) => {
    const active = card.dataset.mode === mode;
    card.classList.toggle("active", active);
    card.setAttribute("aria-pressed", active ? "true" : "false");
    const state = card.querySelector(".route-state");
    if (state) {
      state.textContent = active ? "Active route" : "Activate route";
    }
  });

  elements.quickModes.forEach((button) => {
    const active = button.dataset.modeSwitch === mode;
    button.classList.toggle("selected", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });

  renderProOffer(mode);
}

function renderProOffer(mode) {
  const config = modeConfig[mode].proOffer;

  elements.proTitle.textContent = config.title;
  elements.proCopy.textContent = config.copy;
  elements.proFootnote.textContent = config.footnote;
  elements.proCta.textContent = config.cta;
  elements.proCta.href = telegramPreviewUrl(mode);
  elements.proCta.setAttribute("aria-label", `${config.cta} for ${mode}`);
  elements.inlineProLink.href = telegramPreviewUrl(mode);
  elements.inlineProTag.textContent = config.cta;

  elements.proList.replaceChildren(
    ...config.bullets.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
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
          aria-pressed="${readinessState[index] ? "true" : "false"}"
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
    const selected = builderState[choice.dataset.group] === choice.dataset.value;
    choice.classList.toggle("selected", selected);
    choice.setAttribute("aria-pressed", selected ? "true" : "false");
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

  let reason = "This route balances clarity and real execution for this profile.";
  if (mode === "learn") {
    reason = "This profile needs explanation before optionality, so the product should teach through the live flow.";
  }
  if (mode === "ecosystem") {
    reason = "This profile benefits from one obvious ecosystem-first step instead of a blank market search.";
  }
  if (mode === "open") {
    reason = "This profile is ready to browse, but still benefits from a calmer wrapper.";
  }

  if (goal === "yield" && balance === "enough") {
    reason = "The user wants yield later and already has enough TON, so start with a confident route and hand off cleanly after.";
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
  elements.inlineBuilderTitle.textContent = recommendation.title;
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
    elements.status.textContent = "Unavailable";
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
    elements.status.textContent = "Ready";
    elements.fallback.classList.add("hidden");
  } catch (error) {
    console.error("Failed to mount widget", error);
    elements.status.textContent = "Error";
    elements.fallback.classList.remove("hidden");
  }
}

function activateMode(mode, options = {}) {
  const {
    scrollToSwap = false,
    updateHistory = true,
    replaceHistory = false,
  } = options;

  if (!modeConfig[mode]) {
    return;
  }

  if (mode === currentMode) {
    if (scrollToSwap) {
      scrollSwapPanelIntoView();
    }
    return;
  }

  currentMode = mode;

  if (updateHistory) {
    syncLocation(mode, { replace: replaceHistory });
  } else {
    persistMode(mode);
  }

  updateCopy(mode);
  resetReadiness(mode);
  mountWidget(mode);

  if (scrollToSwap) {
    scrollSwapPanelIntoView();
  }
}

async function copyRouteLink() {
  try {
    await navigator.clipboard.writeText(shareUrl(currentMode));
    elements.copyRouteLink.textContent = "Link copied";
    elements.shareStatus.textContent = "Current route link copied to clipboard";
    window.setTimeout(() => {
      elements.copyRouteLink.textContent = "Copy link";
      elements.shareStatus.textContent = "";
    }, 1400);
  } catch (error) {
    console.error("Clipboard copy failed", error);
    elements.shareStatus.textContent = "Clipboard unavailable";
  }
}

elements.cards.forEach((card) => {
  card.addEventListener("click", () => activateMode(card.dataset.mode, { scrollToSwap: true }));
});

elements.quickModes.forEach((button) => {
  button.addEventListener("click", () => activateMode(button.dataset.modeSwitch));
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
elements.jumpPlanner?.addEventListener("click", () => {
  document.querySelector("#planner")?.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
});
elements.applyBuilderRoute?.addEventListener("click", () => {
  const recommendationMode = elements.applyBuilderRoute.dataset.mode || "ecosystem";
  activateMode(recommendationMode, { scrollToSwap: true });
});

window.addEventListener("popstate", () => {
  const mode = readModeFromUrl() || resolveInitialMode();
  activateMode(mode, { updateHistory: false });
});

window.addEventListener("load", () => {
  updateBuilderControls();
  renderBuilderRecommendation();
  activateMode(resolveInitialMode(), { replaceHistory: true });
});
