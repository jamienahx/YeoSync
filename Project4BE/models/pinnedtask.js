const taskDaos = require("../daos/task");

const togglePinById = async (_id) => {
    const task = await taskDaos.findById(_id);
    if (!task) return null;
    task.pinned = !task.pinned; //flip pinned to true or false
    task.pinned_at = task.pinned ? new Date() : null; //save time when it was pinned.
    return await task.save();
}

const getPinnedTasks = async () => {
    return await taskDaos.find ({pinned: true}).sort({pinned_at:-1})
}

module.exports = {
  togglePinById,
  getPinnedTasks
}