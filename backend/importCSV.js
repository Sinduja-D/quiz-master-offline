const fs = require("fs");
const csv = require("csv-parser");
const db = require("./database");

fs.createReadStream("questions.csv")
  .pipe(csv())
  .on("data", (row) => {
    db.run(
      `INSERT OR IGNORE INTO questions 
      (id, difficulty, grade, subject, language, question, optionA, optionB, optionC, optionD, correctOption, concept, hint) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        row.id,
        row.level,
        row.standard,
        row.subject,
        row.Language,
        row.question,
        row.option1,
        row.option2,
        row.option3,
        row.option4,
        row["correct option"],
        row.concept,
        row.hint
      ],
      (err) => {
        if (err) console.error("❌ Insert error:", err.message);
      }
    );
  })
  .on("end", () => {
    console.log("✅ CSV file successfully imported into database!");
  });
