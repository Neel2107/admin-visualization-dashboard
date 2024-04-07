"use client";
import React, { useEffect, useState } from "react";
import AreaChart from "./components/AreaChart/Area";
import BarChart from "./components/BarChart/Bar";
import Line from "./components/LineChart/Line";

import BubbleChart from "./components/Bubble/Bubble";
import PieChart from "./components/PieChart/PieChart";

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
        const filteredData = data.filter(item => item.likelihood && item.relevance && item.intensity);

        setAreaData(data.map((item) => item.intensity).slice(0, 20));
    
        setBarData(
          data
            .map((item) => ({
              likelihood: item.likelihood,
              relevance: item.relevance,
            }))
            .slice(0, 20)
        );
        setYearData(
          data
            .filter((item) => item.end_year)
            .map((item) => item.end_year)
            .slice(0, 10)
        );
      
        const topics = data.map(item => item.pestle).filter(topic => topic);
        const topicCounts = topics.reduce((acc, topic) => {
          acc[topic] = (acc[topic] || 0) + 1;
          return acc;
        }, {});
  
        const pieData = Object.entries(topicCounts).map(([label, value]) => ({ label, value }));
  
        setPieData(pieData.slice(0, 100));
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 lg:w-2/3 lg:mx-auto  ">
      <AreaChart data={areaData} />
      <BarChart data={barData} />
      <Line data={yearData} />
      {/* <BubbleChart data={pieData} /> */}
      <PieChart data={pieData} />
    </div>
  );
}
