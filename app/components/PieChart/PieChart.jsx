import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from 'next-themes';

Chart.register(...registerables);

const PieChart = ({ data }) => {

    const { theme, setTheme } = useTheme();

  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        data: data.map(item => item.value),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          // Add more colors if you have more data points
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? 'white' : 'black',
        },
      },
    },
  };

  return (
    <div className="flex max-h-[85vh]  items-center flex-col gap-5 p-10 rounded-md border dark:border-zinc-700">
      <h1 className="text-lg self-start font-semibold">Topic Distribution</h1>
     
        <Pie data={chartData} options={options} />
    
    </div>
  );
};

export default PieChart;