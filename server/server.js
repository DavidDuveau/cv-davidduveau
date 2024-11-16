import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, "..", ".env");

dotenv.config({ path: envPath });

const API_KEY = process.env.VITE_MATERIALS_API_KEY;

if (!API_KEY) {
  console.error(
    "❌ Erreur: La clé API VITE_MATERIALS_API_KEY n'est pas définie dans le fichier .env"
  );
  process.exit(1);
}

const app = express();
app.use(cors());

// Configuration du proxy
const materialsProjectProxy = createProxyMiddleware({
  target: "https://api.materialsproject.org",
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    "^/api/materials": "",
  },
  onProxyReq: (proxyReq, req, res) => {
    // Ajouter la clé API
    proxyReq.setHeader("X-API-KEY", API_KEY);

    // Log de la requête pour debug
    console.log("Requête sortante:", {
      method: proxyReq.method,
      path: proxyReq.path,
      headers: {
        ...proxyReq.getHeaders(),
        "X-API-KEY": "[HIDDEN]",
      },
    });
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log de la réponse
    let body = "";
    proxyRes.on("data", (chunk) => (body += chunk));
    proxyRes.on("end", () => {
      try {
        const parsedBody = JSON.parse(body);
        console.log("Réponse reçue:", {
          status: proxyRes.statusCode,
          headers: proxyRes.headers,
          body: parsedBody,
        });
      } catch (e) {
        console.log("Réponse reçue (non-JSON):", {
          status: proxyRes.statusCode,
          headers: proxyRes.headers,
          body,
        });
      }
    });
  },
});

app.use("/api/materials", materialsProjectProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 Serveur proxy démarré:
   - URL: http://localhost:${PORT}
   - Clé API: ${API_KEY ? "✓ configurée" : "✗ manquante"}
   - Chemin .env: ${envPath}
  `);

  // Test immédiat de la configuration
  console.log("Test de la configuration:", {
    nodeEnv: process.env.NODE_ENV,
    apiKeyPresent: !!API_KEY,
    apiKeyLength: API_KEY?.length,
  });
});
