import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { joinCls } from "../../../../utilities/text.utilities";
import BarChart from "../../../../components/charts/barChart";
import LineChart from "../../../../components/charts/lineChart";
import axios from "axios";

function DUT1Page(props) {
  const data = props.data;

  return (
    <div className="overflow-hidden">
      <div className="row justify-content-around pt-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-5 mb-lg-0",
            style["dashboard-component"]
          )}
        >
          {data.temperature && (
            <LineChart
              data={data.temperature}
              label="℃"
              borderColor={"#ea5656"}
              backgroundColor="#ea5656"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">Nhiệt độ</p>
        </div>
        <div
          className={joinCls("col-lg-5 col-12", style["dashboard-component"])}
        >
          {data.humidity && (
            <LineChart
              data={data.humidity}
              borderColor={"#8cdadb"}
              backgroundColor="#8cdadb"
              label="%"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">Độ ẩm</p>
        </div>
      </div>
      <div className="row justify-content-around mt-5 pb-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-5 mb-lg-0",
            style["dashboard-component"]
          )}
        >
          {data.pm25 && (
            <LineChart
              data={data.pm25}
              borderColor={"#4a746e"}
              label="µm/m3"
              backgroundColor="#4a746e"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">
            Nồng độ bụi mịn PM 2.5
          </p>
        </div>
        <div
          className={joinCls("col-lg-5 col-12", style["dashboard-component"])}
        >
          {data.pm10 && (
            <LineChart
              data={data.pm10}
              borderColor={"#9ad1aa"}
              label="µm/m3"
              backgroundColor="#9ad1aa"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ bụi mịn PM 10</p>
        </div>
      </div>
      <div className="row justify-content-around mt-lg-5 mt-0 pb-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-5 mb-lg-0",
            style["dashboard-component"]
          )}
        >
          {data.CO && (
            <LineChart
              data={data.CO}
              borderColor={"#9fa180"}
              backgroundColor="#9fa180"
              label="ppm"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ khí CO</p>
        </div>
        <div
          className={joinCls("col-lg-5 col-12", style["dashboard-component"])}
        >
          {data.poisonGas && (
            <LineChart
              data={data.poisonGas}
              borderColor={"#8b76a5"}
              backgroundColor="#8b76a5"
              label="ppm"
              volume={props.day}
            />
          )}
          <p className="text-center mb-0 mt-2 fw-bold">
            Nồng độ các khí độc khác
          </p>
        </div>
      </div>
    </div>
  );
}

export default DUT1Page;
