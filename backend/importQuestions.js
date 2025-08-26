const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const csv = require('csv-parser');

const db = new sqlite3.Database(path.join(__dirname, 'quiz.db'));

// Path to your CSV
const csvFile = path.join(__dirname, 'all_questions.csv');

db.serialize(() => {
    const insertStmt = db.prepare(`
        INSERT INTO questions 
        (id, level, grade, subject, language, question, optionA, optionB, optionC, optionD, correctOption, concept, hint)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    fs.createReadStream(csvFile)
        .pipe(csv())
        .on('data', (row) => {
            // Map CSV headers to DB columns
            insertStmt.run(
                row.id,
                // Normalize level
                row.level === 'beg' ? 'beginner' :
                row.level === 'int' ? 'intermediate' :
                row.level === 'adv' ? 'advanced' : row.level,
                row.standard,       // CSV 'standard' → DB 'grade'
                row.subject,
                row.Language.toLowerCase(), // ensure lowercase
                row.question,
                row.option1,
                row.option2,
                row.option3,
                row.option4,
                row['correct option'], // handle space in header
                row.concept,
                row.hint,
                (err) => {
                    if (err) console.error('Insert error:', err.message);
                }
            );
        })
        .on('end', () => {
            console.log('CSV file successfully imported!');
            insertStmt.finalize();
            db.close();
        });
});