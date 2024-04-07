import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from 'next-themes';

Chart.register(...registerables);

const LineChart = ({ data }) => {
  const { theme } = useTheme();

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Years",
        data: Object.values(data),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 2000,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? 'white' : 'black',
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700 ">
      <h1 className="text-lg font-semibold" >Years</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;