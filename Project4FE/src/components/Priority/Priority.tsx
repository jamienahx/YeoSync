import { useState } from "react";
import "./Priority.css"; // import custom CSS

const Priority = () => {
  // slider state
  const [isOpen, setIsOpen] = useState(false);

  return (
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
            <select>
              <option value="performance">Performance</option>
              <option value="leave">Leave / Absence</option>
              <option value="release">Release</option>
              <option value="ticketing">Ticketing</option>
              <option value="event">Event</option>
            </select>
          </label>

          {/* Member Dropdown */}
          <label>
            Member:
            <select defaultValue="all">
              <option value="all">All</option>
              <option value="Jisoo">Jisoo</option>
              <option value="Jennie">Jennie</option>
              <option value="Rose">Rosé</option>
              <option value="Lisa">Lisa</option>
              
            </select>
          </label>
          {/* Text input */}
          <label>
            Notice:
            <textarea placeholder="Draft notices will be generated here" />
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
  );
};

export default Priority;
