const mongoose = require('mongoose');
const { questions_tamil_beginner } = require('../src/questions_tamil_beginner');

mongoose.connect('mongodb+srv://viji:viji123@cluster0.4lbusty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const QuestionSchema = new mongoose.Schema({}, { strict: false });
const Question = mongoose.model('Question', QuestionSchema);

Question.insertMany(questions_tamil_beginner)
  .then(() => {
    console.log("Data imported!");
    mongoose.connection.close();
  })
  .catch(err => console.log(err));
