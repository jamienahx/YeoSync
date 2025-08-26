import { useParams } from 'react-router-dom';
import {useEffect} from 'react';
import {useState} from 'react';
import './MemberPage.css';
import SwapModal from '../SwapModal/SwapModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import TaskPieChart from "../TaskPieChart/TaskPieChart";
import AddTaskModal from '../AddTaskModal/AddTaskModal';
import EditTaskModal from '../EditTaskModal/EditTaskModal'
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register (CategoryScale,LinearScale, BarElement, Tooltip, Legend);


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


    //states for month
     const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
     const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

     //state for addtaskmodal
     const [showAddModal, setShowAddModal] = useState(false);


     //state for editing
     const [showEditModal, setShowEditModal] = useState(false);
     const [taskBeingEdited, setTaskBeingEdited] = useState<Task | null>(null);


     //state for sentiment
    const [sentiment, setSentiment] = useState<{Positive:number, Neutral:number, Negative:number} | null>(null);
    const [loadingSentiment, setLoadingSentiment] = useState(false);
    const [errorSentiment, setErrorSentiment] = useState<string | null>(null);


//////Codes for month handling 

//handle swiping here

 const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const handleNextMonth=()=>{
    if( currentMonth===11){
        setCurrentMonth(0);
        setCurrentYear(prev=>prev+1);
    } else {
        setCurrentMonth(prev=>prev+1)
    }
}

const handlePrevMonth=()=>{
    if( currentMonth===0){
        setCurrentMonth(11);
        setCurrentYear(prev=>prev-1);
    } else {
        setCurrentMonth(prev=>prev-1)
    }
}

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
    //now need to add the dates because now the dates affect what is rendered.
const filteredTasks = tasks.filter(task=> {
    const taskDate = new Date(task.date);
  return (
    taskDate.getMonth() === currentMonth &&
    taskDate.getFullYear() === currentYear &&
    task.category.toLowerCase().includes(searchTermCategory.toLowerCase()) &&
    task.long_description?.toLowerCase().includes(searchTermDesc.toLowerCase())
);
});


//get all members. need this in order to do filtering for the swap function
//already edited BE to be select distinct members from task
const fetchAllMembers = async () => {
  try {
    const response = await fetch('http://localhost:3000/dashboard/members');
    if (!response.ok) {
      throw new Error('Failed to fetch all tasks');
    }
    const members: string[] = await response.json();
    setAllMembers(members);  //the state setAllMembers is the members that are fetched from the query
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


//add task

const handleAddTask = async (taskData:{  //takes in the following data which is whatever the user filled in
    category:string;
    short_description:string;
    long_description: string;
    date: string;
}) => { //create a new task object below (adding on to whatever was passed in): -copy all the item from taskdata + create a random 6 number digit for taskid, then posts the new task into the DB
    const newTask = {
        ...taskData,
        member: memberName,
        task_id:Math.floor(100000+Math.random()*900000).toString(),
    };

    try {
        await fetch("http://localhost:3000/dashboard", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newTask),
        })

        await fetchMemberTasks();  //refetch fetchMemberTasks to the new list is fetched immediately
        setShowAddModal(false); //hide modal
    } catch(err) {
        console.error("Failed to add task:", err);
    }
};


////edit task 


//when user clicks on edit, the task is passed into handleEditClick
//stores the task in state
//then open the modal
const handleEditClick = (task:Task) => {
    setTaskBeingEdited(task);
    setShowEditModal(true);
}

//send to BE 

const handleConfirmEdit = async (updatedFields: {
category:string;
short_description: string;
long_description: string;
date: string;
}) => {
    if(!taskBeingEdited) return;


try{
    await fetch(`http://localhost:3000/dashboard/${taskBeingEdited._id}`, {
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updatedFields),
    });

    await fetchMemberTasks();
    setShowEditModal(false);
    setTaskBeingEdited(null);

}
catch(err) { 
    console.error("Failed to update task:", err);

}

}

//fetching sentiment
const fetchMemberSentiment = async () => {
    if(!memberName) return;
    setLoadingSentiment(true);
    setErrorSentiment(null);

    try{
        const response = await fetch(`http://localhost:3000/sentiment/member/${memberName}`);
        if(!response.ok) throw new Error("Server error");
        const data = await response.json();
        setSentiment(data);

    } catch (err) {
        setErrorSentiment("Failed to fetch sentiment");
    }
    setLoadingSentiment(false);

}

const chartData = sentiment ? {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [{
        label: `${memberName}'s Sentiment`,
        data: [sentiment.Positive, sentiment.Neutral, sentiment.Negative],
        backgroundColor: ["#4caf50", "#ffca28", "#f44336"]
    }]
}: null;






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

{/*Month navigation */}
<div className="month-navigation">

        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>{monthNames[currentMonth]}{currentYear}</span>
        <button onClick = {handleNextMonth}>Next Month</button>
</div>
     
    
    {filteredTasks.length===0 ? (
        <p>no tasks found for {memberName}</p>
    ):(
        
        <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
    {/* Left side: Task List */}
    <ul className="task-list" style={{ flex: 2 }}>
        
        
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
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    {/*when user clicks on this, the modal will be opened. inside openDeletemodal, setTasksToDelete(id) will store the task to delete and setShowDeleteModal = true */}
                    <button onClick={() => openDeleteModal(task._id)}>Delete</button> 
                    {/*when user clicks on this, the modal will be opened. The selected task is saved to the state  and will be swapped */}
                     {/*now inside the state variable, taskToSwap is now having this task*/}
                <button onClick={() => handleOpenModal(task)}>Swap</button> 
                </li>

            ))}
        </ul>

    {/* Right side: Pie Chart */}

    
     {/* update to reflect filtered tasks */}
    <div style={{ flex: 1 }}>
    {/* Add Button on top of the pie chart */}
    <button onClick={() => setShowAddModal(true)}>+ Add Task</button>

{/*sentiment chart */}
<div className="sentiment-section">
  <button onClick={fetchMemberSentiment} disabled={loadingSentiment}>
    {loadingSentiment ? "Loading..." : "Get Sentiment"}
  </button>

  {errorSentiment && <p className="sentiment-error">{errorSentiment}</p>}

  {sentiment && chartData && (
    <div className="sentiment-chart">
      <h4>{memberName} Sentiment Analysis</h4>
      <Bar data={chartData} />
    </div>
  )}
</div>


   
      <TaskPieChart tasks={filteredTasks} /> 
    </div>
</div>
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
onClose={() => setShowDeleteModal(false)}
onConfirm={()=>taskToDelete && handleDeleteTask(taskToDelete)}
/>

<AddTaskModal
    show={showAddModal}
    onClose={()=>setShowAddModal(false)}
    onConfirm = {handleAddTask}
    memberName={memberName || ""}
    />


    <EditTaskModal
  show={showEditModal}
  onClose={() => setShowEditModal(false)}
  onConfirm={handleConfirmEdit}
  task={taskBeingEdited}
/>

</div>

);

};

export default MemberPage;