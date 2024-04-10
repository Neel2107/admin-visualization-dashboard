import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from "next-themes";

Chart.register(...registerables);

const PieChart = ({ data }) => {
  const { theme, setTheme } = useTheme();

  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: [
          "#FF6384", // Light Red
          "#36A2EB", // Light Blue
          "#FFCE56", // Light Yellow
          "#4BC0C0", // Turquoise
          "#9966FF", // Light Purple
          "#FF9F40", // Light Orange
          "#E6C200", // Gold
          "#5FAD56", // Green
          "#377DFF", // Bright Blue
          "#ED0DD9", // Pink
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "white" : "black",
        },
      },
    },
  };

  return (
    <div className="flex max-h-[85vh]  items-center flex-col gap-5 p-10 rounded-md border dark:border-zinc-700">
      <h1 className="text-lg self-start font-semibold">Topic Distribution</h1>

      <div style={{width: '500px', height: '500px'}}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
