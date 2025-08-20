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
    const [searchTermCategory, setSearchTermCategory] = useState('');
    const [searchTermDesc, setSearchTermDesc] = useState('');
   

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

const filteredTasks = tasks.filter((task)=> 
    task.category.toLowerCase().includes(searchTermCategory.toLowerCase()) &&
    task.long_description?.toLowerCase().includes(searchTermDesc.toLowerCase())
);


    return (
<div style = {{padding: '20px'}}>

    <h2> Schedule for {memberName}</h2>
    <input type="text"
    placeholder="Search by category"
    className="search-bar"
    value={searchTermCategory}
    onChange={(e)=>setSearchTermCategory(e.target.value)}
    />
     <input type="text"
    placeholder="Search by long description"
    className="search-bar"
    value={searchTermDesc}
    onChange={(e)=>setSearchTermDesc(e.target.value)}
    />

    {tasks.length===0 ? (
        <p>no tasks found for {memberName}</p>
    ):(
        <ul className="task-list">
            {filteredTasks.map((task) => (
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