// scripts/init-db.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

// Create a database connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: process.env.DB_MULTIPLESTATEMENTS === "true",
});
//IIFE Immediately Invoked Function Expressions
(async () => {
  try {
    // Test connection
    const conn = await db.getConnection();
    console.log("Connexion à MySQL réussie");
    conn.release();
    
    // Lecture du contenu SQL depuis le dossier sql/init.sql
    const sqlPath = path.join(__dirname, "../sql/init.sql");
    const initSQL = fs.readFileSync(sqlPath, "utf8");

    // Exécution des requêtes SQL
    await db.query(initSQL);

    console.log("Base de données initialisée correctement");
  } catch (err) {
    console.error("Erreur lors de l'initialisation :", err.message);
  } finally {
    // Ferme proprement le pool de connexions
    await db.end();
  }
})();