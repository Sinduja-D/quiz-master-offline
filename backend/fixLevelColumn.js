const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Path to your database
const dbPath = path.join(__dirname, 'quiz.db'); // adjust if your script is in another folder

// Open database
let db = new sqlite3.Database(dbPath, (err) => {
    if (err) return console.error("Failed to open DB:", err.message);
    console.log("Connected to the database.");
});

// Check if 'level' column exists
db.all("PRAGMA table_info(questions);", (err, rows) => {
    if (err) return console.error("Error checking table:", err.message);

    const hasLevel = rows.some(row => row.name === 'level');

    if (hasLevel) {
        console.log("'level' column already exists ✅");
    } else {
        // Add 'level' column
        db.run("ALTER TABLE questions ADD COLUMN level TEXT;", (err) => {
            if (err) return console.error("Error adding column:", err.message);
            console.log("'level' column added successfully ✅");
        });
    }
});

// Close the database
db.close((err) => {
    if (err) console.error(err.message);
    else console.log("Database connection closed.");
});
