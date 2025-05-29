// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Specify the path to the .env file
dotenv.config({ path: path.join(__dirname, "../../../.env") });

// Création du pool de connexions MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS === "true",
});

// Test de la connexion au démarrage
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("Connexion à MySQL réussie");
    conn.release();
  } catch (err) {
    console.error("Erreur de connexion à MySQL :", err.message);
  }
})();

export default db;
