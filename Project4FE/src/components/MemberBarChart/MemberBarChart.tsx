import {Bar} from 'react-chartjs-2';
import './memberbarchart.css';

import {
    Chart as ChartJS,
    CategoryScale,
    Tooltip, 
    Legend,
    LinearScale,
    BarElement
}  from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface MemberBarChartProps {

filteredBoards : {member:string; tasks:Task[]}[]
currentMonth : number;
currentYear : number;
monthNames : string[];

}

interface Task {
  member: string;
  category: string;
  short_description: string;
  date: string;
}

const MemberBarChart = (props:MemberBarChartProps) => {

//extract out the members and the task per member from filtered boards
//rmb filtered boards look like this, the below being one line of task
//{member: Jennie, Tasks: [member: Jennie, category: xxx, short_desc: xxx, date: xxx}

    const members = props.filteredBoards.map((board)=> board.member);
    const taskCounts = props.filteredBoards.map((board) =>board.tasks.length);

    const chartData = {
        labels: members,
        datasets: [
            {
               label: "Tasks in "+props.monthNames[props.currentMonth]+" "+props.currentYear,
               data: taskCounts,
               backgroundColor: '#1976d2',
            },
        ],
    };

    return (
        <div className = "chart-container">
            <h3 className="chart-title">
                Overall Task Distribution ({props.monthNames[props.currentMonth]} {props.currentYear})
            </h3>

            <Bar data = {chartData} />

        </div>
    );


};

export default MemberBarChart;