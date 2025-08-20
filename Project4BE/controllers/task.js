const taskModel = require ('../models/task')


const fetchDashboardTasks =async (req, res) => {

try {
const tasks = await taskModel.getDashboardTasks();

if(!tasks || tasks.length === 0) {
    return res.status(404).json({
        message: "No tasks found"
    });
}
res.status(200).json(tasks);

}
catch(err){

    res.status(500).json({message: err.message})
}

}



const fetchTaskByMember = async (req, res) => {

    try{
        const { member } = req.params;
        if (! member || typeof member !=="string"){
            return res.status(400).json({
                message: "Member name is required and must be a string",
            });
        }

        const memberTasks = await taskModel.getTasksByMember(member);

        if(!memberTasks ||memberTasks.length ===0) {
            return res.status(404).json({
                message: `No tasks found for member '${member}'.`,
            });
        }

        res.status(200).json(memberTasks)

    }
    catch (err) {
        res.status(500).json({message: err.message})
    }

}

const createTask = async (req, res) => {

    try {
        const {member, category, short_description, long_description, date, task_id} = req.body;
        if (!member || !category || !short_description || !long_description || !date || !task_id) {
            return res.status(400).json({message: "Missing required fields"});
        }
        const newTask = await taskModelcreateTask({member, category, short_description, long_description, date, task_id});
        res.status(201).json(newTask)
    }
    catch(err) {
        res.status(500).json({message: err.message});
    }

}

const deleteTask = async(req,res) => {
    try{
        
        const {taskId} = req.params;
        if(!taskId) {
            return res.status(400).json({message: "task ID is required"});

        }

        const result = await taskModel.deleteTaskById(taskId);
        if (result.deletedCount ===0) {

            return res.status(404).json({message: `ID ${taskId} not found`})
        }
        res.status(200).json({message: "task deleted successfully"});
        } catch (err) {
        res.status(500).json({message: err.message});

        }
    }



module.exports = {
    fetchDashboardTasks,
    fetchTaskByMember,
    createTask,
    deleteTask,
    updateTask
}