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

// Middleware de debugging pour voir les headers entrants
app.use((req, res, next) => {
  console.log("🔍 Headers entrants:", req.headers);
  next();
});

// Configuration du proxy
const materialsProjectProxy = createProxyMiddleware({
  target: "https://api.materialsproject.org",
  changeOrigin: true,
  secure: true,
  pathRewrite: {
    "^/api/materials": "",
  },
  headers: {
    "X-API-KEY": API_KEY, // On ajoute la clé ici aussi
  },
  onProxyReq: (proxyReq, req, res) => {
    // On force le header X-API-KEY
    proxyReq.setHeader("X-API-KEY", API_KEY);
    // On vérifie que la clé est bien présente
    const headers = proxyReq.getHeaders();
    console.log("🔑 Headers de la requête avant envoi:", {
      "x-api-key": headers["x-api-key"] ? "✓ présente" : "✗ manquante",
      "X-API-KEY": headers["X-API-KEY"] ? "✓ présente" : "✗ manquante",
    });

    // On force les deux versions du header (minuscules et majuscules)
    proxyReq.setHeader("x-api-key", API_KEY);
    proxyReq.setHeader("X-API-KEY", API_KEY);

    // Log complet pour debug
    console.log("📤 Requête sortante complète:", {
      url: proxyReq.path,
      method: proxyReq.method,
      headers: {
        ...proxyReq.getHeaders(),
        "x-api-key": "[HIDDEN]",
        "X-API-KEY": "[HIDDEN]",
      },
    });
  },
  onProxyRes: (proxyRes, req, res) => {
    // Log de la réponse pour debug
    console.log("📥 Status de la réponse:", proxyRes.statusCode);
    console.log("📥 Headers de la réponse:", proxyRes.headers);

    let rawData = "";
    proxyRes.on("data", (chunk) => {
      rawData += chunk;
    });
    proxyRes.on("end", () => {
      try {
        const data = JSON.parse(rawData);
        console.log("📥 Corps de la réponse:", data);
      } catch (e) {
        console.log("📥 Corps de la réponse (non-JSON):", rawData);
      }
    });
  },
});

// Middleware pour s'assurer que la clé API est présente avant le proxy
app.use(
  "/api/materials",
  (req, res, next) => {
    // Force l'ajout de la clé API dans les headers
    req.headers["x-api-key"] = API_KEY;
    req.headers["X-API-KEY"] = API_KEY;
    next();
  },
  materialsProjectProxy
);

const PORT = process.env.PORT || 3000;

// Test immédiat de la clé API
const testAPIKey = async () => {
  try {
    const response = await fetch(
      "https://api.materialsproject.org/materials/core/?elements=Fe",
      {
        headers: {
          "X-API-KEY": API_KEY,
          Accept: "application/json",
        },
      }
    );
    console.log(
      "🔑 Test direct de la clé API:",
      response.status === 200 ? "✓ valide" : "✗ invalide"
    );
  } catch (error) {
    console.error("❌ Erreur lors du test de la clé API:", error);
  }
};

app.listen(PORT, () => {
  console.log(`
🚀 Serveur proxy démarré:
   - URL: http://localhost:${PORT}
   - Clé API: ${
     API_KEY ? `✓ configurée (${API_KEY.substring(0, 4)}...)` : "✗ manquante"
   }
   - Chemin .env: ${envPath}
  `);

  testAPIKey();
});
