import './TaskBoard.css';
import { Link } from 'react-router-dom';


//get the filtered tasks from app and render them 
interface Task {
    category: string;
    short_description: string;
    date: string;
}

interface TaskBoardProps {
    member: string;
    tasks: Task[];

}

const TaskBoard = (props: TaskBoardProps)=> {
    return(
<Link to ={`/members/${props.member}`} className="task-board-link">
<div className = "task-board">
    <h3>{props.member}</h3>
    <ul className="task-list">
        {props.tasks.map((task, index)=> {
            return(
                <li key = {index}>
                    <strong>{task.category}</strong>:{task.short_description}<br />
                    <small>{task.date}</small>
                </li>
            )

        })}
    </ul>
</div>
</Link>
);
};

export default TaskBoard;