import React from 'react';
import { Bar } from 'react-chartjs-2';

const StackedBar = ({ data }) => {
  const years = Object.keys(data);
  const sectors = [...new Set(Object.values(data).flatMap(Object.keys))];

  const chartData = {
    labels: years,
    datasets: sectors.map((sector, i) => ({
      label: sector,
      data: years.map(year => data[year][sector] || 0),
      backgroundColor: `hsl(${i * 360 / sectors.length}, 70%, 50%)`,
    })),
  };

  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700 ">
        
      <h1 className="text-lg font-semibold" >
        Sectors By Region
      </h1>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBar;