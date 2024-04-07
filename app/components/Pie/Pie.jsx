import React from "react";
import { Bubble } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const BubbleChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Bubble Chart',
        data: data.map((item, i) => ({
          x: i + 1,
          y: item.intensity,
          r: item.likelihood * 10,
        })),
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border">
      <h1 className="text-lg font-semibold">Bubble chart</h1>
      <Bubble data={chartData} />
    </div>
  );
};

export default BubbleChart;
