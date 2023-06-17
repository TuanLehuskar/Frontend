import React from "react";
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";

function Warning() {
  return (
    <div className={style["warning-wrap"]}>
      <div
        className={joinCls(
          "mx-3 row justify-content-between align-items-center",
          style["warning-component"]
        )}
      >
        <p className={joinCls("p-3 d-flex col-7", style["warning-content"])}>
          Vùng 1 đang có nồng độ bụi mịn trong không khí vượt ngưỡng cho phép
        </p>
        <button className="col-2 h-75 btn btn-primary me-3 px-1">
          Xem vị trí
        </button>
      </div>
    </div>
  );
}

export default Warning;
