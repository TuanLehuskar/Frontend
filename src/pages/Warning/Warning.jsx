import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import { MAP_PAGE_PATH } from "../Map/constant";
import mockData from "../../components/mockData";
import DistrictSelector from "../../components/districtLocating/districtLocating.jsx";
function Warning() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFromLocalStorage = () => {
      const localStorageData = JSON.parse(
        localStorage.getItem("toastMessages")
      );
      if (localStorageData) {
        setData(localStorageData);
      }
    };

    fetchDataFromLocalStorage();
  }, []);
  const handleClearLocalStorage = () => {
    localStorage.removeItem("toastMessages");
    setData([]);
  };
  const handleReset = () => {
    const localStorageData = JSON.parse(localStorage.getItem("toastMessages"));
    if (localStorageData) {
      setData(localStorageData);
    }
  };
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setSelectedDistrict(selectedDistrict);
    setSelectedWard("");
  };

  const handleWardChange = (event) => {
    const selectedWard = event.target.value;
    setSelectedWard(selectedWard);
  };
  const navigate = useNavigate();

  const handleMoveBtnClicked = (coordinates) => {
    navigate(MAP_PAGE_PATH, { state: { coordinates: coordinates, zoom: 17 } });
  };
  return (
    <div className="container">
      <div
        className={joinCls(
          "d-flex align-items-center justify-content-around mt-2",
          style["warning-wrap"]
        )}
      >
        <div className="d-flex align-items-center">
          <DistrictSelector
            districts={mockData}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            onChangeDistrict={handleDistrictChange}
            onChangeWard={handleWardChange}
          />
          <button className={style["clear-btn"]} onClick={handleReset}>
            <i className="fa-solid fa-arrow-rotate-right"></i>
          </button>
        </div>
        <button
          onClick={handleClearLocalStorage}
          className={style["clear-btn"]}
        >
          Xóa lịch sử
        </button>
      </div>
      <div className="">
        <div>
          {!selectedDistrict || !selectedWard ? (
            <div
              className={joinCls(
                "d-flex mx-3 justify-content-between align-items-center my-3 p-3",
                style["warning-component"]
              )}
            >
              <p className="mb-0">Vui lòng chọn khu vực</p>
            </div>
          ) : selectedDistrict === "quan_lien_chieu" &&
            selectedWard === "phuong_hoa_khanh_bac" ? (
            data &&
            data.map((item, index) => (
              <div className={joinCls("row", style["warning-box"])} key={index}>
                <div className="col-6">{item.message}</div>
                <div className="col-3">{item.time}</div>
                <div className="col-2">
                  <button onClick={() => handleMoveBtnClicked(item.path)}>
                    Xem vị trí
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className={joinCls(
                "d-flex mx-3 justify-content-between align-items-center my-3 p-3",
                style["warning-component"]
              )}
            >
              <p className="mb-0">Khu vực chưa khả thi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Warning;
