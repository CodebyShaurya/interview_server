const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  SNo: { type: Number, required: true },
  Question: { type: String, required: true }
});

const dbSchema = new mongoose.Schema({
  technology: { type: String, required: true },
  difficulty: { type: String, required: true },
  questions: [questionSchema]
});

const DbModel = mongoose.model('DbModel', dbSchema);

module.exports = DbModel;
