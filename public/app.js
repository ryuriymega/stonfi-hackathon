const TON_ASSET = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";
const STON_ASSET = "EQA2kCVNwVsil2EM2mB0SkXytxCqQjS4mttjDpnXmwG9T6bO";
const TSTON_ASSET = "EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav";
const STON_API_BASE = "https://api.ston.fi/v1";
const TONSTAKERS_APP_URL = "https://app.tonstakers.com/";
const TONSTAKERS_MIN_FAQ_URL = "https://tonstakers.com/faq/en/article/what-is-tonstakers";
const TONSTAKERS_UNSTAKE_FAQ_URL = "https://tonstakers.com/faq/en/article/withdrawing-ton-from-liquid-staking";
const BASE_PATH = window.location.pathname.replace(/[^/]*$/, "");
const STORAGE_KEY = "ton-compass-mode";
const SIMULATION_SLIPPAGE = "0.01";

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
    decisionLead:
      "Use the live quote below to sanity-check the ecosystem entry before the wallet prompt.",
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
      href: TONSTAKERS_APP_URL,
      cta: "Open official Tonstakers app",
      note:
        "Tonstakers starts from 1 TON, but the wallet should keep about 2.2 TON available to cover reserved fees.",
    },
    proOffer: {
      title: "Keep this route warm in Telegram",
      copy:
        "Save the route and come back only when the next move is useful.",
      bullets: ["Route alerts", "Saved return path", "Next-step prompts"],
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
    decisionLead:
      "Use the quote and wallet layer to validate the market path before you drop into the broader STON.fi surface.",
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
      bullets: ["Saved route watchlist", "Market movement alerts", "Weekly wallet digest"],
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
    decisionLead:
      "Use the live quote layer to make the learning route numerical, not just explanatory.",
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
      href: TONSTAKERS_APP_URL,
      cta: "Open official Tonstakers app",
      note:
        "Use only official Tonstakers links. Their FAQ lists app.tonstakers.com as the official app domain.",
    },
    proOffer: {
      title: "Keep calm follow-ups in Telegram",
      copy:
        "Stay calm after the first swap with small follow-ups about timing, safety, and the next low-stress move.",
      bullets: ["Route watch alerts", "Safer repeat reminders", "Staking follow-up prompts"],
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

const simulationPairs = {
  ston: {
    label: "TON → STON",
    askAsset: STON_ASSET,
    askSymbol: "STON",
    note: "Reference ecosystem quote from the official STON.fi API.",
  },
  tston: {
    label: "TON → tsTON",
    askAsset: TSTON_ASSET,
    askSymbol: "tsTON",
    note:
      "Market-based tsTON quote from the official STON.fi API. This is a live market route, not a staking contract estimate.",
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
  labSummary: document.querySelector("#lab-summary"),
  simulationStatus: document.querySelector("#simulation-status"),
  simulationContext: document.querySelector("#simulation-context"),
  simulationForm: document.querySelector("#simulation-form"),
  simulationAmount: document.querySelector("#simulation-amount"),
  simulationExpected: document.querySelector("#simulation-expected"),
  simulationMin: document.querySelector("#simulation-min"),
  simulationFee: document.querySelector("#simulation-fee"),
  simulationGas: document.querySelector("#simulation-gas"),
  simulationNote: document.querySelector("#simulation-note"),
  quoteSwitches: Array.from(document.querySelectorAll("[data-quote-pair]")),
  amountPills: Array.from(document.querySelectorAll(".amount-pill")),
  walletStatus: document.querySelector("#wallet-status"),
  walletForm: document.querySelector("#wallet-form"),
  walletAddress: document.querySelector("#wallet-address"),
  walletBalanceGrid: document.querySelector("#wallet-balance-grid"),
  walletRouteTitle: document.querySelector("#wallet-route-title"),
  walletRouteCopy: document.querySelector("#wallet-route-copy"),
  walletApplyRoute: document.querySelector("#wallet-apply-route"),
  tonstakersStatus: document.querySelector("#tonstakers-status"),
  tstonMarketOut: document.querySelector("#tston-market-out"),
  tstonMarketIn: document.querySelector("#tston-market-in"),
  tstonPremium: document.querySelector("#tston-premium"),
  stonPerTon: document.querySelector("#ston-per-ton"),
  tonstakersNote: document.querySelector("#tonstakers-note"),
};

let currentMode = null;
let mountedWidget = null;
let readinessState = [];
let currentSimulationPair = "ston";
let marketSnapshot = null;
let lastWalletMode = null;
let simulationRequestId = 0;
let walletRequestId = 0;

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

function stonApiUrl(pathname, params = {}) {
  const url = new URL(`${STON_API_BASE}${pathname}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || text || `Request failed: ${response.status}`);
  }

  return data;
}

function normalizeAssetResponse(data) {
  const asset = data.asset || data;
  return {
    address: asset.contract_address,
    symbol: asset.symbol,
    displayName: asset.display_name,
    decimals: Number(asset.decimals || 9),
    balanceUnits: asset.balance || "0",
    priceUsd: Number(
      asset.dex_price_usd ||
        asset.dex_usd_price ||
        asset.third_party_price_usd ||
        asset.third_party_usd_price ||
        0,
    ),
  };
}

function normalizeQuoteResponse(data, askSymbol) {
  return {
    offerUnits: data.offer_units || "0",
    askUnits: data.ask_units || "0",
    minAskUnits: data.min_ask_units || "0",
    feeUnits: data.fee_units || "0",
    feePercent: Number(data.fee_percent || 0),
    priceImpact: Number(data.price_impact || 0),
    swapRate: Number(data.swap_rate || 0),
    gasForwardUnits: data.gas_params?.forward_gas || "0",
    gasEstimatedUnits: data.gas_params?.estimated_gas_consumption || "0",
    askSymbol,
  };
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
  return fromUrl && modeConfig[fromUrl] ? fromUrl : null;
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

function formatCompactNumber(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    notation: value >= 1000 ? "compact" : "standard",
    maximumFractionDigits: value >= 1000 ? 1 : 0,
  }).format(value);
}

function formatUsd(value) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  if (value >= 1000) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(value);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 10 ? 2 : 4,
  }).format(value);
}

function formatDecimal(value, maximumFractionDigits = 3) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);
}

function formatPercent(value, maximumFractionDigits = 2) {
  if (!Number.isFinite(value)) {
    return "-";
  }

  return `${formatDecimal(value, maximumFractionDigits)}%`;
}

function formatUnits(units, decimals, maximumFractionDigits = 4) {
  const raw = String(units || "0");
  const negative = raw.startsWith("-");
  const digits = negative ? raw.slice(1) : raw;
  const padded = digits.padStart(decimals + 1, "0");
  const whole = padded.slice(0, -decimals) || "0";
  let fraction = padded.slice(-decimals).replace(/0+$/, "");

  if (fraction.length > maximumFractionDigits) {
    fraction = fraction.slice(0, maximumFractionDigits).replace(/0+$/, "");
  }

  return `${negative ? "-" : ""}${whole}${fraction ? `.${fraction}` : ""}`;
}

function unitsToNumber(units, decimals) {
  return Number(formatUnits(units, decimals, Math.min(decimals, 6)));
}

function toUnits(value, decimals) {
  const normalized = String(value).trim();
  if (!/^\d+(\.\d+)?$/.test(normalized)) {
    throw new Error("Enter a valid amount.");
  }

  const [whole, fraction = ""] = normalized.split(".");
  const safeFraction = fraction.slice(0, decimals).padEnd(decimals, "0");
  const raw = `${whole}${safeFraction}`.replace(/^0+(?=\d)/, "");
  return raw || "0";
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
  elements.simulationContext.textContent = config.decisionLead;
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
  const scores = { ecosystem: 0, open: 0, learn: 0 };
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
  const { scrollToSwap = false, updateHistory = true, replaceHistory = false } = options;

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

function setSimulationStatus(text) {
  elements.simulationStatus.textContent = text;
}

function renderSimulationQuote(quote, pairKey, amountValue) {
  const pair = simulationPairs[pairKey];
  elements.simulationExpected.textContent = `${formatUnits(quote.askUnits, 9, 3)} ${pair.askSymbol}`;
  elements.simulationMin.textContent = `${formatUnits(quote.minAskUnits, 9, 3)} ${pair.askSymbol}`;
  elements.simulationFee.textContent = `${formatUnits(quote.feeUnits, 9, 4)} ${pair.askSymbol}`;
  elements.simulationGas.textContent = `${formatUnits(quote.gasForwardUnits, 9, 3)} TON`;
  elements.simulationNote.textContent = `${pair.note} ${formatDecimal(Number(amountValue), 3)} TON is currently pricing at ${formatDecimal(quote.swapRate, 4)} ${pair.askSymbol} per TON, with ${formatPercent(quote.priceImpact * 100, 3)} price impact.`;
}

async function refreshSimulation({ useCached = false } = {}) {
  const requestId = ++simulationRequestId;
  const pairKey = currentSimulationPair;
  const pair = simulationPairs[pairKey];
  const amount = elements.simulationAmount.value || "1";

  setSimulationStatus("Loading");

  if (useCached && marketSnapshot?.quotes?.[pairKey] && Number(amount) === 1) {
    renderSimulationQuote(marketSnapshot.quotes[pairKey], pairKey, amount);
    setSimulationStatus("Live");
    return;
  }

  try {
    const units = toUnits(amount, 9);
    const response = await fetchJson(
      stonApiUrl("/swap/simulate", {
        offer_address: TON_ASSET,
        ask_address: pair.askAsset,
        units,
        slippage_tolerance: SIMULATION_SLIPPAGE,
      }),
      { method: "POST" },
    );

    if (requestId !== simulationRequestId) {
      return;
    }

    renderSimulationQuote(normalizeQuoteResponse(response, pair.askSymbol), pairKey, amount);
    setSimulationStatus("Live");
  } catch (error) {
    console.error("Simulation request failed", error);
    if (requestId !== simulationRequestId) {
      return;
    }

    setSimulationStatus("Error");
    elements.simulationNote.textContent = "Live quote failed. Check the amount or retry the official STON.fi request.";
  }
}

function setSimulationPair(pairKey) {
  if (!simulationPairs[pairKey]) {
    return;
  }

  currentSimulationPair = pairKey;
  elements.quoteSwitches.forEach((button) => {
    const selected = button.dataset.quotePair === pairKey;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  refreshSimulation({ useCached: true });
}

function buildWalletBalanceMarkup(asset) {
  const hasBalance = Number(asset.balanceUnits || 0) > 0;
  const amount = hasBalance ? formatUnits(asset.balanceUnits, asset.decimals, 3) : "0";
  return `
    <article class="wallet-balance">
      <span>${asset.symbol}</span>
      <strong>${amount}</strong>
    </article>
  `;
}

function deriveWalletRecommendation(assets) {
  const ton = unitsToNumber(assets.ton.balanceUnits, assets.ton.decimals);
  const ston = unitsToNumber(assets.ston.balanceUnits, assets.ston.decimals);
  const tsTon = unitsToNumber(assets.tsTon.balanceUnits, assets.tsTon.decimals);

  if (tsTon >= 0.2) {
    return {
      mode: "open",
      title: "This wallet already holds tsTON.",
      copy:
        "Skip generic onboarding. Keep the user in a calmer continuation flow that respects existing staking exposure and liquidity choices.",
    };
  }

  if (ton > 0 && ton < 2.2) {
    return {
      mode: "learn",
      title: "Keep the first move small until the TON buffer is larger.",
      copy:
        "Tonstakers guidance suggests keeping about 2.2 TON available, so this wallet fits a lower-stress learning route or a small ecosystem entry first.",
    };
  }

  if (ton >= 2.2 && ston < 1) {
    return {
      mode: "ecosystem",
      title: "Healthy TON buffer for a clean ecosystem entry.",
      copy:
        "This wallet can keep fees covered, take the TON → STON route cleanly, and still leave room for a later Tonstakers handoff.",
    };
  }

  if (ston >= 5) {
    return {
      mode: "open",
      title: "The wallet already leans into ecosystem assets.",
      copy:
        "A calmer open-market route fits better than another beginner-first wrapper because the wallet already has meaningful STON exposure.",
    };
  }

  return {
    mode: "ecosystem",
    title: "Default to the guided ecosystem route.",
    copy:
      "This wallet does not show a strong reason to jump into the open market or staking continuation first, so the guided route is still the clearest start.",
  };
}

async function analyzeWallet(address) {
  const requestId = ++walletRequestId;
  elements.walletStatus.textContent = "Loading";
  elements.walletApplyRoute.disabled = true;

  try {
    const [ton, ston, tsTon] = await Promise.all([
      fetchJson(stonApiUrl(`/wallets/${encodeURIComponent(address)}/assets/${TON_ASSET}`)),
      fetchJson(stonApiUrl(`/wallets/${encodeURIComponent(address)}/assets/${STON_ASSET}`)),
      fetchJson(stonApiUrl(`/wallets/${encodeURIComponent(address)}/assets/${TSTON_ASSET}`)),
    ]);

    if (requestId !== walletRequestId) {
      return;
    }

    const assets = {
      ton: normalizeAssetResponse(ton),
      ston: normalizeAssetResponse(ston),
      tsTon: normalizeAssetResponse(tsTon),
    };
    const recommendation = deriveWalletRecommendation(assets);
    lastWalletMode = recommendation.mode;

    elements.walletBalanceGrid.innerHTML = [
      buildWalletBalanceMarkup(assets.ton),
      buildWalletBalanceMarkup(assets.ston),
      buildWalletBalanceMarkup(assets.tsTon),
    ].join("");
    elements.walletRouteTitle.textContent = recommendation.title;
    elements.walletRouteCopy.textContent = recommendation.copy;
    elements.walletApplyRoute.disabled = false;
    elements.walletStatus.textContent = "Live";
  } catch (error) {
    console.error("Wallet analysis failed", error);
    if (requestId !== walletRequestId) {
      return;
    }

    lastWalletMode = null;
    elements.walletStatus.textContent = "Error";
    elements.walletRouteTitle.textContent = "Wallet lookup failed.";
    elements.walletRouteCopy.textContent =
      "Use a valid TON wallet address. TON Compass reads this through official STON.fi wallet asset endpoints.";
  }
}

function renderMarketSnapshot(snapshot) {
  const { ton, ston, tsTon } = snapshot.assets;
  const { dex } = snapshot;
  const volumeUsd = formatUsd(dex.volumeUsd);
  const wallets = formatCompactNumber(dex.uniqueWallets);

  elements.labSummary.textContent = `STON.fi public data currently shows ${volumeUsd} in lifetime volume and ${wallets} wallets. Use it here for the live quote, wallet context, and Tonstakers handoff.`;
  elements.tstonMarketOut.textContent = `${formatUnits(snapshot.quotes.tston.askUnits, 9, 3)} tsTON`;
  elements.tstonMarketIn.textContent = `${formatUnits(snapshot.reverseQuotes.tston.offerUnits, 9, 3)} TON`;
  elements.tstonPremium.textContent = formatPercent(snapshot.derived.tsTonPremiumPct, 2);
  elements.stonPerTon.textContent = `${formatDecimal(snapshot.derived.stonPerTon, 2)} STON`;
  elements.tonstakersNote.textContent = `Live TON and tsTON prices currently imply a ${formatPercent(snapshot.derived.tsTonPremiumPct, 2)} tsTON market premium versus TON. Tonstakers constraints stay anchored to the official FAQ: 1 TON minimum, about 2.2 TON wallet reserve, and instant exit only when pool liquidity is available.`;
  elements.tonstakersStatus.textContent = "Live";
  renderSimulationQuote(snapshot.quotes[currentSimulationPair], currentSimulationPair, elements.simulationAmount.value || "1");
  setSimulationStatus("Live");

  void ton;
  void ston;
  void tsTon;
}

async function loadMarketSnapshot() {
  setSimulationStatus("Loading");
  elements.tonstakersStatus.textContent = "Loading";

  try {
    const [tonAsset, stonAsset, tsTonAsset, dexStats, ecosystemQuote, tstonQuote, tstonReverseQuote] =
      await Promise.all([
        fetchJson(stonApiUrl(`/assets/${TON_ASSET}`)),
        fetchJson(stonApiUrl(`/assets/${STON_ASSET}`)),
        fetchJson(stonApiUrl(`/assets/${TSTON_ASSET}`)),
        fetchJson(stonApiUrl("/stats/dex")),
        fetchJson(
          stonApiUrl("/swap/simulate", {
            offer_address: TON_ASSET,
            ask_address: STON_ASSET,
            units: "1000000000",
            slippage_tolerance: SIMULATION_SLIPPAGE,
          }),
          { method: "POST" },
        ),
        fetchJson(
          stonApiUrl("/swap/simulate", {
            offer_address: TON_ASSET,
            ask_address: TSTON_ASSET,
            units: "1000000000",
            slippage_tolerance: SIMULATION_SLIPPAGE,
          }),
          { method: "POST" },
        ),
        fetchJson(
          stonApiUrl("/reverse_swap/simulate", {
            offer_address: TON_ASSET,
            ask_address: TSTON_ASSET,
            units: "1000000000",
            slippage_tolerance: SIMULATION_SLIPPAGE,
          }),
          { method: "POST" },
        ),
      ]);

    const ton = normalizeAssetResponse(tonAsset);
    const ston = normalizeAssetResponse(stonAsset);
    const tsTon = normalizeAssetResponse(tsTonAsset);

    marketSnapshot = {
      assets: { ton, ston, tsTon },
      dex: {
        volumeUsd: Number(dexStats.stats?.volume_usd || 0),
        uniqueWallets: Number(dexStats.stats?.unique_wallets || 0),
        trades: Number(dexStats.stats?.trades || 0),
      },
      quotes: {
        ston: normalizeQuoteResponse(ecosystemQuote, "STON"),
        tston: normalizeQuoteResponse(tstonQuote, "tsTON"),
      },
      reverseQuotes: {
        tston: normalizeQuoteResponse(tstonReverseQuote, "tsTON"),
      },
      derived: {
        stonPerTon: ton.priceUsd && ston.priceUsd ? ton.priceUsd / ston.priceUsd : 0,
        tsTonPremiumPct: ton.priceUsd ? ((tsTon.priceUsd / ton.priceUsd) - 1) * 100 : 0,
      },
    };

    renderMarketSnapshot(marketSnapshot);
  } catch (error) {
    console.error("Failed to load market snapshot", error);
    elements.labSummary.textContent =
      "Official market data failed to load. The swap still works, but the Decision Lab needs a retry.";
    setSimulationStatus("Error");
    elements.tonstakersStatus.textContent = "Error";
    elements.simulationNote.textContent =
      "Could not pull the official quote layer. Retry the live STON.fi request.";
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

elements.quoteSwitches.forEach((button) => {
  button.addEventListener("click", () => setSimulationPair(button.dataset.quotePair));
});

elements.amountPills.forEach((button) => {
  button.addEventListener("click", () => {
    elements.simulationAmount.value = button.dataset.amount;
    refreshSimulation();
  });
});

elements.simulationForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  refreshSimulation();
});

elements.walletForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const address = elements.walletAddress.value.trim();
  if (!address) {
    elements.walletStatus.textContent = "Paste a wallet";
    return;
  }
  analyzeWallet(address);
});

elements.walletApplyRoute?.addEventListener("click", () => {
  if (!lastWalletMode) {
    return;
  }
  activateMode(lastWalletMode, { scrollToSwap: true });
});

window.addEventListener("popstate", () => {
  const mode = readModeFromUrl() || resolveInitialMode();
  activateMode(mode, { updateHistory: false });
});

window.addEventListener("load", () => {
  updateBuilderControls();
  renderBuilderRecommendation();
  activateMode(resolveInitialMode(), { replaceHistory: true });
  setSimulationPair(currentSimulationPair);
  loadMarketSnapshot();
});
