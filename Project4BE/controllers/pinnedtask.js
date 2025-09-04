const pinnedTaskModel= require ('../models/pinnedtask');

//pin or unpin

const togglePin = async (req, res) => {

    try {
        const {id} = req.params;
        if (!id) {
            return res.status(400).json({message: "Task ID required"});
        }

        const updatedTask = await pinnedTaskModel.togglePinById(id);
    
    if(!updatedTask) {
        return res.status(404).json({message: `Task with ID ${id} not found`});

    }
    res.status(200).json(updatedTask);
} catch(err) {
    res.status(500).json({message: err.message});
}

};


const fetchPinnedTasks = async (req, res) => {

    try {
        const pinnedTasks = await pinnedTaskModel.getPinnedTasks();
        res.status(200).json(pinnedTasks);

    }catch (err) {
        res.status(500).json({message: err.message});
    }
}

module.exports = {
    togglePin,
    fetchPinnedTasks
}