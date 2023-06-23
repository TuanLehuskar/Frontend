import React from "react";
import { Chart } from "react-chartjs-2";

const CandlestickChart = () => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    if (chartRef && chartRef.current) {
      Chart.register({
        id: "customCandlestick",
        afterDraw: (chart) => {
          const ctx = chart.ctx;
          const datasets = chart.data.datasets;

          datasets.forEach((dataset) => {
            if (dataset.type === "customCandlestick") {
              const meta = chart.getDatasetMeta(
                chart.data.datasets.indexOf(dataset)
              );
              const elements = meta.data;

              elements.forEach((element, index) => {
                const datasetIndex = element.datasetIndex;
                const model = element.model;
                const x = model.x;
                const open = dataset.data[index].open;
                const high = dataset.data[index].high;
                const low = dataset.data[index].low;
                const close = dataset.data[index].close;

                ctx.beginPath();
                ctx.strokeStyle = dataset.borderColor || "black";
                ctx.lineWidth = dataset.borderWidth || 1;
                ctx.moveTo(x, high);
                ctx.lineTo(x, low);
                ctx.stroke();

                ctx.fillStyle =
                  close >= open
                    ? dataset.colorPositive || "green"
                    : dataset.colorNegative || "red";
                ctx.fillRect(x - 5, close, 10, open - close);
                ctx.strokeRect(x - 5, close, 10, open - close);
              });
            }
          });
        },
      });
    }
  }, []);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Candlestick",
        type: "customCandlestick",
        data: [
          { open: 100, high: 150, low: 80, close: 120 },
          { open: 120, high: 180, low: 90, close: 150 },
          { open: 150, high: 200, low: 120, close: 180 },
          { open: 180, high: 220, low: 150, close: 200 },
          { open: 160, high: 190, low: 110, close: 130 },
          { open: 130, high: 170, low: 100, close: 140 },
        ],
        borderColor: "black",
        borderWidth: 1,
        colorPositive: "green",
        colorNegative: "red",
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  return (
    <div>
      <canvas ref={chartRef} />
      <Chart type="customCandlestick" data={chartData} options={chartOptions} />
    </div>
  );
};

export default CandlestickChart;
