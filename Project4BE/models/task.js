const taskDaos = require("../daos/task");


const getDashboardTasks = async() => {
return await taskDaos.find({}, 'member category short_description date')
}

const getTasksByMember = async(memberName) => {
    return await taskDaos.find({member: memberName});
}

const createTask = async(taskData) => {
    return await taskDaos.create(taskData);
}

const deleteTaskById = async(taskId) => {
    return await taskDaos.deleteOne({task_id:taskId});
}

const updateTaskById = async (_id, updateData) => {
    return await taskDaos.findByIdAndUpdate(_id, updateData, {new: true});
}


module.exports = {
    getDashboardTasks,
    getTasksByMember,
    createTask,
    deleteTaskById,
    updateTaskById
}