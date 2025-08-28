import { Bar } from 'react-chartjs-2'; //to render the chart
import {

    Chart as ChartJS,
    CategoryScale,  //X-axis
    LinearScale,  //Y-axis
    BarElement,  //the actual bar chart
    Tooltip,  //hover and show data
    Legend  //legend box 
} from 'chart.js';

import {useState} from 'react';
import TaskBoard from '../TaskBoard/TaskBoard';
import { useEffect } from 'react';
import  MemberBarChart from '../MemberBarChart/MemberBarChart';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

//register the bar elements before use

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Task {
  member: string;
  category: string;
  short_description: string;
  date: string;
}

const Dashboard = () => {

    const navigate = useNavigate();

     //sentiment analysis state
     //sentiment state will either be some josn like object Postive:10, Neutral: 50, Negative: 5 or null
    const [sentiment, setSentiment] = useState<{Positive: Number, Neutral: Number, Negative: Number} | null > (null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string |null>(null);


   //fetch sentiment


   const fetchSentiment = async() => {
    setLoading(true);
    setError(null);

   try{
    const response = await fetch('http://localhost:3000/sentiment')
    if(!response.ok){

        throw new Error('Server error');
    }
    const data = await response.json();
    setSentiment(data);
   }
    catch(err) {
    setError('Failed to fetch data');

   }
    setLoading(false);
   };


   //prepare the chart data

const chartData = sentiment
?{
    labels: ['Positive', 'Neutral', 'Negative'], //x axis
    datasets: [ //mandatory - tells typescript what is the data tp be received
    {
        label: 'Sentiment Scores', //name of the bar chart
        data: [sentiment.Positive, sentiment.Neutral, sentiment.Negative], //the actual value to be plotted
        backgroundColor: ['#4caf50','#ffca28','#f44336'] //bar colors 
    }
    ]
}
: null;  //set to null if the chart data object is falsy/dont exist. no rendering.



//date states where date().getMonth retruns you the current month and date().getFullYear shows the current year
 const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
 const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

 //swiping

 const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//swiping towards next month
//if we have reached december, set the month to january, increment the year by 1
//otherwise, set the month to the next month
const handleNextMonth = () => {

    if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev+1);
    } else {
        setCurrentMonth(prev => prev+1)
    }
}

//swiping towards prev month
//if we are in Jan, when it is swiped, decrement the month
//decrement the year

const handlePrevMonth = () => {

    if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(prev => prev-1);
    } else {
        setCurrentMonth(prev => prev-1)
    }
}


//tasks related code here

//initialize tasks to be an empty array
const [tasks, setTasks] = useState<Task[]>([]);

const fetchTasks = async() => {
    try{

        const response = await fetch('http://localhost:3000/dashboard/');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        setTasks(data);
    }
    catch(err){
        console.error(err);
    }
};

useEffect(()=> {
    fetchTasks();
}, []);

//create an object to group tasks by member eg member: Jennie short_desc = Rehearsal
const groupedBoards: {[member: string]: Task[]}={};

tasks.forEach(task => {
    //for every task, filter by the data, convert it into a date object
    const taskDate = new Date(task.date);

    //if the tasks of falls in the currently selected month and year
    if(
        taskDate.getMonth()===currentMonth &&
        taskDate.getFullYear()===currentYear
    ) {
        if(!groupedBoards[task.member]){ //create a new array for the member if an array for the member hasnt existed yet. this will be skipped if the member alreadyhas an array
            groupedBoards[task.member]=[]; 
        }
        groupedBoards[task.member].push(task); //push the task into the array grouped board becomes {member:Jennie , short desc: rehersal, date:}
    }
});

//Object.entries convert the groupedBoards into an array of key-value pairs ["jennie",[tasks array]]
//.map --> map each member into a new object with keys member & task -> ["jennie", [member:"jennie", short_desc: blablabla]]
const filteredBoards = Object.entries(groupedBoards).map(([member,tasks])=> ({
    member,
    tasks
}));  

const noTasksThisMonth = filteredBoards.every(board =>board.tasks.length ===0)




return (
<div className="dashboard-container">
    <div className="dashboard-content">
      <div className="button-container">
    <button onClick={fetchSentiment} disabled={loading} style ={{marginTop: '20px'}}>
        {loading? 'Loading...':'GetSentiment'}
      </button>
      </div>
        {error && <p style={{color: 'red'}}>{error}</p>} 

{/*if sentiment is truthym render the div and everything else. otherwise dont render */}
    {sentiment && (
        <div className="sentiment-chart-container">
          <h3>Sentiment Analysis Results:</h3>
          <div className="sentiment-chart-wrapper">
          {chartData && <Bar data = {chartData}/>}
          </div>
        </div>
      )}

{/*Month navigation */}
    <div className="month-navigation">

        <button onClick={handlePrevMonth}>Previous Month</button>
        <span>{monthNames[currentMonth]}{currentYear}</span>
        <button onClick = {handleNextMonth}>Next Month</button>
</div>
<div className="priority-button-wrapper">
    <button onClick={() => navigate('/priority')}>
      View Priority Tasks and Draft Notices
    </button>
  </div>
    <p className="instruction-text">
    Click on individual member cards to view full details
    </p>
      {noTasksThisMonth && (
        <p className="no-tasks-text">
            No assignments for the month
        </p>
      )}
      {/* within filtere boards, filter further into users*/}
    <div className="task-board-container">
        {filteredBoards.map((board, index)=>(
        <TaskBoard key = {index} member={board.member} tasks = {board.tasks}/> //passed member and tasks into the taskboard component
      ))}

    </div>

   <div className="member-bar-chart-container">
        
 <div className="member-bar-chart-wrapper">
{/*props to be passed to the memberbarchart component*/}
      <MemberBarChart
        filteredBoards = {filteredBoards}
        currentMonth = {currentMonth}
        currentYear = {currentYear}
        monthNames = {monthNames}
        />
        </div>
    </div>

    </div>
    </div>

);



}

export default Dashboard;