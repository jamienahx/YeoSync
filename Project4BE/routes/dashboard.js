const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task")

router.get('/', taskController.fetchDashboardTasks);
router.get('/:member',taskController.fetchTaskByMember)
router.post('/',taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id',taskController.updateTask)



module.exports = router;