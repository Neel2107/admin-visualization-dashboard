import React from "react";
import { PolarArea } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from "next-themes";

Chart.register(...registerables);

const PolarAreaChart = ({data}) => {
    const { theme } = useTheme();

    // Filter out the "oil" topic and process the data to fit the structure expected by the PolarArea component
    const processedData = data
        .filter(item => item.topic !== "oil")
        .map(item => ({
            label: item.topic,
            topic: item.count
        }));

    // Array of colors
    const colors = ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)', 'rgba(153, 102, 255, 0.5)', 'rgba(255, 159, 64, 0.5)'];

    const chartData = {
      labels: processedData.map((item) => item.label),
      datasets: [
        {
          label: 'My Dataset',
          data: processedData.map((item) => item.topic),
          backgroundColor: processedData.map((item, index) => colors[index % colors.length]),
          // borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
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

        <PolarArea data={chartData} options={options} />
        </div>
      </div>
    );
};

export default PolarAreaChart;