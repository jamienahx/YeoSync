import { useState } from "react";
import "./Priority.css"; // import custom CSS
import { jsPDF } from "jspdf";
import Navbar from "../Navbar/Navbar";

const Priority = () => {
  // slider state
  const [isOpen, setIsOpen] = useState(false);

  //state for dropdown and textarea
  const [ type, setType] = useState("Concert"); //the default value of the dropdown menu
  const [member, setMember] =useState("all");
  const [noticeText, setNoticeText] = useState("");

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



  return (
     <>
     <Navbar />

    <div className="priority-container">
      {/* pinned stuff */}
      <div className="pinned">
        <h1>Pinned Items</h1>
        <div className="grid">
          <div className="item">item1</div>
          <div className="item">item2</div>
          <div className="item">item3</div>
        </div>
      </div>

      {/* Slider */}
      <div className={`slider ${isOpen ? "open" : ""}`}>
        <div className="slider-content">
          <h2>Draft a Notice</h2>
         {/* Category Dropdown */}
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
