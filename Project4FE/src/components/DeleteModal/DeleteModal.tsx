import "./DeleteModal.css";

interface DeleteModalProps{
    show: boolean;
    onClose: () => void;
    onConfirm: ()=> void;


}

const DeleteModal = (props: DeleteModalProps)=> {

    if(!props.show) return null; //show modal when true



    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal">

                <p>Are you sure you want to delete this task?</p>
                <div className="delete-modal-buttons">
                <button onClick={props.onConfirm} className="confirm-btn"> 
                    Confirm
                </button>
                <button  onClick ={props.onClose} className="cancel-btn">
                    Cancel
                </button> 
            </div>
        </div>
        </div>
    )

}

export default DeleteModal;