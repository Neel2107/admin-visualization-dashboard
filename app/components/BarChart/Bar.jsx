import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from 'next-themes';

Chart.register(...registerables);

const BarChart = ({ data }) => {
  const { theme } = useTheme();

  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Likelihood",
        data: data.map((item) => item.likelihood),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Relevance",
        data: data.map((item) => item.relevance),
        backgroundColor: "rgb(75, 192, 192)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
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
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700">
      <h1 className="text-lg font-semibold">Likelihood</h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;