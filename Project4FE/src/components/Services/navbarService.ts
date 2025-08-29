const fetchMembers = async () => {

    try{
        const response =await fetch("http://localhost:3000/dashboard/members");
        if(!response.ok) {
            throw new Error("Failed to fetch members");
        }
        const data: string[] = await response.json();
        return data;
    }
    catch(err) {
        console.error("Error fetching members:", err);
         return [];

    }
}

export {fetchMembers}