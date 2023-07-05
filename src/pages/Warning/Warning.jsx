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

  return (
    <div className="container">
      <div
        className={joinCls(
          "row align-items-center justify-content-around mt-lg-2",
          style["warning-wrap"]
        )}
      >
        <div className="col-12 col-lg-6 align-items-center">
          <DistrictSelector
            districts={mockData}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            onChangeDistrict={handleDistrictChange}
            onChangeWard={handleWardChange}
          />
        </div>
        <button
          className={joinCls("col-8 col-lg-2 mt-3", style["clear-btn"])}
          onClick={handleReset}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>
        <button
          onClick={handleClearLocalStorage}
          className={joinCls("col-8 col-lg-2 mt-3", style["clear-btn"])}
        >
          Xóa lịch sử
        </button>
      </div>
      <div className="">
        <div>
          {!selectedDistrict || !selectedWard ? (
            <div className={joinCls("m-3 p-3", style["warning-component"])}>
              <p className="mb-0 text-center">Vui lòng chọn khu vực</p>
            </div>
          ) : selectedDistrict === "quan_lien_chieu" &&
            selectedWard === "phuong_hoa_khanh_bac" ? (
            data &&
            data.map((item, index) => (
              <div className={joinCls("row", style["warning-box"])} key={index}>
                <div className="col-6">{item.message}</div>
                <div className="col-3">{item.time}</div>
                <div className="col-2">
                  {/* <button onClick={() => handleMoveBtnClicked(item.path)}>
                    Xem vị trí
                  </button> */}
                  <Link
                    to={`${MAP_PAGE_PATH}?lat=${item.path[0]}&lng=${item.path[1]}&zoom=17`}
                  >
                    Move
                  </Link>
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
