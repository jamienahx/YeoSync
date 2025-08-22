import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import './MemberPage.css';
import SwapModal from '../SwapModal/SwapModal';
import DeleteModal from '../DeleteModal/DeleteModal';

interface Task {
    member: string;
    category: string;
    short_description: string;
    long_description: string;
    date: string;
    _id: string;
     
}


const MemberPage= () => {

    const params = useParams(); 
    const memberName = params.memberName;

    const [tasks, setTasks] = useState<Task[]>([]);
    const [searchTermCategory, setSearchTermCategory] = useState('');
    const [searchTermDesc, setSearchTermDesc] = useState('');

    //states for Modal
    const [showModal, setShowModal] = useState(false);
    const [taskToSwap, setTaskToSwap] = useState<Task | null>(null);
    const [selectedMember, setSelectedMember]= useState('');

    //states for deleteModal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);



    //need to extract the names out of the task array


    const [allMembers, setAllMembers] = useState<string[]>([]);
        const otherMembers = allMembers.filter(m => m !== memberName);

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

    //whatever user typed into the 2 search bars
const filteredTasks = tasks.filter((task)=> 
    task.category.toLowerCase().includes(searchTermCategory.toLowerCase()) &&
    task.long_description?.toLowerCase().includes(searchTermDesc.toLowerCase())
);


//get all members:
const fetchAllMembers = async () => {
  try {
    const response = await fetch('http://localhost:3000/dashboard');
    if (!response.ok) {
      throw new Error('Failed to fetch all tasks');
    }
    const data: Task[] = await response.json();
    const members = Array.from(new Set(data.map(task => task.member)));
    setAllMembers(members);
  } catch (error) {
    console.error(error);
  }
};

//Post to another member, then delete from current member
const handleConfirmSwap = async () => {
    if(!taskToSwap || ! selectedMember) return;
    const newTask ={
        ...taskToSwap, //everything of the current task
        member: selectedMember //the member that was selected
    }
    // console.log("Posting new task to backend:", newTask);
    try{

        await fetch ('http://localhost:3000/dashboard', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newTask) 
        });

        await fetch(`http://localhost:3000/dashboard/${taskToSwap._id}`, {
            method: 'DELETE'
        });
//refresh the task list after the swap has been done
        await fetchMemberTasks();

        //reset the modal state
    setShowModal(false);
    setSelectedMember('');
    setTaskToSwap(null);

    } catch (error) {
        console.error("Swap failed:", error)
    }
}

const handleOpenModal = (task: Task) => {
  setTaskToSwap(task);
  setShowModal(true);
};

useEffect(()=> {
    fetchAllMembers();
}, [])


//delete function

const handleDeleteTask = async (_id: string) => {

    try {
        await fetch(`http://localhost:3000/dashboard/${_id}`, {

        method: "DELETE",
        });

        await fetchMemberTasks();
        setTaskToDelete(null);
        setShowDeleteModal(false)

    } catch(err){
        console.error("Failed to delete task:", err);

    }

}

const openDeleteModal =(id: string) => {
    setTaskToDelete(id);
    setShowDeleteModal(true);
}



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
                <li key = {task._id} className="task-card">

                    <strong>{task.category}: {task.short_description}<br /></strong>
                    <small>{task.date}</small>
                    {task.long_description && (
                        <>
                        <br />
                        <em>{task.long_description}</em>
                        </>
                    )}
                    {/*when user clicks on this, the modal will be opened. inside openDeletemodal, setTasksToDelete(id) will store the task to delete and setShowDeleteModal = true */}
                    <button onClick={() => openDeleteModal(task._id)}>Delete</button> 
                    {/*when user clicks on this, the modal will be opened. The selected task is saved to the state  and will be swapped */}
                     {/*now inside the state variable, taskToSwap is now having this task*/}
                <button onClick={() => handleOpenModal(task)}>Swap</button> 
                </li>
              

            ))}
        </ul>
    )}
{/*pass all these props into modal.tsx. so essentially we will control modal from this page. modal is like a dummy*/}
    <SwapModal 
  show={showModal}
  onClose={() => setShowModal(false)}
  members={otherMembers}
  onConfirm={handleConfirmSwap}
  selectedMember={selectedMember}
  setSelectedMember={setSelectedMember}
/>

{/*pass all these props into deletemodal.tsx. show-> render modal onclose ->set ShowDeleteModal to false , onConfirm -> calls handleDeleteTask*/}

<DeleteModal
show={showDeleteModal}
onClose={() => setShowModal(false)}
onConfirm={()=>taskToDelete && handleDeleteTask(taskToDelete)}
/>

</div>

);

};

export default MemberPage;