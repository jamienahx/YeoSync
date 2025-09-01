const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

// GET /wordcloud
router.get('/', (req, res) => {
  const scriptPath = path.join(__dirname, '../redditwordcloud.py');

  const pythonProcess = spawn(
    '/Users/jamie/Project4/Project4BE/venv/bin/python',
    [scriptPath]
  );

  let output = '';
  let errorOutput = '';

  // Collect stdout
  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Collect stderr
  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  // On process exit
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error('Stderr:', errorOutput);
      return res.status(500).json({ error: 'Failed to run word cloud analysis' });
    }

    try {
      const result = JSON.parse(output);
      // e.g. { "wordcloud_image": "wordcloud.png" }

      // Serve back the relative URL directly
      //tells the frontend: { "wordcloud_image": "/wordcloud.png" }
      res.json({ wordcloud_image: `/${result.wordcloud_image}` });
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.error('Raw output:', output);
      res.status(500).json({ error: 'Invalid JSON output from script' });
    }
  });
});

module.exports = router;
