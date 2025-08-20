import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import './MemberPage.css';

interface Task {
    member: string;
    category: string;
    short_description: string;
    long_description: string;
    date: string;
    task_id: string; 
}


const MemberPage= () => {

    const params = useParams(); 
    const memberName = params.memberName;

    const [tasks, setTasks] = useState<Task[]>([]);
   

    const fetchMemberTasks = async() => {
    try{

        const response = await fetch(`http://localhost:3000/dashboard/${memberName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch tasks for ${memberName}`);
        }
        const data = await response.json();
        setTasks(data);
    }
    catch(err){
        console.error(err);
    }
};
    useEffect(()=> {
        if(memberName) {
            fetchMemberTasks();
        }
    }, [memberName]);


    return (
<div style = {{padding: '20px'}}>

    <h2> Schedule for {memberName}</h2>
    {tasks.length===0 ? (
        <p>no tasks found for {memberName}</p>
    ):(
        <ul className="task-list">
            {tasks.map((task) => (
                <li key = {task.task_id} className="task-card">

                    <strong>{task.category}: {task.short_description}<br /></strong>
                    <small>{task.date}</small>
                    {task.long_description && (
                        <>
                        <br />
                        <em>{task.long_description}</em>
                        </>
                    )}

                </li>
            ))}
        </ul>
    )}

</div>
);

};

export default MemberPage;