import "./ArtisteModal.css";

interface ArtisteModalProps{
    onClose: () => void;
     task: {
        category: string;
        short_description: string;
        long_description: string;
        date: string;
    } ;
}

const ArtisteModal = (props:ArtisteModalProps) => {

    return(


    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={props.onClose}>✖</button>
        <h3>{props.task.category}: {props.task.short_description}</h3>
        <p><strong>Date:</strong> {props.task.date}</p>
        <p><strong>Details:</strong> {props.task.long_description}</p>
      </div>
    </div>
  );
}

export default ArtisteModal;