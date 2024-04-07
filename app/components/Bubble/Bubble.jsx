import React from "react";
import { Bubble } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BubbleChart = ({ data }) => {
  console.log("data", data);

  const chartData = {
    datasets: [
      {
        label: 'Energy',
        data: data,
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const options = {
  layout: {
    padding: 0,
  },
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
      min: 0,
      max: 20,
    },
    y: {
      type: 'linear',
      min: 0,
      max: 100,
    },
    r: {
      type: 'linear',
      min: 0,
      max: 10,
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