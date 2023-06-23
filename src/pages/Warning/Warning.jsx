import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import { MAP_PAGE_PATH } from "../Map/constant";
import mockData from "../../components/mockData";
import DistrictSelector from "../../components/districtLocating/districtLocating.jsx";
function Warning() {
  const [toastMessages, setToastMessages] = useState([]);
  useEffect(() => {
    // Lấy danh sách toast messages từ localStorage
    const storedToastMessages = localStorage.getItem("toastMessages");
    if (storedToastMessages) {
      const parsedToastMessages = JSON.parse(storedToastMessages);
      setToastMessages(parsedToastMessages);
    }
  }, []);
  const navigate = useNavigate();
  const moveToLocation = (path) => {
    // Chuyển hướng tới trang Map với thông tin vị trí truyền qua URL
    navigate(MAP_PAGE_PATH);
  };
  const [localStorageCleared, setLocalStorageCleared] = useState(false);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setLocalStorageCleared(true);
    setToastMessages([]);
  };

  useEffect(() => {
    const clearLocalStorageAtMidnight = () => {
      const now = new Date();
      const midnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0
      ); // Lấy thời điểm 00:00 hôm sau

      const timeUntilMidnight = midnight - now;

      setTimeout(() => {
        localStorage.clear();
        clearLocalStorageAtMidnight(); // Thiết lập lại xóa localStorage vào 00:00 hôm sau
      }, timeUntilMidnight);
    };

    clearLocalStorageAtMidnight(); // Bắt đầu xóa localStorage vào 00:00

    // Xóa localStorage khi component unmount (khi rời khỏi trang)
    return () => {
      localStorage.clear();
    };
  }, []);
  return (
    <div className={joinCls("container", style["warning-wrap"])}>
      <DistrictSelector districts={mockData} />
      <button className="mt-3" onClick={handleClearLocalStorage}>
        {" "}
        Xóa lịch sử{" "}
      </button>
      {toastMessages.map((toastMessage) => (
        <div
          className={joinCls(
            "d-flex mx-3 justify-content-between align-items-center my-3 p-3",
            style["warning-component"]
          )}
          key={toastMessage.id}
        >
          <p className="mb-0">{toastMessage.message}</p>
          {/* <button onclick={() => moveToLocation(toastMessage.path)}>
            Xem vị trí
          </button>
          <Link
            onClick={() => handleOnClick(toastMessage.path)}
            to={MAP_PAGE_PATH}
          >
            123{" "}
          </Link> */}
        </div>
      ))}
    </div>
  );
}

export default Warning;
