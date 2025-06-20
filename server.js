#!/usr/bin/env node

import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 8069;
const host = process.env.HOST || "localhost";
const distPath = join(__dirname, "dist");

// MIME types
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".eot": "application/vnd.ms-fontobject",
};

async function serveFile(filePath, res) {
  try {
    const data = await readFile(filePath);
    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control":
        ext === ".html" ? "no-cache" : "public, max-age=31536000",
    });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

async function fileExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

const server = createServer(async (req, res) => {
  let pathname = req.url.split("?")[0];

  // Remove leading slash and decode URI
  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  // Default to index.html for root
  if (pathname === "") {
    pathname = "index.html";
  }

  let filePath = join(distPath, pathname);

  // Check if file exists
  if (await fileExists(filePath)) {
    await serveFile(filePath, res);
  } else {
    // SPA fallback - serve index.html for any non-existent routes
    const indexPath = join(distPath, "index.html");
    if (await fileExists(indexPath)) {
      await serveFile(indexPath, res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  }
});

server.listen(port, host, () => {
  console.log(`✅ Server running at http://${host}:${port}`);
  console.log(`📁 Serving files from: ${distPath}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("🛑 Received SIGTERM, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🛑 Received SIGINT, shutting down gracefully");
  server.close(() => {
    console.log("✅ Server closed");
    process.exit(0);
  });
});
