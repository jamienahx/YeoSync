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
      </div>
);
}

export default Dashboard;