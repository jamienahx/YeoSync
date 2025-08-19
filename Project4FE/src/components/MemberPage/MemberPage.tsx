import { useParams } from 'react-router-dom';


const MemberPage= () => {

    const params = useParams(); 
    const memberName = params.memberName;


    return (
<div style = {{padding: '20px'}}>

    <h2> Schedule for {memberName}</h2>
</div>

    );

};

export default MemberPage;