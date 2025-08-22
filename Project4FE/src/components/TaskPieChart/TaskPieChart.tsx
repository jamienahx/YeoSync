import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Task {
    category: string;
}

interface TaskPieChartProps{

    tasks: Task [];
}

const TaskPieChart =(props: TaskPieChartProps) => {


    //category count {category: 2} is an empty pbject with key value pairs.
    //loop thru props.tasks
    //if the category exists, increment its count
    //if doesnt exist initialize it to 1.
    //expected input: [{category: "Performance"}, {category: "Meeting"},{category:"Performance"}]
    //expected out put for categorycount : {Performance: 2, Meeting: 1}

    const categoryCount : { [key: string]: number} ={};

    for (let i =0; i<props.tasks.length; i++) {
        let category = props.tasks[i].category;
        if(categoryCount[category]) {
            categoryCount[category]+=1;
        } else {
            categoryCount[category] =1;
        }
    }

  
    const data = {
        labels: Object.keys(categoryCount), //names of categories
        datasets: [ //charts.js always expects an array of datasets.
            {
            label: "Tasks per Category",
            data: Object.values(categoryCount),
            backgroundColor: [
            "#8884d8",
            "#82ca9d",
            "#ffc658",
            "#ff7f50",
            "#8dd1e1"
            ]
            }
        ]   
    }

    return(
        <div className="piechart-container">
            <div>
                <h3 className="piechart-title">Count of Tasks by Category</h3>
                <Pie data={data}/>
            </div>


        </div>

    )

}

export default TaskPieChart

