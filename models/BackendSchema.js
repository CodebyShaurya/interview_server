const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  SNo: { type: Number, required: true },
  Question: { type: String, required: true }
});

const BackendSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [questionSchema]
});

const BackendModel = mongoose.model('BackendModel', BackendSchema, 'backend-questions');

module.exports = BackendModel;
