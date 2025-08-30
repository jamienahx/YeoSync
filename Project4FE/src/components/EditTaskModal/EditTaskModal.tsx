import {useState} from "react";
import {useEffect} from "react";
import "./EditTaskModal.css";

interface EditTaskModalProps {
show: boolean;
onClose: () => void;
onConfirm: (updatedTask: {
    category: string;
    short_description: string;
    long_description: string;
    date: string;
    start_time?: string;
    end_time?: string;
}) => void;
    task: {
        category: string;
        short_description: string;
        long_description: string;
        date: string;
         start_time?: string;
    end_time?: string;
    } |null;
}

const categories = [
    "Practice",
  "Recording",
  "Performance",
  "Rehearsal",
  "Promotion",
  "Photoshoot",
  "Video Shoot",
  "Meeting",
  "Event",
  "Medical",
  "Other",
]



const EditTaskModal = (props: EditTaskModalProps) => {

    const [category, setCategory] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");


//utilize useeffect to pre-fill inputs. 
//modal not open, task.props= null
//when modal opens it will be populated with the pre-filled values so it goes from null to {...}
//setting the state with the pre-filled values 

useEffect (()=> {
    if(props.task) {
        setCategory(props.task.category);
        setShortDescription(props.task.short_description);
        setLongDescription(props.task.long_description);
    

        const formattedDate = props.task.date
      ? new Date(props.task.date).toISOString().split("T")[0] //convert the date stored in DB into 'YYYY-MM-DD'
      : "";
    setDate(formattedDate); //this will become the pre-filled date
      setStartTime(props.task.start_time || "");
    setEndTime(props.task.end_time || "");
    }
}, [props.task]);

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onConfirm({ //calls onConfirm in the parent and pass everything upwards
        category,
        short_description: shortDescription,
        long_description: longDescription,
        date,
         start_time: startTime,
    end_time: endTime,
    });
};

if(!props.show || !props.task) return null; //dont render if modal not visible or no task provided (eg button not clicked yet)

return (
<div className = "modal-overlay">
    <div className= "modal-content">
    <h3>Edit Task</h3>
    <form onSubmit={handleSubmit}>
    <label>
        Category:
        <select
        value={category}
        onChange={(e)=>setCategory(e.target.value)}
        required
    >
<option value ="">Select category</option>
{categories.map((cat)=> (
    <option key ={cat} value ={cat}>

    {cat}
    </option>

))}
</select>
</label>

    <label>
        Short Description:
        <input type="text"
        value={shortDescription}
        onChange={(e) =>setShortDescription(e.target.value)}
        required/>

    </label>

    <label>
        Detailed Description:
        <textarea
        value={longDescription}
        onChange={(e)=>setLongDescription(e.target.value)}
        />
    </label>
    <label>
        <input
        type="date"
        value={date}
        onChange={(e)=>setDate(e.target.value)}
        required/>
    </label>
    <label>
    Start Time:
    <input
      type="time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
    />
  </label>

  <label>
    End Time:
    <input
      type="time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
    />
  </label>
    <div className="modal-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={props.onClose}>Cancel</button>
    </div>

    </form>

    </div>


</div>

)



}

export default EditTaskModal;