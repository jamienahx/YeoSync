import { useState } from "react";
import "./Priority.css"; // import custom CSS
import { jsPDF } from "jspdf";
import Navbar from "../Navbar/Navbar";
import {fetchPinnedTasks, togglePinTask} from "../Services/priorityService";
import { useEffect } from "react";

interface Task {
  _id: string;
  member: string;
  category: string;
  short_description: string;
  long_description?: string;
  date: string;
  pinned: boolean;
  task_id: string;
  start_time?: string;
  end_time?: string;
}

const Priority = () => {
  // slider state
  const [isOpen, setIsOpen] = useState(false);

  //state for dropdown and textarea
  const [ type, setType] = useState("Concert"); //the default value of the dropdown menu
  const [member, setMember] =useState("all");
  const [noticeText, setNoticeText] = useState("");


  //state for pinned task
  const [pinnedTasks, setPinnedTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string |null>(null);

  const handleGenerateDraft=async()=> {
    try{
      const response = await fetch (`http://localhost:3000/notice/${type}`);
      if(!response.ok) throw new Error("Failed to fetch draft");
      let draftText= await response.json(); //subject to change based on members selected hence use let instead of const
      const replacement = member === "all" ? "Blackpink Members" : member;
      draftText = draftText.replace(/{member}/g, replacement);  //replacing ALL instances of {member}
      setNoticeText(draftText);

    }catch(err) {
      console.error("Error fetching draftL", err);
      setNoticeText("Failed to fetch draft. Please try again.");
    }
    
  };

 const handleClear = () => setNoticeText("");

  //handling PDF generation

  const handleDownloadPDF =()=> {
      const doc = new jsPDF();
      const lines = doc.splitTextToSize(noticeText || "No content to export", 180);  //180 is to make sure that each line fits within A4, kind of like wrapping
      doc.text(lines, 10, 20);  //10 is  the distance from the text from left of the page. Y is the distance of the first line from the top of the page.
      doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.save("notice.pdf");

  }

  //fetch pinnedtask
   const loadPinnedTasks = async() => {
      try{
  
        const data = await fetchPinnedTasks();
        setPinnedTasks(data);
      }
      catch(err){
          console.error(err);
          setError("Could not load pinned tasks");
      }
  };
      useEffect(()=> {
          loadPinnedTasks(); //rmb to put (), without () it is referencing the function not calling it
      }, []);

//togglepin. reload from BE
const handleTogglePin = async (id: string) => {
    try {
      await togglePinTask(id);
      await loadPinnedTasks(); // refresh after change
    } catch (err) {
      console.error("Failed to toggle pin:", err);
    }
  };


  return (
     <>
     <Navbar />

    <div className="priority-container">
      {/* pinned stuff */}
 <div className="priority-page">
      <h2>Pinned Tasks</h2>

     
      {error && <p className="error">{error}</p>}

      <div className="pinned-grid">
        {pinnedTasks.length === 0 ? (
          <p>No pinned tasks yet</p>
        ) : (
          pinnedTasks.map((task) => (
            <div key={task._id} className="pinned-card">
              <button
    className={`pin-button ${task.pinned ? "pinned" : ""}`}
    onClick={() => handleTogglePin(task._id)}
    title={task.pinned ? "Unpin" : "Pin"}
  >
    {task.pinned ? "★" : "☆"}
  </button>
              <h4>{task.category}: {task.short_description}</h4>
              <p><strong>Member:</strong> {task.member}</p>
              <p><strong>Date:</strong> {new Date(task.date).toLocaleDateString()}</p>
           
              {task.long_description && <p>{task.long_description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
 

      {/* Slider */}
      <div className={`slider ${isOpen ? "open" : ""}`}>
        <div className="slider-content">
          <h2>Draft a Notice</h2>
         {/* Category Dropdown */}
         <div className="form-body">
          <label>
            Type:
          
              <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Concert">Concert</option>
              <option value="Absence">Absence</option>
              <option value="Release">Release</option>
              <option value="Ticketing">Ticketing</option>
              <option value="Event">Event</option>
            </select>
          </label>
          </div>
          {/* Member Dropdown */}
          <label>
            Member:
            <select value={member} onChange={(e) => setMember(e.target.value)}>
              <option value="all">All</option>
              <option value="Jisoo">Jisoo</option>
              <option value="Jennie">Jennie</option>
              <option value="Rose">Rosé</option>
              <option value="Lisa">Lisa</option>
              </select>

              {/*Generate draft button*/}
              <div className="actions">
                <button type = "button" className="btn-generate" onClick={handleGenerateDraft}>
                  Generate Draft
                  </button>
                  <button
                      type="button"
                      className="btn-clear"
                      onClick={handleClear}>
                      Clear
                      </button>

                       <button type="button" className="btn-download" onClick={handleDownloadPDF}>
                        Download PDF
                        </button>
              </div>
            
          </label>
          {/* Text input */}
          <label>
            <textarea
             value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              placeholder="Draft notices will be generated here"/>
          </label>
        </div>
      </div>

      {/* Tab */}
      <button
        className={`tab ${isOpen ? "shifted" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "Draft a Notice"}
      </button>
    </div>
   
      </>
    
  );
  
};

export default Priority;
