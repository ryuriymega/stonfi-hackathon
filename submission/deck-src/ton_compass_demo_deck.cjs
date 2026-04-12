const pptxgen = require("pptxgenjs");
const path = require("path");
const { imageSizingContain } = require("./pptxgenjs_helpers/image");
const { safeOuterShadow } = require("./pptxgenjs_helpers/util");
const { svgToDataUri } = require("./pptxgenjs_helpers/svg");
const {
  warnIfSlideHasOverlaps,
  warnIfSlideElementsOutOfBounds,
} = require("./pptxgenjs_helpers/layout");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "OpenAI Codex";
pptx.company = "TON Compass";
pptx.subject = "TON Compass demo deck";
pptx.title = "TON Compass";
pptx.lang = "en-US";
pptx.theme = {
  headFontFace: "Liberation Sans",
  bodyFontFace: "Liberation Sans",
  lang: "en-US",
};

const COLORS = {
  bg: "F4EFE6",
  paper: "FFF9F1",
  ink: "121720",
  softInk: "556072",
  blue: "2B7FFF",
  lime: "D8FF6B",
  ember: "FF8B61",
  charcoal: "1A1F2B",
  panel: "2A3141",
  white: "FFFFFF",
};

const screenshotPath = path.join(__dirname, "assets", "ton-compass-ui.png");

function addBrandMark(slide, x, y) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#2B7FFF" />
          <stop offset="100%" stop-color="#163D80" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="68" height="68" rx="20" fill="url(#g)" />
      <text x="36" y="43" font-family="Liberation Sans" font-size="24" font-weight="700" fill="#FFFFFF" text-anchor="middle">TC</text>
    </svg>
  `;
  slide.addImage({ data: svgToDataUri(svg), x, y, w: 0.55, h: 0.55 });
}

function addFooter(slide, text = "TON Compass") {
  slide.addText(text, {
    x: 0.6,
    y: 6.75,
    w: 4.5,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 10,
    color: COLORS.softInk,
    margin: 0,
  });
}

function addTitle(slide, kicker, title, body, options = {}) {
  const titleY = (options.y ?? 0.7) + 0.3;
  const titleH = options.titleH ?? 0.85;
  const bodyY = titleY + titleH + (options.bodyGap ?? 0.16);
  slide.addText(kicker, {
    x: options.x ?? 0.8,
    y: options.y ?? 0.7,
    w: options.w ?? 3.6,
    h: 0.24,
    fontFace: "Liberation Sans",
    fontSize: 10,
    bold: true,
    color: COLORS.softInk,
    characterSpacing: 1.8,
    margin: 0,
  });
  slide.addText(title, {
    x: options.x ?? 0.8,
    y: titleY,
    w: options.titleW ?? 5.8,
    h: titleH,
    fontFace: "Liberation Sans",
    fontSize: options.fontSize ?? 24,
    bold: true,
    color: COLORS.ink,
    margin: 0,
    valign: "top",
  });
  slide.addText(body, {
    x: options.x ?? 0.8,
    y: bodyY,
    w: options.bodyW ?? 5.3,
    h: options.bodyH ?? 0.7,
    fontFace: "Liberation Sans",
    fontSize: 12,
    color: COLORS.softInk,
    margin: 0,
    breakLine: false,
    valign: "top",
  });
}

function addCard(slide, x, y, w, h, title, body, accent = COLORS.paper) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.12,
    fill: { color: accent },
    line: { color: "E7DFD2", pt: 1 },
    shadow: safeOuterShadow("000000", 0.12, 45, 2, 1),
  });
  slide.addText(title, {
    x: x + 0.18,
    y: y + 0.16,
    w: w - 0.36,
    h: 0.26,
    fontFace: "Liberation Sans",
    fontSize: 12,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText(body, {
    x: x + 0.18,
    y: y + 0.48,
    w: w - 0.36,
    h: h - 0.58,
    fontFace: "Liberation Sans",
    fontSize: 10.5,
    color: COLORS.softInk,
    margin: 0,
    valign: "top",
  });
}

function finalizeSlide(slide) {
  warnIfSlideHasOverlaps(slide, pptx);
  warnIfSlideElementsOutOfBounds(slide, pptx);
}

// Slide 1
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  addBrandMark(slide, 0.55, 0.45);
  addTitle(
    slide,
    "STON.fi VIBE CODING HACKATHON",
    "TON Compass",
    "A guided first-move app for TON DeFi built on top of the official STON.fi execution and data layer.",
    { x: 1.25, y: 0.55, fontSize: 28, titleW: 4.55, bodyW: 4.2, bodyH: 0.42 }
  );

  slide.addText("First TON move. Routed for humans.", {
    x: 0.8,
    y: 2.55,
    w: 4.8,
    h: 0.4,
    fontFace: "Liberation Sans",
    fontSize: 27,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });

  slide.addText(
    "Journey Builder, live quote checks, wallet-aware hints, official STON.fi execution, and a Tonstakers-ready continuation.",
    {
      x: 0.8,
      y: 4.08,
      w: 4.8,
      h: 0.24,
      fontFace: "Liberation Sans",
      fontSize: 11.5,
      color: COLORS.softInk,
      margin: 0,
    }
  );

  addCard(slide, 0.8, 4.48, 1.4, 1.1, "Live layer", "Official STON.fi widget", "FFFFFF");
  addCard(slide, 2.35, 4.48, 1.4, 1.1, "Decision", "Live quote + wallet hints", "FFFFFF");
  addCard(slide, 3.9, 4.48, 1.4, 1.1, "After", "Tonstakers + Telegram", "FFFFFF");

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.1,
    y: 0.65,
    w: 6.0,
    h: 5.9,
    rectRadius: 0.16,
    fill: { color: COLORS.charcoal },
    line: { color: COLORS.panel, pt: 1.2 },
    shadow: safeOuterShadow("000000", 0.18, 45, 3, 1.5),
  });
  slide.addImage({
    path: screenshotPath,
    ...imageSizingContain(screenshotPath, 6.35, 0.95, 5.5, 5.3),
  });

  addFooter(slide, "TON Compass | Guided route + live decision layer");
  finalizeSlide(slide);
}

// Slide 2
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  addTitle(
    slide,
    "PROBLEM",
    "First-time TON users see too much too early.",
    "Wallet connection, gas, slippage, token choice, and swap execution often appear all at once. That is a poor first interaction for a user who just wants one clear starting point.",
    { x: 0.8, y: 0.65, titleW: 5.7, bodyW: 5.4, fontSize: 24, bodyH: 0.62 }
  );

  addCard(slide, 0.8, 3.05, 2.3, 1.45, "Raw DEX surface", "High choice density before the user has context.", "FFF6EF");
  addCard(slide, 3.3, 3.05, 2.3, 1.45, "Trust problem", "The user sees a wallet action before they feel ready.", "FFF6EF");
  addCard(slide, 5.8, 3.05, 2.3, 1.45, "Drop-off risk", "If the first step feels noisy, the journey ends early.", "FFF6EF");

  slide.addShape(pptx.ShapeType.line, {
    x: 1.9,
    y: 4.95,
    w: 7.9,
    h: 0,
    line: { color: "D7CFC2", pt: 1.25 },
  });

  slide.addText("TON Compass response", {
    x: 0.8,
    y: 5.18,
    w: 2.2,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 10,
    bold: true,
    color: COLORS.softInk,
    margin: 0,
    characterSpacing: 1.8,
  });

  slide.addText("Recommend the right route", {
    x: 0.8,
    y: 5.55,
    w: 2.4,
    h: 0.3,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("Slow the user down with readiness checks", {
    x: 4.0,
    y: 5.55,
    w: 3.4,
    h: 0.3,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });
  slide.addText("Keep execution real via STON.fi", {
    x: 8.1,
    y: 5.55,
    w: 3.0,
    h: 0.3,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    margin: 0,
  });

  addFooter(slide, "Problem -> product response");
  finalizeSlide(slide);
}

// Slide 3
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  addTitle(
    slide,
    "PRODUCT FLOW",
    "A small app with a real onboarding sequence.",
    "The product adds just enough structure around the official widget and public data layer to feel like a real TON journey rather than a one-screen embed.",
    { x: 0.8, y: 0.65, titleW: 5.5, bodyW: 5.4, fontSize: 24, bodyH: 0.62 }
  );

  const blocks = [
    {
      x: 0.8,
      title: "1. Journey Builder",
      body: "Maps user goal, confidence, and TON balance into the recommended first route.",
      fill: "FFFFFF",
    },
    {
      x: 3.75,
      title: "2. Readiness preflight",
      body: "Creates a deliberate pause before wallet connection so the first swap is legible.",
      fill: "FFFFFF",
    },
    {
      x: 6.7,
      title: "3. Decision Lab",
      body: "Pulls live STON.fi route simulation and wallet-aware hints from official public endpoints.",
      fill: "FFFFFF",
    },
    {
      x: 9.65,
      title: "4. Continuation",
      body: "The real swap stays in STON.fi, then Tonstakers and Telegram keep the journey alive.",
      fill: "FFFFFF",
    },
  ];

  blocks.forEach((block, index) => {
    addCard(slide, block.x, 3.0, 2.45, 2.0, block.title, block.body, block.fill);
    if (index < blocks.length - 1) {
      slide.addShape(pptx.ShapeType.chevron, {
        x: block.x + 2.53,
        y: 3.78,
        w: 0.26,
        h: 0.5,
        fill: { color: COLORS.blue },
        line: { color: COLORS.blue, pt: 0.6 },
      });
    }
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8,
    y: 5.45,
    w: 11.0,
    h: 1.2,
    rectRadius: 0.08,
    fill: { color: COLORS.charcoal },
    line: { color: COLORS.panel, pt: 1 },
  });
  slide.addText(
    "Result: a beginner can move from uncertainty -> guided choice -> live quote -> real swap -> TON-native continuation without ever leaving a coherent product surface.",
    {
      x: 1.0,
    y: 5.77,
      w: 10.5,
      h: 0.45,
      fontFace: "Liberation Sans",
      fontSize: 16,
      bold: true,
      color: COLORS.white,
      margin: 0,
      align: "center",
    }
  );

  addFooter(slide, "Journey Builder -> Readiness -> Decision Lab -> Continuation");
  finalizeSlide(slide);
}

// Slide 4
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.bg };
  addTitle(
    slide,
    "WHY THIS HAS A SHOT",
    "Fast enough to ship. Product-shaped enough to stand out.",
    "The app is small, but it already solves a specific TON onboarding problem with a real integration and a credible growth path.",
    { x: 0.8, y: 0.65, titleW: 6.0, bodyW: 5.8, fontSize: 24, bodyH: 0.62 }
  );

  addCard(slide, 0.8, 3.0, 3.45, 1.7, "Real integration", "Execution goes through the official STON.fi widget and live protocol quotes come from official public STON.fi endpoints.", "FFFFFF");
  addCard(slide, 4.55, 3.0, 3.45, 1.7, "Real product logic", "Route recommendation, readiness gating, live quote checks, and wallet-aware hints create a reusable onboarding system.", "FFFFFF");
  addCard(slide, 8.3, 3.0, 3.45, 1.7, "Real continuation", "Tonstakers plus Telegram continuity show how this can expand into a broader TON journey instead of stopping at swap.", "FFFFFF");

  slide.addText("What reviewers can see immediately", {
    x: 0.8,
    y: 5.0,
    w: 3.0,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 10,
    bold: true,
    color: COLORS.softInk,
    margin: 0,
    characterSpacing: 1.8,
  });

  const bullets = [
    "There is a live public URL",
    "There is a public GitHub repo",
    "The app already supports a real user journey plus a live decision layer",
    "The scope is still realistic for a hackathon build",
  ];
  slide.addText(
    bullets.map((text) => ({ text, options: { bullet: { indent: 12 } } })),
    {
      x: 0.9,
      y: 5.3,
      w: 4.8,
      h: 1.1,
      fontFace: "Liberation Sans",
      fontSize: 15,
      color: COLORS.ink,
      margin: 0,
      breakLine: true,
    }
  );

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.6,
    y: 5.05,
    w: 5.15,
    h: 1.25,
    rectRadius: 0.1,
    fill: { color: COLORS.lime },
    line: { color: COLORS.lime, pt: 1 },
  });
  slide.addText("TON Compass is not a swap clone. It is an onboarding and decision product on top of STON.fi.", {
    x: 6.95,
    y: 5.42,
    w: 4.45,
    h: 0.6,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.ink,
    align: "center",
    valign: "mid",
    margin: 0,
  });

  addFooter(slide, "Strong live demo + clear product logic");
  finalizeSlide(slide);
}

// Slide 5
{
  const slide = pptx.addSlide();
  slide.background = { color: COLORS.charcoal };
  addBrandMark(slide, 0.65, 0.55);
  slide.addText("TON Compass", {
    x: 1.38,
    y: 0.6,
    w: 2.2,
    h: 0.35,
    fontFace: "Liberation Sans",
    fontSize: 24,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });

  slide.addText("Live links", {
    x: 0.8,
    y: 1.55,
    w: 2.0,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 10,
    bold: true,
    color: "B7C1D1",
    margin: 0,
    characterSpacing: 1.8,
  });

  slide.addText("Live demo", {
    x: 0.8,
    y: 2.0,
    w: 1.6,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
  slide.addText("Open live web app", {
    x: 0.8,
    y: 2.35,
    w: 3.0,
    h: 0.3,
    fontFace: "Liberation Sans",
    fontSize: 15,
    bold: true,
    color: COLORS.lime,
    margin: 0,
    hyperlink: { url: "https://forlearningandcerts.sellsystems.agency:49184/ton-compass/index.html" },
  });
  slide.addText("forlearningandcerts.sellsystems.agency:49184/ton-compass", {
    x: 0.8,
    y: 2.68,
    w: 5.2,
    h: 0.28,
    fontFace: "Liberation Sans",
    fontSize: 11.5,
    color: "B7C1D1",
    margin: 0,
  });

  slide.addText("GitHub", {
    x: 0.8,
    y: 3.1,
    w: 1.6,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 16,
    bold: true,
    color: COLORS.white,
    margin: 0,
  });
  slide.addText("Open GitHub repository", {
    x: 0.8,
    y: 3.45,
    w: 3.2,
    h: 0.3,
    fontFace: "Liberation Sans",
    fontSize: 15,
    bold: true,
    color: COLORS.lime,
    margin: 0,
    hyperlink: { url: "https://github.com/ryuriymega/stonfi-hackathon" },
  });
  slide.addText("github.com/ryuriymega/stonfi-hackathon", {
    x: 0.8,
    y: 3.78,
    w: 4.4,
    h: 0.28,
    fontFace: "Liberation Sans",
    fontSize: 11.5,
    color: "B7C1D1",
    margin: 0,
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.45,
    y: 1.35,
    w: 3.95,
    h: 3.6,
    rectRadius: 0.14,
    fill: { color: "30384B" },
    line: { color: "44506A", pt: 1 },
  });
  slide.addText("60-second pitch", {
    x: 7.55,
    y: 1.7,
    w: 2.4,
    h: 0.25,
    fontFace: "Liberation Sans",
    fontSize: 10,
    bold: true,
    color: "B7C1D1",
    margin: 0,
    characterSpacing: 1.8,
  });
  slide.addText(
    "TON Compass is a guided first-move app for TON DeFi. It recommends the right route, adds a readiness layer before wallet connection, checks the route with live STON.fi data, executes through the official STON.fi widget, and then offers a Tonstakers-ready continuation path.",
    {
      x: 7.55,
      y: 2.05,
    w: 3.2,
      h: 1.35,
      fontFace: "Liberation Sans",
      fontSize: 15,
      color: COLORS.white,
      margin: 0,
      valign: "top",
    }
  );
  slide.addText(
    "That makes it feel like the start of a TON journey, not just another swap clone or widget wrapper.",
    {
      x: 7.55,
      y: 3.55,
    w: 3.2,
      h: 0.8,
      fontFace: "Liberation Sans",
      fontSize: 15,
      bold: true,
      color: COLORS.lime,
      margin: 0,
    }
  );

  finalizeSlide(slide);
}

async function main() {
  await pptx.writeFile({
    fileName: path.join(__dirname, "..", "TON_Compass_Demo_Deck.pptx"),
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
