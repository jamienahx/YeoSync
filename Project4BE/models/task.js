const taskDaos = require("../daos/task");


const getDashboardTasks = async() => {
return await taskDaos.find({}, 'member category short_description date')
}

const getTasksByMember = async(memberName) => {
    return await taskDaos.find({member: memberName});
}



module.exports = {
    getDashboardTasks,
    getTasksByMember,
}