const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task")

router.get('/', taskController.fetchDashboardTasks);
router.get('/:member',taskController.fetchTaskByMember)
router.post('/',taskController.createTask);
router.delete('/:taskId', taskController.deleteTask);



module.exports = router;