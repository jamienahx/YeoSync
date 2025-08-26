const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

router.get('/:member', (req, res) => {
  const member = req.params.member;  //the member name gotten from the FE
  const scriptPath = path.join(__dirname, '../sentimentMembers.py');

  const pythonProcess = spawn(
    '/Users/jamie/Project4/Project4BE/venv/bin/python',
    [scriptPath, member]   // pass member as argument when testing code in terminal. ie need to run python sentimentMember.py membername
  );

  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
  });

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
