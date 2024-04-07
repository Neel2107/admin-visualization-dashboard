"use client";
import React, { useEffect, useState } from "react";
import AreaChart from "./components/AreaChart/Area";
import BarChart from "./components/BarChart/Bar";
import Line from "./components/LineChart/Line";

import BubbleChart from "./components/Bubble/Bubble";
import PieChart from "./components/PieChart/PieChart";
import StackedBar from "./components/StackedBar/StackedBar";
import DoughnutChart from "./components/Doughnut/DoughnutChart";

export default function Home() {
  const [areaData, setAreaData] = useState([]);
  const [barData, setBarData] = useState([]);

  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stackedBarData, setStackedBarData] = useState([]);
  const [doughnutChartData, setDoughnutChartData] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAreaData(data.map((item) => item.intensity).slice(0, 20));

        setBarData(
          data
            .map((item) => ({
              likelihood: item.likelihood,
              relevance: item.relevance,
            }))
            .slice(0, 20)
        );

        const topics = data.map((item) => item.pestle).filter((topic) => topic);
        const topicCounts = topics.reduce((acc, topic) => {
          acc[topic] = (acc[topic] || 0) + 1;
          return acc;
        }, {});

        const pieData = Object.entries(topicCounts).map(([label, value]) => ({
          label,
          value,
        }));

        setPieData(pieData.slice(0, 100));

        const regionSectorCounts = data.reduce((acc, item) => {
          const region = item.region;
          const sector = item.sector;
          if (region && sector) {
            if (!acc[region]) {
              acc[region] = {};
            }
            acc[region][sector] = (acc[region][sector] || 0) + 1;
          }
          return acc;
        }, {});

        const sortedRegions = Object.entries(regionSectorCounts)
          .sort(
            (a, b) =>
              Object.values(b[1]).reduce((a, b) => a + b) -
              Object.values(a[1]).reduce((a, b) => a + b)
          )
          .slice(0, 6)
          .reduce(
            (acc, [region, sectors]) => ({ ...acc, [region]: sectors }),
            {}
          );

        setStackedBarData(sortedRegions);

        const filteredData = data.filter(
          (item) => item.pestle !== "Economic" && item.pestle !== "Industries"
        );
        const pestleYearCounts = filteredData.reduce((acc, item) => {
          const year = item.start_year;
          const pestle = item.pestle;
          if (year && pestle) {
            if (!acc[year]) {
              acc[year] = {};
            }
            acc[year][pestle] = (acc[year][pestle] || 0) + 1;
          }
          return acc;
        }, {});

        setLineData(pestleYearCounts);

        const counts = data
          .filter(
            (item) =>
              (item.sector === "Energy" ||
                item.sector === "Financial services") &&
              item.intensity
          )
          .reduce((acc, item) => {
            acc[item.intensity] = (acc[item.intensity] || 0) + 1;
            return acc;
          }, {});

        const chartData = Object.entries(counts)
          .map(([x, count]) => ({
            x: Number(x),
            y: count,
            r: count / 2,
          }))
          .slice(0, 20);

        setBubbleData(chartData);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 lg:w-2/3 lg:mx-auto  ">
      <Line data={lineData} />
      <StackedBar data={stackedBarData} />
      <AreaChart data={areaData} />
      <BarChart data={barData} />
      <BubbleChart data={bubbleData} />
      <PieChart data={pieData} />
      {/* <DoughnutChart data={doughnutChartData} /> */}
    </div>
  );
}
