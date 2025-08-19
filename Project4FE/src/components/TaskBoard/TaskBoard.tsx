import './TaskBoard.css';


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
);
};

export default TaskBoard;