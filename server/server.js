import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

if (!process.env.VITE_MATERIALS_API_KEY) {
  console.error(
    "❌ Erreur: La clé API VITE_MATERIALS_API_KEY n'est pas définie dans le fichier .env"
  );
  process.exit(1);
}

const app = express();

// Configuration CORS
app.use(cors());

// Middleware de logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`📥 ${timestamp} - ${req.method} ${req.url}`);
  console.log("Query params:", req.query);
  next();
});

// Configuration du proxy
const materialsProjectProxy = createProxyMiddleware({
  target: "https://api.materialsproject.org/v2",
  changeOrigin: true,
  pathRewrite: {
    "^/api/materials": "",
  },
  onProxyReq: (proxyReq, req) => {
    // Ajout de la clé API
    proxyReq.setHeader("X-API-KEY", process.env.VITE_MATERIALS_API_KEY);
    proxyReq.setHeader("Accept", "application/json");

    console.log("📤 Requête sortante:", {
      method: proxyReq.method,
      path: proxyReq.path,
      headers: {
        ...proxyReq.getHeaders(),
        "X-API-KEY": "***",
      },
    });
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log("📨 Réponse reçue:", {
      statusCode: proxyRes.statusCode,
      statusMessage: proxyRes.statusMessage,
    });
  },
  onError: (err, req, res) => {
    console.error("❌ Erreur proxy:", err);
    res.status(500).json({
      error: true,
      message: "Erreur lors de la connexion à l'API Materials Project",
      details: err.message,
    });
  },
});

// Application du proxy
app.use("/api/materials", materialsProjectProxy);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
🚀 Serveur proxy démarré:
   - URL: http://localhost:${PORT}
   - Env: ${process.env.NODE_ENV}
   - Clé API: ${
     process.env.VITE_MATERIALS_API_KEY ? "✓ configurée" : "✗ manquante"
   }
  `);
});
