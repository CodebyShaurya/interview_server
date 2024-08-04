const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  SNo: { type: Number, required: true },
  Question: { type: String, required: true }
});

const FrontendSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [questionSchema]
});

const FrontendModel = mongoose.model('FrontendModel', FrontendSchema, 'frontend-questions');

module.exports = FrontendModel;
