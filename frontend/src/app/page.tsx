"use client";

import DashboardHeader from "@/components/dashboard_header";
import ChartSections from "@/components/chart_section";
import {
  CandlestickChart,
  LineChart,
  BarChart,
  PieChart,
} from "@/components/charts";

// server endpoints
const serverEndpoint = "http://127.0.0.1:8000"; // assuming to be localhost, change as necessary
const postfixUrl = [
  "/api/candlestick-data/",
  "/api/line-chart-data/",
  "/api/bar-chart-data/",
  "/api/pie-chart-data/",
];

export default function Dashboard() {
  const dashboardItems = [
    { url: "#randomlink1", title: "section1" },
    { url: "#randomlink2", title: "section2" },
  ];

  const chartItems = [
    {
      title: "Candlestick Chart",
      content: <CandlestickChart url={`${serverEndpoint}${postfixUrl[0]}`} />,
    },
    {
      title: "Line Chart",
      content: <LineChart url={`${serverEndpoint}${postfixUrl[1]}`} />,
    },
    {
      title: "Bar Chart",
      content: <BarChart url={`${serverEndpoint}${postfixUrl[2]}`} />,
    },
    {
      title: "Pie Chart",
      content: <PieChart url={`${serverEndpoint}${postfixUrl[3]}`} />,
    },
  ];

  return (
    <div className="h-dvh">
      <main className="flex-1 bg-white shadow">
        <DashboardHeader items={dashboardItems} />
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
        <ChartSections items={chartItems} />
      </main>
    </div>
  );
}
