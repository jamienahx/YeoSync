const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task")
const securityMiddleware = require('../middlewares/security');

router.get('/',taskController.fetchDashboardTasks);
router.get('/members', taskController.fetchDistinctMembers);
router.get('/:member',taskController.fetchTaskByMember)
router.post('/',taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.put('/:id',taskController.updateTask);




module.exports = router;