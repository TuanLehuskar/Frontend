import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { joinCls } from "../../../../utilities/text.utilities";
import TotalChart from "../../../../components/charts/totalChart";

function WeekPage1(props) {
  const data = props.data;
  // const dataCalculate = (data) => {
  //   const result = {};

  //   // Lặp qua từng trường dữ liệu (temperature, humidity, ...)
  //   for (const field in data) {
  //     result[field] = [];

  //     // Lặp qua 7 ngày trước đó
  //     for (let i = 0; i < 7; i++) {
  //       // Lấy 24 đối tượng đầu tiên của ngày hiện tại
  //       const dayData = data[field].slice(i * 24, (i + 1) * 24);

  //       // Tính giá trị min, max và average
  //       const values = dayData.map((item) => item.value);
  //       const min24 = Math.min(...values);
  //       const max24 = Math.max(...values);
  //       const avg24 = Number(
  //         (
  //           values.reduce((sum, value) => sum + value, 0) / values.length
  //         ).toFixed(1)
  //       );
  //       // Tạo đối tượng mới
  //       const newObj = {
  //         min: min24,
  //         max: max24,
  //         average: avg24,
  //       };

  //       // Thêm đối tượng vào mảng kết quả
  //       result[field].push(newObj);
  //     }
  //   }
  //   return result;
  // };
  // const finalData = dataCalculate(data);
  return (
    <div className="overflow-hidden">
      <div className="row justify-content-around pt-5">
        <div className={joinCls("col-5", style["dashboard-component"])}>
          {data.temperature && <TotalChart data={data.temperature} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nhiệt độ</p>
        </div>
        <div className={joinCls("col-5", style["dashboard-component"])}>
          {data.humidity && <TotalChart data={data.humidity} />}
          <p className="text-center mb-0 mt-2 fw-bold">Độ ẩm</p>
        </div>
      </div>
      <div className="row justify-content-around mt-5 pb-5">
        <div className={joinCls("col-5", style["dashboard-component"])}>
          {data.pm25 && <TotalChart data={data.pm25} />}
          <p className="text-center mb-0 mt-2 fw-bold">
            Nồng độ bụi mịn PM 2.5
          </p>
        </div>
        <div className={joinCls("col-5", style["dashboard-component"])}>
          {data.pm10 && <TotalChart data={data.pm10} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ bụi mịn PM 10</p>
        </div>
      </div>
      <div className="row justify-content-around mt-5 pb-5">
        <div className={joinCls("col-5", style["dashboard-component"])}>
          {data.CO && <TotalChart data={data.CO} />}
          <p className="text-center mb-0 mt-2 fw-bold">Nồng độ khí CO</p>
        </div>
        <div className={joinCls("col-5", style["dashboard-component"])}>
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
