import React from "react";
import { Bubble } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BubbleChart = ({ data }) => {
  console.log("bubble data", data);
  const chartData = {
    datasets: [
      {
        label: 'Bubble Chart',
        data: data.map((item) => ({
          x: item.x,
          y: item.y,
          r: item.r,
        })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
    
  };

  const options = {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
      },
    
    },

  
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border">
      <h1 className="text-lg font-semibold">Bubble chart</h1>
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChart;