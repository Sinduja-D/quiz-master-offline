const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "quiz.db");
const db = new sqlite3.Database(dbPath);

// Clear all questions
db.run("DELETE FROM questions", (err) => {
  if (err) {
    console.error("Error clearing questions:", err);
    return;
  }
  
  console.log("Successfully cleared all questions from database");
  
  // Reset the auto-increment counter
  db.run("DELETE FROM sqlite_sequence WHERE name='questions'", (err) => {
    if (err) {
      console.error("Error resetting sequence:", err);
    } else {
      console.log("Reset auto-increment counter");
    }
    db.close();
  });
});