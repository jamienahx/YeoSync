import {useEffect} from "react";
import {useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";  //localizer is to tell the calender how to think about months ie this month, next week, start of month or weeks
import moment from "moment";  //kinda like today
import "react-big-calendar/lib/css/react-big-calendar.css"; 
import "./Artiste.css"; 
import ArtisteModal from "../ArtisteModal/ArtisteModal";



interface Task {
  member: string;
  category: string;
  short_description: string;
  long_description: string;
  date: string;
  _id: string;
  pinned: boolean;
  task_id: string;
}



const localizer = momentLocalizer(moment);

const Artiste =() => {

    const [tasks, setTasks]= useState<Task[]>([]);
    const [error, setError] = useState<string | null>(null);

  //state for modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
//calendar states
  const [date, setDate] = useState(new Date());  // track the current calendar date

     const memberName = "Jennie";

const fetchMemberTasks = async ()=> {
  
    try {

        const response = await fetch(`http://localhost:3000/dashboard/${memberName}`);
        if(!response.ok) throw new Error ("Failed to fetch tasks");
        const data = await response.json();
        setTasks(data);   
    } catch (err) {
        setError("Error fetching tasks");
        console.error(err);   
    }
   
};

useEffect(()=> {
    fetchMemberTasks();
}, [memberName]);

const events = tasks.map((task)=> ({
    id: task._id,
    title: `${task.category}`,
    start: new Date(task.date),
    end: new Date(task.date),
    allDay: true,
})) //items to put into react-calendar because the calendar expects events. each task is mapped into an event.


//flow
//fetch the tasks from BE
//map tasks into events
//now give these events to the calendar
//when user clicks on event, there will be a specific id tagged to the event
//react calendar will pass it to the select event function
//onselectevent will look for the task with the identical id
//then the task in the original task list with the IS is saved in state.



return (

    <div className="member-calendar-container">
        
        <h2 className="member-calendar-title">{memberName}'s Calendar</h2>
            
        {error && <p className="member-calendar-error">{error}</p>}
        <div className="member-calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events} //received from the events function
          startAccessor="start"
          endAccessor="end"
          views={["month"]} //set the view to a monthly view
          style={{ height: 600 }}
           date={date}                         //today's date
        onNavigate={(newDate) => setDate(newDate)} // update when clicking next/back/today

          //add to the calendar so that when the task is clicked the modal will open
          //when clicking onthe event in the calendar, find the matching task and set it to selectedTask.
          //if selectedTask is set, ArtistModal pops up.
          onSelectEvent={(event) => { //onselectevent is inbuilt to the react big calendar. when clicked it will call a function
    const task = tasks.find((t) => t._id === event.id);
    if (task) setSelectedTask(task);
          }}
/>
        </div>
{selectedTask && (
        <ArtisteModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          />
)}
    </div>

   
)

}

export default Artiste;