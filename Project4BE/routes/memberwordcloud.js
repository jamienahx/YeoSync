const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

// GET /memberwordcloud?member=Jisoo
router.get('/', (req, res) => {
  const member = req.query.member;

  if (!member) {
    return res.status(400).json({ error: 'No member specified' });
  }

  const scriptPath = path.join(__dirname, '../memberwordcloud.py');

  const pythonProcess = spawn(
    '/Users/jamie/Project4/Project4BE/venv/bin/python',
    [scriptPath, member]
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
    try{
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      console.error('Stderr:', errorOutput);
      return res.status(500).json({ error: 'Failed to run member word cloud analysis' });
    }

    const filename = `/${member.toLowerCase()}_wordcloud.png`;
    res.json({ wordcloud_image: filename });
} catch(err) {
      console.error('Error handling member wordcloud response:', err);
    res.status(500).json({ error: 'Error serving member wordcloud' });
}
  });
});

module.exports = router;
