const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./quiz.db", (err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY,
  difficulty TEXT,
  grade TEXT,
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
)`);

module.exports = db;
