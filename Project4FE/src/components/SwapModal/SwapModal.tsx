import './SwapModal.css';


interface SwapModalProps {

show: boolean;
onClose:()=>void; //button function
members: string[];
onConfirm:() => void; //button function
selectedMember: string;
setSelectedMember: (member: string)=> void;  //used for updating the selected member when selecting from dropdown menu

}


const SwapModal = (props: SwapModalProps) => {
    //console.log("SwapModal props:", props);
    const show = props.show;
  const onClose = props.onClose;
  const members = props.members;
  const onConfirm = props.onConfirm;
  const selectedMember = props.selectedMember;
  const setSelectedMember = props.setSelectedMember;


if (!show) {
    return null;

    //console.log("Members:", members);
//console.log("Selected member:", selectedMember);
}

return(
    <div className="modal-overlay">
        <div className = "modal-content">
        <h3>Swap Task to Another Member</h3>
        <label>Select a member:</label>
    {/*dropdown menu */}
        <select
            value={selectedMember}
            onChange={(e)=> setSelectedMember(e.target.value)}  //onChange will call selectedMember--> state in Memberpage will be updated since setselectedmember is a prop
            >
                <option value ="">Select</option>
                {members.map((member,index)=> ( //loop over every member, then create an option for each member and sets it as value. Use key and value since the list is static and order doesnt change.
                    <option key={index} value={member}>
                        {member}
                    </option>
                ))}

            </select>
            <div className="modal-buttons">
                <button 
                    onClick={onConfirm}
                    disabled={selectedMember ===''} //triggers handleConfirmSwap in Memberpage
                        >
                            Confirm
                        </button>
                        <button onClick={onClose}>Cancel</button>

            </div>

        </div>
    </div>


)

}

export default SwapModal;