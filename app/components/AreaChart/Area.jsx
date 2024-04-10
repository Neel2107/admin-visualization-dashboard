import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from 'next-themes';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

Chart.register(...registerables);

const AreaChart = ({ data }) => {
  const { theme } = useTheme();
  const [numPoints, setNumPoints] = useState(10);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (value) => {
    setNumPoints(value);
  };

  const chartData = {
    labels: data.slice(0, numPoints).map((_, i) => i + 1),
    datasets: [
      {
        label: "Intensity",
        data: data.slice(0, numPoints),
        fill: true,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
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
        <div className="flex flex-row items-center justify-between">
      <h1 className="text-lg font-semibold">Intensity</h1>
      <Dropdown onOpenChange={setDropdownOpen}>
        <DropdownTrigger>
          <Button variant="bordered">
            {numPoints}
            <ChevronDown
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Select points"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={new Set([numPoints.toString()])}
          onSelectionChange={(keys) => handleChange(Number(Array.from(keys)[0]))}
        >
          <DropdownItem key="10">10</DropdownItem>
          <DropdownItem key="20">20</DropdownItem>
          <DropdownItem key="50">50</DropdownItem>
          <DropdownItem key="80">80</DropdownItem>
          <DropdownItem key="100">100</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AreaChart;