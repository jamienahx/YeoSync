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
   }) => void;
   memberName: string;
}

const AddTaskModal = (props: AddTaskModalProps) => {
    
    const [category, setCategory] = useState("");
    const[shortDescription, setShortDescription] = useState("");
    const [longDescription, setLongDescription] = useState("");
    const [date, setDate] = useState("");


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.onConfirm({ //onConfirm sends the filled form back to the parent. 
        category: category,
        short_description: shortDescription,
        long_description: longDescription,
        date: date,
    })
    //reset local state once the form is submitted
    setCategory("");
    setShortDescription("");
    setLongDescription("");
    setDate("");
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