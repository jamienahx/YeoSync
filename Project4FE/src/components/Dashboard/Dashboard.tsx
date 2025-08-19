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

//register the bar elements before use

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);


const Dashboard = () => {

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
    const response = await fetch('http://localhost:3000/api/sentiment')
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


//hardcoded data for testing
const hardcodedBoards = [
  {
    member: "Jisoo",
    tasks: [
      { category: "Performance", short_description: "Award show performance", date: "2025-08-01" },
      { category: "Video Shoot", short_description: "Behind-the-scenes video", date: "2025-08-02" }
    ]
  },
  {
    member: "Jennie",
    tasks: [
      { category: "Rehearsal", short_description: "Dance video filming", date: "2025-08-03" },
      { category: "Rehearsal", short_description: "Award show performance", date: "2025-09-03" }
    ]
  },
  {
    member: "Rose",
    tasks: [
      { category: "Performance", short_description: "Live Concert in Goyang", date: "2025-08-04" }
    ]
  },
  {
    member: "Lisa",
    tasks: [
      { category: "Meeting", short_description: "Meeting with Na PD", date: "2025-08-04" }
    ]
  }
];

const filteredBoards = hardcodedBoards.map(board =>({
    ...board,
    tasks: board.tasks.filter(task => {
        const taskDate = new Date(task.date);
        return (
            taskDate.getMonth() === currentMonth &&
            taskDate.getFullYear() ===currentYear
        );
    })
}));

const noTasksThisMonth = filteredBoards.every(board =>board.tasks.length ===0)

return (
<div>
    <button onClick={fetchSentiment} disabled={loading} style ={{marginTop: '20px'}}>
        {loading? 'Loading...':'GetSentiment'}
      </button>
        {error && <p style={{color: 'red'}}>{error}</p>} 

{/*if sentiment is truthym render the div and everything else. otherwise dont render */}
    {sentiment && (
        <div style={{marginTop: '20px', maxWidth: '500px'}}>
          <h3>Sentiment Analysis Results:</h3>
          {chartData && <Bar data = {chartData}/>}
        </div>
      )}

{/*Month navigation */}
    <div style = {{marginTop: '20px'}}>

        <button onClick={handlePrevMonth}>Previous Month</button>
        <span style = {{ margin: '0 10px'}}>{monthNames[currentMonth]}{currentYear}</span>
        <button onClick = {handleNextMonth}>Next Month</button>
</div>
      {noTasksThisMonth && (
        <p style={{color: 'red', fontWeight:'bold', marginTop: '20px'}}>
            No assignments for the month
        </p>
      )}
      {/* within filtere boards, filter further into users*/}
    <div style={{display:'flex', gap: '20px', flexWrap: 'wrap'}}>
        {filteredBoards.map((board, index)=>(
        <TaskBoard key = {index} member={board.member} tasks = {board.tasks}/>
      ))}

    </div>

      
      </div>
);



}

export default Dashboard;