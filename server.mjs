import { createReadStream, existsSync, statSync } from "node:fs";
import { readFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "public");
const candidatePorts = [
  Number(process.env.PORT || 0),
  Number(process.env.APP_PORT || 0),
  3000,
  3001,
  8787,
].filter((value, index, array) => Number.isInteger(value) && value > 0 && array.indexOf(value) === index);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
};

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  response.end(JSON.stringify(data, null, 2));
}

function safePathname(urlPathname) {
  const normalized = path.normalize(decodeURIComponent(urlPathname)).replace(/^(\.\.[/\\])+/, "");
  const stripped = normalized.replace(/^[/\\]+/, "");
  return stripped || "index.html";
}

function resolveOrigin(request) {
  const proto = request.headers["x-forwarded-proto"] || "http";
  return `${proto}://${request.headers.host}`;
}

function createManifest(request) {
  const origin = resolveOrigin(request);
  return {
    url: origin,
    name: "TON Compass",
    iconUrl: `${origin}/assets/icon.svg`,
    termsOfUseUrl: `${origin}/#project-notes`,
    privacyPolicyUrl: `${origin}/#project-notes`,
  };
}

const server = http.createServer(async (request, response) => {
  const requestUrl = new URL(request.url || "/", "http://localhost");

  if (requestUrl.pathname === "/health") {
    sendJson(response, 200, { ok: true });
    return;
  }

  if (requestUrl.pathname === "/tonconnect-manifest.json") {
    sendJson(response, 200, createManifest(request));
    return;
  }

  const relativePath = safePathname(requestUrl.pathname);
  const filePath = path.join(publicDir, relativePath);

  if (!filePath.startsWith(publicDir)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Forbidden");
    return;
  }

  let resolvedPath = filePath;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    resolvedPath = path.join(filePath, "index.html");
  }

  if (!existsSync(resolvedPath)) {
    const fallbackPath = path.join(publicDir, "index.html");
    const html = await readFile(fallbackPath, "utf8");
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.end(html);
    return;
  }

  const extension = path.extname(resolvedPath);
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600",
  });
  createReadStream(resolvedPath).pipe(response);
});

function listenOnPort(portIndex = 0) {
  const port = candidatePorts[portIndex];
  if (!port) {
    throw new Error("No free port candidates left.");
  }

  const onError = (error) => {
    cleanup();
    if (error.code === "EADDRINUSE" && portIndex < candidatePorts.length - 1) {
      listenOnPort(portIndex + 1);
      return;
    }
    throw error;
  };

  const onListening = () => {
    cleanup();
    const address = server.address();
    const actualPort = typeof address === "object" && address ? address.port : port;
    console.log(`TON Compass is running at http://localhost:${actualPort}`);
  };

  function cleanup() {
    server.off("error", onError);
    server.off("listening", onListening);
  }

  server.on("error", onError);
  server.on("listening", onListening);
  server.listen(port);
}

listenOnPort();
