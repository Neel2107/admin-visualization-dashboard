import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const BarChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Average Likelihood',
        data: Object.values(data),
        backgroundColor: '#ff6384',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return   <div className="flex flex-col gap-5 p-10 rounded-md border ">

  <h1 className="text-lg font-semibold">Likelihood</h1>
   <Bar data={chartData} options={options} />
  </div>
};

export default BarChart;