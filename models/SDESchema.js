const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  SNo: { type: Number, required: true },
  Question: { type: String, required: true }
});

const SdeSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [questionSchema]
});

const SDEModel = mongoose.model('SDEModel', SdeSchema, 'sde-questions');

module.exports = SDEModel;
