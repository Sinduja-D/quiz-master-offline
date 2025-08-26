const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ API to get all questions
app.get("/questions", (req, res) => {
  db.all("SELECT * FROM questions", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// ✅ API to get questions by language
app.get("/questions/:language", (req, res) => {
  const lang = req.params.language;
  db.all("SELECT * FROM questions WHERE language = ?", [lang], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
