import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to database using secure environment variables
const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET home page
app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT country_code FROM visited_countries");
    let countries = [];
    result.rows.forEach((country) => {
      countries.push(country.country_code);
    });
    console.log(result.rows);
    res.render("index.ejs", { countries: countries, total: countries.length });
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res.status(500).send("Database connection error. Make sure your local Database is running.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
