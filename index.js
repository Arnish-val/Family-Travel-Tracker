import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS for development (Vite dev server on port 5173)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// ─── API ROUTES ──────────────────────────────────────────────

// Reset database (truncate tables)
app.post("/api/reset", async (req, res) => {
  try {
    await db.query("TRUNCATE TABLE visited_countries, users RESTART IDENTITY CASCADE;");
    res.json({ success: true, message: "Database reset successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reset database" });
  }
});

// Get all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Get visited countries for a user
app.get("/api/visited/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await db.query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1 ORDER BY id ASC",
      [userId]
    );
    const countries = result.rows.map((row) => row.country_code);
    res.json({ countries, total: countries.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch visited countries" });
  }
});

// Add a visited country
app.post("/api/visited", async (req, res) => {
  const { country, userId } = req.body;

  if (!country || !userId) {
    return res.status(400).json({ error: "country and userId are required" });
  }

  try {
    // Look up country code
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ORDER BY LENGTH(country_name) ASC LIMIT 1",
      [country.toLowerCase()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Country name does not exist, try again." });
    }

    const countryCode = result.rows[0].country_code;

    try {
      await db.query(
        "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
        [countryCode, userId]
      );
      res.json({ success: true, countryCode });
    } catch (err) {
      console.error(err);
      res.status(409).json({ error: "Country has already been added, try again." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create a new user
app.post("/api/users", async (req, res) => {
  const { name, color } = req.body;

  if (!name || !color) {
    return res.status(400).json({ error: "name and color are required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO users (name, color) VALUES($1, $2) RETURNING *",
      [name, color]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// ─── SERVE REACT BUILD IN PRODUCTION ─────────────────────────

const frontendDist = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDist));
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(frontendDist, "index.html"));
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
