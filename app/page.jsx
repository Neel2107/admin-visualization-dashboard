"use client";
import React, { useEffect, useState } from "react";
import AreaChart from "./components/AreaChart/Area";
import BarChart from "./components/BarChart/Bar";
import Line from "./components/LineChart/Line";
import MapChart from "./components/Pie/Pie";
import Pie from "./components/Pie/Pie";

export default function Home() {
  const [areaData, setAreaData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAreaData(data.map((item) => item.intensity).slice(0, 20));
        setBarData(data.map((item) => item.likelihood).slice(0, 20));
        setYearData(
          data
            .filter((item) => item.end_year)  
            .map((item) => item.end_year)
            .slice(0, 10)
        );
        // Count the number of data points for each country
        setPieData(data.slice(0, 20))
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 lg:w-2/3 lg:mx-auto  ">
      <AreaChart data={areaData} />
      <BarChart data={barData} />
      <Line data={yearData} />
      <Pie data={pieData} />
    </div>
  );
}
