import "./AddTaskModal.css";
import {useState} from "react";
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
];

interface AddTaskModalProps{
    show: boolean;
    onClose: ()=> void;
   onConfirm: (taskData: {
    category: string;
    short_description: string;
    long_description: string;
    date: string;
     start_time?: string;
    end_time?: string;
   }) => void;
   memberName: string;
   
}

const AddTaskModal = (props: AddTaskModalProps) => {
    
    const [category, setCategory] = useState("");
    const[shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
const [endTime, setEndTime] = useState("");


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onConfirm({ //onConfirm sends the filled form back to the parent. 
        category: category,
        short_description: shortDescription,
        long_description: longDescription,
        date: date,
        start_time: startTime,
        end_time: endTime
    })
    //reset local state once the form is submitted
    setCategory("");
    setShortDescription("");
    setLongDescription("");
    setDate("");
    setStartTime("");
  setEndTime("");
};

if (!props.show) { 
    return null;
}

return (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Add Task for {props.memberName}</h3>
            <form onSubmit ={handleSubmit}>
                <label>
                    Category:
                    <select
                    value={category}
                    onChange={(e)=>setCategory(e.target.value)}
                    required
                    >
                    <option value ="">
                        Select category</option>
                        {categories.map((cat)=> (
                            <option key ={cat} value ={cat}>
                                {cat}
                                </option>
                        ))}
                  </select>
                </label>

                <label>
                        Short Description:
                        <input 
                        type="text"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                        />
                </label>
                <label>
                        Detailed Description:
                        <textarea
                        value ={longDescription}
                        onChange={(e)=> setLongDescription(e.target.value)}
                        />
                </label>
                <label>
                        Date:
                        <input
                        type="date"
                        value={date}
                        onChange={(e)=>setDate(e.target.value)}
                        required
                        />
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
                    <button type ="submit">Add Task</button>
                    <button type="button" onClick={props.onClose}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
)

}

export default AddTaskModal;