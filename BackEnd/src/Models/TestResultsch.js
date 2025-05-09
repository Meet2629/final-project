// Models/TestResultsch.js
const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  name: { type: String, required: true },
  responses: [String],
  scores: Object,
  topStreams: [String],
});

module.exports = mongoose.model('TestResult', testResultSchema);
