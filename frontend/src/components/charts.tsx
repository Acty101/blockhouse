import React, { useEffect, useState } from "react";
import { Chart, Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  ChartOptions,
  ChartData,
  FinancialDataPoint,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Filler,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  CandlestickController,
  CandlestickElement
);

interface ChartProp {
  url: string;
}

interface DatasetDetails {
  backgroundColor: string | string[];
  borderColor: string | string[];
  borderWidth: number;
}

interface GenericChartProps {
  url: string;
  // eslint-disable-next-line
  ChartComponent: React.FC<any>;
  dataset: DatasetDetails[];
  options?: ChartOptions;
}

interface CandlestickData {
  x: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface FetchedChartData {
  labels: string[];
  data: number[];
}

const borderColors = [
  "rgba(255, 99, 132, 1)", // Red
  "rgba(54, 162, 235, 1)", // Blue
  "rgba(255, 206, 86, 1)", // Yellow
  "rgba(75, 192, 192, 1)", // Green
  "rgba(153, 102, 255, 1)", // Purple
  "rgba(255, 159, 64, 1)", // Orange
];
const bgColors = [
  "rgba(255, 99, 132, 0.2)", // Red
  "rgba(54, 162, 235, 0.2)", // Blue
  "rgba(255, 206, 86, 0.2)", // Yellow
  "rgba(75, 192, 192, 0.2)", // Green
  "rgba(153, 102, 255, 0.2)", // Purple
  "rgba(255, 159, 64, 0.2)", // Orange
];

/**
 *
 * @param data: array of objects following candlestickData interface
 * @returns a formatted version of the data for candlestick type chart to use
 */
function convertData(data: CandlestickData[]): FinancialDataPoint[] {
  return data.map((item) => ({
    x: new Date(item.x).getTime(),
    o: item.open,
    h: item.high,
    l: item.low,
    c: item.close,
  }));
}

/**
 * @returns a random number between 0 (inclusive) and the length of borderColors (exclusive)
 */
function randomNumber() {
  return Math.floor(Math.random() * borderColors.length);
}

/**
 *
 * @param url - url to fetch information from
 * @returns a candlestick chart
 */
export function CandlestickChart({ url }: ChartProp) {
  const [candle, setCandle] = useState<FinancialDataPoint[]>();

  // wrap in useEffect
  useEffect(() => {
    let ignoreStaleRequest = false; // to prevent race conditions
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (!ignoreStaleRequest) {
          setCandle(convertData(data.data));
        }
      })
      .catch((error) => console.log(error));
    return () => {
      ignoreStaleRequest = true;
    };
  }, [url]);

  if (!candle) return <div>Loading chart data, please wait...</div>;
  const candlestickData: ChartData = {
    datasets: [
      {
        label: "CandlestickChart",
        data: candle,
        borderColor: borderColors[randomNumber()],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          source: "auto",
        },
      },
      y: {
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };
  return <Chart type="candlestick" data={candlestickData} options={options} />;
}

/**
 *
 * @param url - url to fetch data from
 * @param type - one of "bar" | "line" | "pie"
 * @param option - options object
 * @returns a speciallized type of chart depending on type
 */
function BasicGenericChart({
  url,
  ChartComponent,
  dataset,
  options,
}: GenericChartProps) {
  const [chartData, setChartData] = useState<FetchedChartData>();
  useEffect(() => {
    let ignoreStaleRequest = false; // to prevent race conditions
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        if (!ignoreStaleRequest) {
          setChartData(data);
        }
      })
      .catch((error) => console.log(error));
    return () => {
      ignoreStaleRequest = true;
    };
  }, [url]);

  if (!chartData) return <div>Loading chart data, please wait...</div>;

  return (
    <ChartComponent
      data={{
        labels: chartData.labels,
        datasets: [{ ...dataset[0], data: chartData.data }],
      }}
      options={options}
    />
  );
}

/**
 *
 * @param url - url to fetch information from
 * @returns a line graph component
 */
export function LineChart({ url }: ChartProp) {
  const index = randomNumber();
  const data = [
    {
      backgroundColor: bgColors[index],
      borderColor: borderColors[index],
      borderWidth: 1,
    },
  ];
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
      },
    },
  };
  return (
    <BasicGenericChart
      url={url}
      ChartComponent={Line}
      dataset={data}
      options={options}
    />
  );
}

/**
 *
 * @param url - url to fetch information from
 * @returns a bar graph component
 */
export function BarChart({ url }: ChartProp) {
  const index = randomNumber();
  const data = [
    {
      backgroundColor: bgColors[index],
      borderColor: borderColors[index],
      borderWidth: 1,
    },
  ];
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
      },
    },
  };
  return (
    <BasicGenericChart
      url={url}
      ChartComponent={Bar}
      dataset={data}
      options={options}
    />
  );
}

export function PieChart({ url }: ChartProp) {
  const data = [
    {
      backgroundColor: bgColors,
      borderColor: borderColors,
      borderWidth: 1,
    },
  ];
  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
      },
    },
  };
  return (
    <BasicGenericChart
      url={url}
      ChartComponent={Pie}
      dataset={data}
      options={options}
    />
  );
}
