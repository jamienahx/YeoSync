const express = require('express');
const router = express.Router();
const pinnedTaskController = require("../controllers/pinnedtask");
const securityMiddleware = require('../middlewares/security');

router.put('/:id/pin', pinnedTaskController.togglePin);
router.get('/all',securityMiddleware.checkLogin,pinnedTaskController.fetchPinnedTasks);

module.exports = router;