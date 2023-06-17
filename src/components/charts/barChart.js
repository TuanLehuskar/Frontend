import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import labelsTime from "./timeData";

ChartJS.register(
  BarElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const last7Objects = props.data.slice(props.volume);
  // const extractedTime = last7Objects.map((item) => item.date);
  const extractedValue = last7Objects.map((item) => item.value);
  const extractedTime = labelsTime;

  const data = {
    labels: extractedTime,
    datasets: [
      {
        label: `${props.label}`,
        data: extractedValue,
        borderWidth: 1,
        borderColor: `${props.borderColor}`,
        backgroundColor: `${props.backgroundColor}`,
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      <Bar data={data} height={200} options={options} />
    </div>
  );
};

export default BarChart;
