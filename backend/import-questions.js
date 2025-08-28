const sqlite3 = require("sqlite3").verbose();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "quiz.db");
const db = new sqlite3.Database(dbPath);

console.log("Starting import process...");

// Check if CSV file exists
const csvPath = path.join(__dirname, "all-questions-cleaned.csv");
if (!fs.existsSync(csvPath)) {
  console.error("❌ CSV file not found:", csvPath);
  process.exit(1);
}

console.log("✅ CSV file found");

// Clear existing questions
db.run("DELETE FROM questions", (err) => {
  if (err) {
    console.error("Error clearing questions:", err);
    return;
  }
  
  console.log("✅ Cleared existing questions");
  
  // Read and parse the CSV
  const results = [];
  
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      console.log(`✅ Read ${results.length} rows from CSV`);
      
      if (results.length === 0) {
        console.error("❌ No data found in CSV file");
        db.close();
        return;
      }
      
      // Show first row for debugging
      console.log("First row:", JSON.stringify(results[0], null, 2));
      
      let imported = 0;
      let errors = 0;
      
      // Process each row
      results.forEach((row, index) => {
        // Validate required fields
        if (!row.difficulty || !row.grade || !row.subject || !row.language || !row.question) {
          console.error(`❌ Row ${index + 1} missing required fields:`, row);
          errors++;
          return;
        }
        
        // Insert into database
        db.run(
          `INSERT INTO questions (
            difficulty, grade, subject, language, question, 
            optionA, optionB, optionC, optionD, correctOption, concept, hint
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            row.difficulty,
            parseInt(row.grade),
            row.subject,
            row.language,
            row.question,
            row.optionA || "",
            row.optionB || "",
            row.optionC || "",
            row.optionD || "",
            row.correctOption || "",
            row.concept || null,
            row.hint || null
          ],
          (err) => {
            if (err) {
              console.error(`❌ Error importing row ${index + 1}:`, err.message);
              errors++;
            } else {
              imported++;
              
              // Show progress for every 100 rows
              if (imported % 100 === 0) {
                console.log(`📊 Imported ${imported} rows...`);
              }
            }
            
            // When all rows are processed
            if (imported + errors === results.length) {
              console.log(`\n🎉 Import complete!`);
              console.log(`✅ Successfully imported: ${imported} rows`);
              console.log(`❌ Errors: ${errors} rows`);
              
              // Verify import
              db.get("SELECT COUNT(*) as count FROM questions", (err, row) => {
                if (err) {
                  console.error("Error verifying count:", err);
                } else {
                  console.log(`📊 Total questions in database: ${row.count}`);
                }
                db.close();
              });
            }
          }
        );
      });
    })
    .on('error', (error) => {
      console.error("❌ Error reading CSV:", error);
      db.close();
    });
});