import React, { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from "axios";


import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineChart = () => {
  const [chart, setChart] = useState([]);

  useEffect(() => {
      getSaisons();
  }, [])

  const getSaisons = async () => {
      const res = await axios.get("http://localhost:3001/saisons")
      if (res.status === 200) {
          setChart(res.data);
      }
  };

  console.log("chart", chart);
  var data = {
    labels: chart?.map(x => x.saisonNumber),
    datasets: [{
      label: `Deaths`,
      data: chart?.map(x => x.deathsNumber),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2
    }]
  };

  var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (
    <div>
      <Line
        data={data}
        height={200}
        options={options}

      />
    </div>
  )
}

export default LineChart