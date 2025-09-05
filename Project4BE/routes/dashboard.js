const express = require('express');
const router = express.Router();
const taskController = require("../controllers/task")
const securityMiddleware = require('../middlewares/security');

router.get('/',securityMiddleware.checkLogin,taskController.fetchDashboardTasks);
router.get('/members',taskController.fetchDistinctMembers);
router.get('/:member',securityMiddleware.checkLogin,taskController.fetchTaskByMember)
router.post('/',taskController.createTask);
router.delete('/:id',taskController.deleteTask);
router.put('/:id',taskController.updateTask);




module.exports = router;