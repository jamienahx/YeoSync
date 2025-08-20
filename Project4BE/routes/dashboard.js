const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task")

router.get('/', taskController.fetchDashboardTasks);
router.get('/:member',taskController.fetchTaskByMember)



module.exports = router;