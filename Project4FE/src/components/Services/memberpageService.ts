const fetchMemberWordCloud = async (memberName: string) => {
try {
    const response = await fetch(`http://localhost:3000/memberwordcloud?member=${memberName}`);
    if(!response.ok) {
        throw new Error("Failed to member fetch wordcloud");
    }
  const data = await response.json();
     // builds the url: http://localhost:3000/wordcloud.png
    return `http://localhost:3000${data.wordcloud_image}`;
} catch (err) {
    console.error("Error fetching member wordcloud:", err);
    throw err;
}

}

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

const fetchPinnedTask = async()=> {
    try {
        const response = await fetch("http://localhost:3000/pinnedtasks/all");
        if (!response.ok) {
            throw new Error("Failed to fetch pinned tasks");
        }
        return await response.json();
    } catch (err) {
        console.error("Error fetching pinned tasks:", err);
        throw err;
    }
}

export {fetchMemberWordCloud, togglePinTask, fetchPinnedTask}