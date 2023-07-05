import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { joinCls } from "../../../../utilities/text.utilities";
import TotalChart from "../../../../components/charts/totalChart";

function WeekPage1(props) {
  const data = props.data;
  return (
    <div className="overflow-hidden">
      <div className="row justify-content-around pt-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5",
            style["dashboard-component"]
          )}
        >
          {data.temperature && <TotalChart data={data.temperature} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nhiệt độ</p>
        </div>
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5 ",
            style["dashboard-component"]
          )}
        >
          {data.humidity && <TotalChart data={data.humidity} />}
          <p className="text-center mb-0 mt-2 fw-bold">Độ ẩm</p>
        </div>
      </div>
      <div className="row justify-content-around mt-lg-5 pb-lg-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5 ",
            style["dashboard-component"]
          )}
        >
          {data.pm25 && <TotalChart data={data.pm25} />}
          <p className="text-center mb-0 mt-2 fw-bold">
            Nồng độ bụi mịn PM 2.5
          </p>
        </div>
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5 ",
            style["dashboard-component"]
          )}
        >
          {data.pm10 && <TotalChart data={data.pm10} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ bụi mịn PM 10</p>
        </div>
      </div>
      <div className="row justify-content-around mt-lg-5 pb-lg-5">
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5 ",
            style["dashboard-component"]
          )}
        >
          {data.CO && <TotalChart data={data.CO} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ khí CO</p>
        </div>
        <div
          className={joinCls(
            "col-lg-5 col-12 mb-lg-0 mb-5 ",
            style["dashboard-component"]
          )}
        >
          {data.poisonGas && <TotalChart data={data.poisonGas} />}
          <p className="text-center mb-0 mt-2 fw-bold">
            Nồng độ các khí độc khác
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeekPage1;
