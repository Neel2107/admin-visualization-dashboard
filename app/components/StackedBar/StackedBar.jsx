import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDown } from "lucide-react";

const StackedBar = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const years = Object.keys(data);
  const sectors = [...new Set(Object.values(data).flatMap(Object.keys))];

  const chartData = {
    labels: years.filter(
      (year) =>
        selectedItems.size === 0 ||
        selectedItems.has("All") ||
        selectedItems.has(year)
    ),
    datasets: sectors.map((sector, i) => ({
      label: sector,
      data: years
        .filter(
          (year) =>
            selectedItems.size === 0 ||
            selectedItems.has("All") ||
            selectedItems.has(year)
        )
        .map((year) => data[year][sector] || 0),
      backgroundColor: `hsl(${(i * 360) / sectors.length}, 70%, 50%)`,
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

  const selectedValue = Array.from(selectedItems)
    .join(", ")
    .replaceAll("_", " ");

  return (
    <div className="flex flex-col gap-5 p-10 rounded-md border dark:border-zinc-700 ">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg font-semibold">Sectors By Region</h1>
        <Dropdown onOpenChange={setDropdownOpen}>
          <DropdownTrigger>
            <Button variant="bordered" className="capitalize">
              Select Regions
              <ChevronDown
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.3s ease-in-out",
                }}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Select years"
            variant="flat"
            closeOnSelect={false}
            disallowEmptySelection
            selectionMode="multiple"
            selectedKeys={selectedItems}
            onSelectionChange={setSelectedItems}
          >
            <DropdownItem
              key="All"
              onClick={() =>
                selectedItems.has("All")
                  ? setSelectedItems(new Set())
                  : setSelectedItems(new Set(["All"]))
              }
            >
              All
            </DropdownItem>
            {years.map((year) => (
              <DropdownItem key={year}>{year}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default StackedBar;
