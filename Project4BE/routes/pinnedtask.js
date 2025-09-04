const express = require('express');
const router = express.Router();
const pinnedTaskController = require("../controllers/pinnedtask");
const securityMiddleware = require('../middlewares/security');

router.put('/:id/pin', pinnedTaskController.togglePin);
router.get('/all',pinnedTaskController.fetchPinnedTasks);

module.exports = router;