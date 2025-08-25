const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/quizdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// ✅ Schema
const questionSchema = new mongoose.Schema({
  id: String,
  language: String,
  difficulty: String,
  question: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  correctOption: String
});

const Question = mongoose.model('Question', questionSchema);

// ✅ API Routes
app.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.json(questions);
});

app.post('/questions', async (req, res) => {
  const newQ = new Question(req.body);
  await newQ.save();
  res.json(newQ);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
