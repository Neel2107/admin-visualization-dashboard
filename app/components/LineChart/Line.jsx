import React, { useState } from "react";
import { Line } from "react-chartjs-2";
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

const LineChart = ({ data }) => {
  const { theme } = useTheme();
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [selectedPestle, setSelectedPestle] = useState(null);

  const [startYearDropdownOpen, setStartYearDropdownOpen] = useState(false);
  const [endYearDropdownOpen, setEndYearDropdownOpen] = useState(false);
  const [pestleDropdownOpen, setPestleDropdownOpen] = useState(false);

  const years = Object.keys(data).sort();
  const pestles = [...new Set(Object.values(data).flatMap(Object.keys))];

  const chartData = {
    labels: years.filter(
      (year) =>
        (!startYear || year >= startYear) && (!endYear || year <= endYear)
    ),
    datasets: pestles
      .filter(
        (pestle) =>
          !selectedPestle ||
          selectedPestle === "All" ||
          pestle === selectedPestle
      )
      .map((pestle) => ({
        label: pestle,
        data: years.map((year) =>
          (!startYear || year >= startYear) && (!endYear || year <= endYear)
            ? data[year][pestle] || 0
            : null
        ),
        fill: false,
        borderColor: `hsl(${
          (pestles.indexOf(pestle) * 360) / pestles.length
        }, 70%, 50%)`,
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
          color: theme === "dark" ? "white" : "black",
        },
      },
    },
  };

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Pestle by Years</h1>
        <Dropdown onOpenChange={setStartYearDropdownOpen}>
          <DropdownTrigger>
            <Button variant="bordered">
              {startYear || "Select start year"}
              <ChevronDown
                style={{
                  transform: startYearDropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select start year">
            {years.slice(0, -1).map((year) => (
              <DropdownItem key={year} onClick={() => setStartYear(year)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        <Dropdown onOpenChange={setEndYearDropdownOpen}>
          <DropdownTrigger>
            <Button variant="bordered">
              {endYear || "Select end year"}
              <ChevronDown
                style={{
                  transform: endYearDropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select end year">
            {years.slice(1).map((year) => (
              <DropdownItem key={year} onClick={() => setEndYear(year)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Dropdown onOpenChange={setPestleDropdownOpen}>
          <DropdownTrigger>
            <Button variant="bordered">
              {selectedPestle || "Select pestle"}
              <ChevronDown
                style={{
                  transform: pestleDropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Select pestle">
            <DropdownItem key="All" onClick={() => setSelectedPestle("All")}>
              All
            </DropdownItem>
            {pestles.map((pestle) => (
              <DropdownItem
                key={pestle}
                onClick={() => setSelectedPestle(pestle)}
              >
                {pestle}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
