import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useTheme } from "next-themes";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

Chart.register(...registerables);

const BarChart = ({ data }) => {
  const { theme } = useTheme();
  const [selectedOption, setSelectedOption] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: "Likelihood",
        data: data.map((item) => item["likelihood"]),
        backgroundColor: "rgb(255, 99, 132)",
        hidden: selectedOption !== "All" && selectedOption !== "Likelihood",
      },
      {
        label: "Relevance",
        data: data.map((item) => item["relevance"]),
        backgroundColor: "rgb(75, 192, 192)",
        hidden: selectedOption !== "All" && selectedOption !== "Relevance",
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
          color: theme === "dark" ? "white" : "black",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Data Distribution</h1>
        <Dropdown onOpenChange={setDropdownOpen}>
          <DropdownTrigger>
            <Button variant="bordered">
              {selectedOption === "All" ? "Select" : selectedOption}
              <ChevronDown
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select option">
            <DropdownItem key="All" onClick={() => setSelectedOption("All")}>
              All
            </DropdownItem>
            <DropdownItem
              key="Likelihood"
              onClick={() => setSelectedOption("Likelihood")}
            >
              Likelihood
            </DropdownItem>
            <DropdownItem
              key="Relevance"
              onClick={() => setSelectedOption("Relevance")}
            >
              Relevance
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;
