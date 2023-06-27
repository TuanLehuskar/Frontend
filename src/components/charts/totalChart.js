import React from "react";
import { Bar } from "react-chartjs-2";
import sevenDaysAgo from "./date";
function TotalChart({ data }) {
  const chartData = {
    labels: sevenDaysAgo,
    datasets: [
      {
        label: "Average",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: data.map((item) => item.average),
      },
      {
        label: "Min",
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.6)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data.map((item) => item.min),
      },
      {
        label: "Max",
        backgroundColor: "rgba(54,162,235,0.4)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54,162,235,0.6)",
        hoverBorderColor: "rgba(54,162,235,1)",
        data: data.map((item) => item.max),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={chartData} height={200} options={options} />;
}

export default TotalChart;
