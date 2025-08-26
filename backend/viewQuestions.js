const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your database
const dbPath = path.join(__dirname, 'quiz.db');

// Open the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error("Failed to open DB:", err.message);
    console.log("Connected to the database.");
});

// Query first 5 rows from questions table
db.all("SELECT * FROM questions LIMIT 5", (err, rows) => {
    if (err) return console.error("Error fetching data:", err.message);

    console.log("First 5 questions:");
    rows.forEach((row, index) => {
        console.log(`${index + 1}:`, row);
    });
});

// Close the database
db.close((err) => {
    if (err) console.error(err.message);
    else console.log("Database connection closed.");
});
