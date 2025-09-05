const fetchPinnedTasks = async() => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch("http://localhost:3000/pinnedtasks/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "",  // use token
      },
    });
        if(!response.ok) {
            throw new Error("Failed to fetch pinned tasks");
        }
        return await response.json();
    } catch (err) {
        console.error("Error fetching pinned tasks:", err);
        throw err;
    }
};

const togglePinTask = async (taskId:string) => {
    try {
        const response= await fetch(`http://localhost:3000/pinnedtasks/${taskId}/pin`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"}
        });

        if (!response.ok) {
            throw new Error("failed to toggle pin");
        }

        return await response.json(); //return updated task
    } catch (err) {
        console.error("Error toggling pin:", err);
        throw err;
    }
}

export {togglePinTask, fetchPinnedTasks}