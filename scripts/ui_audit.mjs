import fs from "node:fs/promises";
import path from "node:path";
import { chromium, devices } from "playwright";

const targetUrl = process.argv[2] || "http://127.0.0.1:3000/";
const outputDir = path.resolve("output/playwright");

const viewports = [
  { name: "desktop", viewport: { width: 1366, height: 900 } },
  { name: "wide", viewport: { width: 1920, height: 1080 } },
  { name: "tablet", viewport: { width: 834, height: 1194 } },
  { name: "mobile", ...devices["iPhone 12"] },
  { name: "narrow", viewport: { width: 320, height: 568 }, userAgent: "Mozilla/5.0" },
];

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox"],
});

await fs.mkdir(outputDir, { recursive: true });

const results = [];

for (const config of viewports) {
  const context = await browser.newContext(
    config.viewport ? { viewport: config.viewport, userAgent: config.userAgent } : { ...config },
  );
  const page = await context.newPage();
  await page.goto(targetUrl, { waitUntil: "networkidle" });

  const prefix = path.join(outputDir, `audit-${config.name}`);
  await page.screenshot({ path: `${prefix}.png`, fullPage: true });

  const metrics = await page.evaluate(() => {
    const full = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return {
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
      };
    };

    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return {
        top: Math.round(box.top),
        left: Math.round(box.left),
        width: Math.round(box.width),
        height: Math.round(box.height),
      };
    };

    const focusables = [
      ...document.querySelectorAll(
        "a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex='-1'])",
      ),
    ]
      .slice(0, 24)
      .map((element) => ({
        text: (element.innerText || element.getAttribute("aria-label") || element.getAttribute("placeholder") || element.tagName)
          .trim()
          .replace(/\s+/g, " ")
          .slice(0, 80),
        top: Math.round(element.getBoundingClientRect().top + window.scrollY),
        height: Math.round(element.getBoundingClientRect().height),
      }));

    return {
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      document: {
        scrollHeight: document.documentElement.scrollHeight,
        scrollWidth: document.documentElement.scrollWidth,
      },
      sections: {
        planner: full("#planner"),
        swap: full("#swap-panel"),
        readiness: full(".readiness-card"),
        support: full(".after-route-card"),
        decisionLab: full("#project-notes"),
      },
      firstViewport: {
        routeRail: rect(".route-rail"),
        signalStrip: rect(".signal-strip"),
        widgetShell: rect(".widget-shell"),
      },
      focusables,
    };
  });

  results.push({ name: config.name, metrics });
  await context.close();
}

await browser.close();

await fs.writeFile(
  path.join(outputDir, "ui-audit.json"),
  `${JSON.stringify({ targetUrl, generatedAt: new Date().toISOString(), results }, null, 2)}\n`,
);

console.log(JSON.stringify(results, null, 2));
