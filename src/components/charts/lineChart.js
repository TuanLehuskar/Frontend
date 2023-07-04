import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import labelsTime from "./timeData";

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const last7Objects = props.data;
  const extractedValue = last7Objects.map((item) => item.value);
  const extractedTime = labelsTime;
  const data = {
    labels: extractedTime,
    datasets: [
      {
        label: `${props.label}`,
        data: extractedValue,
        borderWidth: 2,
        backgroundColor: `${props.borderColor}`,
        borderColor: `${props.backgroundColor}`,
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
      <Line data={data} height={200} options={options} />
    </div>
  );
};

export default LineChart;
