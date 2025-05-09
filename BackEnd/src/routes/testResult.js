// routes/testResult.routes.js
const express = require('express');
const router = express.Router();
const TestResult = require('../Models/TestResultsch'); // Ensure this model file exists

router.post('/submit', async (req, res) => {
  try {
    const { name, responses, scores } = req.body;

    const maxScore = Math.max(...Object.values(scores));
    const topStreams = Object.keys(scores).filter(
      (stream) => scores[stream] === maxScore
    );

    const newResult = new TestResult({ name, responses, scores, topStreams });
    await newResult.save();

    res.status(201).json({ message: 'Result saved', topStreams });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ error: 'Failed to save result' });
  }
});

module.exports = router;
