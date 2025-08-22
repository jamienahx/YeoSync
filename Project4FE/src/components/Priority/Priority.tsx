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
          <p>slider content here</p>
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
