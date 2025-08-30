import "./ArtisteModal.css";

interface ArtisteModalProps{
    onClose: () => void;
     task: {
        category: string;
        short_description: string;
        long_description: string;
        date: string;
        start_time?: string; 
       end_time?: string;
    } ;
}

const ArtisteModal = (props:ArtisteModalProps) => {

    return(


    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={props.onClose}>✖</button>
        <h3>{props.task.category}: {props.task.short_description}</h3>
        <p><strong>Date:</strong> {props.task.date}</p>
        {(props.task.start_time || props.task.end_time) && (
      <p>
        <strong>Time:</strong>{" "}
        {props.task.start_time && props.task.end_time
          ? `${props.task.start_time} - ${props.task.end_time}`
          : props.task.start_time
          ? `Starts at ${props.task.start_time}`
          : `Ends at ${props.task.end_time}`}
      </p>
    )}
        <p><strong>Details:</strong> {props.task.long_description}</p>
      </div>
    </div>
  );
}

export default ArtisteModal;