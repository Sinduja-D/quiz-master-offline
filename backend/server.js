const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to SQLite
const dbPath = path.join(__dirname, "quiz.db");
console.log("Database path:", dbPath);

const db = new sqlite3.Database(
  dbPath,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error("❌ Could not connect to database:", err.message);
    } else {
      console.log("✅ Connected to SQLite database.");
      // Create table if not exists
      db.run(
        `CREATE TABLE IF NOT EXISTS questions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          difficulty TEXT,
          grade INTEGER,
          subject TEXT,
          language TEXT,
          question TEXT,
          optionA TEXT,
          optionB TEXT,
          optionC TEXT,
          optionD TEXT,
          correctOption TEXT,
          concept TEXT,
          hint TEXT
        )`,
        (err) => {
          if (err) {
            console.error("❌ Error creating table:", err.message);
          } else {
            console.log("✅ Table 'questions' created or already exists.");
          }
        }
      );
    }
  }
);

// Root route
app.get("/", (req, res) => {
  res.send("Quiz API is running. Use /api/questions to fetch questions.");
});

// API to fetch questions
app.get("/api/questions", (req, res) => {
  const { difficulty, grade, subject, language, limit } = req.query;
  let sql = "SELECT * FROM questions WHERE 1=1";
  const params = [];

  if (difficulty) {
    sql += " AND difficulty = ?";
    params.push(difficulty);
  }
  if (grade) {
    sql += " AND grade = ?";
    params.push(grade);
  }
  if (subject) {
    sql += " AND subject = ?";
    params.push(subject);
  }
  if (language) {
    sql += " AND language = ?";
    params.push(language);
  }
    sql += " ORDER BY RANDOM()";

  if (limit) {
    sql += " LIMIT ?";
    params.push(parseInt(limit));
  }

  console.log("📥 SQL Query:", sql, params);

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("❌ Error fetching questions:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on http://localhost:${PORT}');
});