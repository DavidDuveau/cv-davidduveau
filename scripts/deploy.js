import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ghpages from "gh-pages";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Copie index.html vers 404.html
fs.copyFileSync(
  path.join(__dirname, "../dist/index.html"),
  path.join(__dirname, "../dist/404.html")
);

// Crée le fichier .nojekyll
fs.writeFileSync(path.join(__dirname, "../dist/.nojekyll"), "");

// Déploie sur gh-pages
ghpages.publish("dist", function (err) {
  if (err) {
    console.error("Erreur lors du déploiement:", err);
    process.exit(1);
  } else {
    console.log("Déploiement réussi!");
  }
});
