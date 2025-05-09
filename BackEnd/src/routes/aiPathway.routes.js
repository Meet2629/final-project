const express = require('express');
const router = express.Router();
const TestResult = require('../Models/TestResultsch');
const generateContent = require('../services/ai.service'); // uses Gemini

// Main route: generates initial career roadmap
router.get('/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const result = await TestResult.findOne({ name }).sort({ createdAt: -1 });
    if (!result) {
      return res.status(404).json({ message: 'Result not found for this user' });
    }

    const prompt = `
      🎓 Student Name: ${result.name}
      📊 Scores: ${JSON.stringify(result.scores)}
      🏆 Top Streams: ${result.topStreams.join(', ')}

      Based on this result, generate a personalized career roadmap starting from high school level.
      Suggest:
      - Subject stream (Science/Commerce/etc.)
      - Degree & certifications
      - Skill-building projects
      - Entry-level roles
      - Career path recommendations

      Output it in **markdown**, structured clearly with emojis and bullet points.
    `;

    const aiOutput = await generateContent(prompt);
    res.json({ roadmap: aiOutput });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate AI career roadmap' });
  }
});

// 🆕 Follow-up route: user can ask further questions based on the initial output
router.post('/followup', async (req, res) => {
  const { previousPrompt, userMessage } = req.body;

  if (!previousPrompt || !userMessage) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedPrompt = `
      ${previousPrompt}

      💬 User follow-up question: "${userMessage}"
      👉 Please respond in context and continue or clarify in markdown format with bullet points and emojis.
    `;

    const followUpOutput = await generateContent(updatedPrompt);
    res.json({ response: followUpOutput });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process follow-up interaction' });
  }
});

module.exports = router;
