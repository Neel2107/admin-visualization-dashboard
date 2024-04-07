import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from 'next-themes';

Chart.register(...registerables);

const LineChart = ({ data }) => {
  const { theme } = useTheme();

  const years = Object.keys(data).sort();
  const pestles = [...new Set(Object.values(data).flatMap(Object.keys))];

  const chartData = {
    labels: years,
    datasets: pestles.map((pestle, i) => ({
      label: pestle,
      data: years.map(year => data[year][pestle] || 0),
      fill: false,
      borderColor: `hsl(${i * 360 / pestles.length}, 70%, 50%)`,
    })),
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
      <h1 className="text-lg font-semibold" >Pestle by Years</h1>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;