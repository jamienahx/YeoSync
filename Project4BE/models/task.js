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

const deleteTaskById = async(_id) => {
    return await taskDaos.deleteOne({_id});
}

const updateTaskById = async (_id, updateData) => {
    return await taskDaos.findByIdAndUpdate(_id, updateData, {new: true});
}

//select distinct members from tasks
const  getDistinctMembers = async () => {
    return await taskDaos.distinct("member");
}


module.exports = {
    getDashboardTasks,
    getTasksByMember,
    createTask,
    deleteTaskById,
    updateTaskById,
    getDistinctMembers
}