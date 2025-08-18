const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.get('/', (req, res) => {
  const scriptPath = path.join(__dirname, '../sentiment2.py');

  const pythonProcess = spawn('python3', [scriptPath]);

  let output = '';
  let errorOutput = '';

  // Collect stdout
  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  // Collect stderr (if any)
  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

  // On process exit
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error('Stderr:', errorOutput);
      return res.status(500).json({ error: 'Failed to run sentiment analysis' });
    }

    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (e) {
      console.error('Error parsing JSON:', e);
      console.error('Raw output:', output);
      res.status(500).json({ error: 'Invalid JSON output from script' });
    }
  });
});

module.exports = router;
