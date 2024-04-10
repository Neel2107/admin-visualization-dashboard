"use client";
import React, { useEffect, useState } from "react";
import AreaChart from "./components/AreaChart/Area";
import BarChart from "./components/BarChart/Bar";
import Line from "./components/LineChart/Line";

import BubbleChart from "./components/Bubble/Bubble";
import PieChart from "./components/PieChart/PieChart";
import StackedBar from "./components/StackedBar/StackedBar";
import DoughnutChart from "./components/Doughnut/DoughnutChart";
import RadarChart from "./components/RadarChart/RadarChart";

export default function Home() {
  const [areaData, setAreaData] = useState([]);
  const [barData, setBarData] = useState([]);

  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [stackedBarData, setStackedBarData] = useState([]);
  const [bubbleData, setBubbleData] = useState([]);
  const [radarChartData, setRadarChartData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAreaData(data.map((item) => item.intensity).slice(0, 1000));

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

        const energyData = data
          .filter((item) => item.sector === "Energy" && item.intensity)
          .reduce((acc, item) => {
            acc[item.intensity] = (acc[item.intensity] || 0) + 1;
            return acc;
          }, {});

        const financialServicesData = data
          .filter(
            (item) => item.sector === "Financial services" && item.intensity
          )
          .reduce((acc, item) => {
            acc[item.intensity] = (acc[item.intensity] || 0) + 1;
            return acc;
          }, {});

        // Convert the counts objects to arrays of objects each with x, y, and r properties
        const energyChartData = Object.entries(energyData)
          .map(([x, count]) => ({
            x: Number(x),
            y: count,
            r: count / 2,
          }))
          .slice(0, 20);

        const financialServicesChartData = Object.entries(financialServicesData)
          .map(([x, count]) => ({
            x: Number(x),
            y: count,
            r: count / 2,
          }))
          .slice(0, 20);

        // Store the processed data in the state variable
        setBubbleData([
          {
            label: "Energy",
            data: energyChartData,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
          },
          {
            label: "Financial Services",
            data: financialServicesChartData,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
          },
        ]);

        // Filter out data for United States of America and group by topic
        const usaData = data.filter(
          (item) => item.country === "United States of America"
        );
        const topicCounts2 = usaData.reduce((acc, item) => {
          const topic = item.topic;
          if (topic) {
            acc[topic] = (acc[topic] || 0) + 1;
          }
          return acc;
        }, {});

        // Convert the counts object to an array of objects each with a topic and count property
        const radarChartData = Object.entries(topicCounts2).map(
          ([topic, count]) => ({
            topic,
            count,
          })
        );

        // Store the processed data in the state variable
        setRadarChartData(radarChartData);
      });
  }, []);

  return (
    <div className="flex flex-col gap-10 py-10 lg:w-2/3 lg:mx-auto  ">
      <StackedBar data={stackedBarData} />
      <Line data={lineData} />
      <AreaChart data={areaData} />
      <BarChart data={barData} />
      <RadarChart data={radarChartData} />
      <BubbleChart data={bubbleData} />
      <PieChart data={pieData} />
      {/* <DoughnutChart data={doughnutChartData} /> */}
    </div>
  );
}
