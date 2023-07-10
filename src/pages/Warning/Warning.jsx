import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import { MAP_PAGE_PATH } from "../Map/constant";
import mockData from "../../components/mockData";
import DistrictSelector from "../../components/districtLocating/districtLocating.jsx";
import axios from "axios";
function Warning() {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  const modifyData = (data) => {
    const modifiedData = { ...data };
    for (let field in modifiedData) {
      const fieldArray = modifiedData[field];
      if (Array.isArray(fieldArray)) {
        modifiedData[field] = fieldArray.map((obj) => {
          if (obj && obj.hasOwnProperty("timeStamp")) {
            const originalTimeStamp = new Date(obj.timeStamp);
            const modifiedTimeStamp = new Date(
              originalTimeStamp.getTime() + 7 * 60 * 60
            );
            const date = modifiedTimeStamp.toLocaleDateString();
            const time = modifiedTimeStamp.toLocaleTimeString();
            return { ...obj, date, time };
          }
          return obj;
        });
      }
    }
    return modifiedData;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${process.env.HOST}/warning/1`);
        setData1(response1.data);
        const response2 = await axios.get(`${process.env.HOST}/warning/2`);
        setData2(response2.data);
        const response3 = await axios.get(`${process.env.HOST}/warning/3`);
        setData3(response3.data);
        const response4 = await axios.get(`${process.env.HOST}/warning/4`);
        setData4(response4.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
  const data1Final = modifyData(data1);
  const data2Final = modifyData(data2);
  const data3Final = modifyData(data3);
  const data4Final = modifyData(data4);
  const handleResetClick = async () => {
    try {
      // Gọi lại dữ liệu mới từ backend và cập nhật dữ liệu vào các biến data1, data2, data3, data4
      const response1 = await axios.get(`${process.env.HOST}/warning/1`);
      setData1(response1.data);
      const response2 = await axios.get(`${process.env.HOST}/warning/2`);
      setData2(response2.data);
      const response3 = await axios.get(`${process.env.HOST}/warning/3`);
      setData3(response3.data);
      const response4 = await axios.get(`${process.env.HOST}/warning/4`);
      setData4(response4.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleClearHistoryClick = () => {
    setData1({});
    setData2({});
    setData3({});
    setData4({});
  };

  return (
    <div className="container">
      {" "}
      <div
        className={joinCls(
          "row align-items-center justify-content-around mt-lg-2",
          style["warning-wrap"]
        )}
      >
        {" "}
        <div className="col-12 col-lg-6 align-items-center">
          {" "}
          <DistrictSelector
            districts={mockData}
            selectedDistrict={selectedDistrict}
            selectedWard={selectedWard}
            onChangeDistrict={handleDistrictChange}
            onChangeWard={handleWardChange}
          />
        </div>
        <button
          onClick={handleResetClick}
          className={joinCls("col-8 col-lg-2 mt-3", style["clear-btn"])}
        >
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>
        <button
          onClick={handleClearHistoryClick}
          className={joinCls("col-8 col-lg-2 mt-3", style["clear-btn"])}
        >
          Xóa lịch sử
        </button>
      </div>
      <div className="container">
        <div>
          {!selectedDistrict || !selectedWard ? (
            <div className={joinCls("m-3 p-3", style["warning-component"])}>
              <p className="mb-0 text-center">Vui lòng chọn khu vực</p>
            </div>
          ) : selectedDistrict === "quan_lien_chieu" &&
            selectedWard === "phuong_hoa_khanh_bac" ? (
            <div>
              {data1Final.pm25 && data1Final.pm25.length !== 0 && (
                <div className="row">
                  {data1Final.pm25.map((item, index) => (
                    <div
                      className={joinCls(
                        "col-12 d-flex justify-content-around align-items-center",
                        style["warning-box"]
                      )}
                      key={index}
                    >
                      <p className="mb-0">
                        Nồng độ bụi mịn PM 2.5 ở vị trí HBK-1 ở mức gây hại cho
                        sức khỏe
                      </p>
                      <span>
                        {" "}
                        {item.time} {item.date}
                      </span>
                      <Link
                        className={style["move-btn"]}
                        to={`${MAP_PAGE_PATH}?lat=16.076344&lng=108.15216&zoom=17`}
                      >
                        Xem vị trí
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {data1Final.pm10 && data1Final.pm10.length !== 0 && (
                <div className="row">
                  {data1Final.pm10.map((item, index) => (
                    <div
                      className={joinCls(
                        "col-12 d-flex justify-content-around align-items-center",
                        style["warning-box"]
                      )}
                      key={index}
                    >
                      <p className="mb-0">
                        Nồng độ bụi mịn PM 10 ở vị trí HBK-1 ở mức gây hại cho
                        sức khỏe
                      </p>
                      <span>
                        {" "}
                        {item.time} {item.date}
                      </span>
                      <Link
                        className={style["move-btn"]}
                        to={`${MAP_PAGE_PATH}?lat=16.076344&lng=108.15216&zoom=17`}
                      >
                        Xem vị trí
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {data1Final.CO && data1Final.CO.length !== 0 && (
                <div className="row">
                  {data1Final.CO.map((item, index) => (
                    <div
                      className={joinCls(
                        "col-12 d-flex justify-content-around align-items-center",
                        style["warning-box"]
                      )}
                      key={index}
                    >
                      <p className="mb-0">
                        Nồng độ khí CO ở vị trí HBK-1 ở mức gây hại cho sức khỏe
                      </p>
                      <span>
                        {" "}
                        {item.time} {item.date}
                      </span>
                      <Link
                        className={style["move-btn"]}
                        to={`${MAP_PAGE_PATH}?lat=16.076344&lng=108.15216&zoom=17`}
                      >
                        Xem vị trí
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {data1Final.poisonGas && data1Final.poisonGas.length !== 0 && (
                <div className="row">
                  {data1Final.poisonGas.map((item, index) => (
                    <div
                      className={joinCls(
                        "col-12 d-flex justify-content-around align-items-center",
                        style["warning-box"]
                      )}
                      key={index}
                    >
                      <p className="mb-0">
                        Nồng độ khí độc khác ở vị trí HBK-1 ở mức gây hại cho
                        sức khỏe
                      </p>
                      <span>
                        {" "}
                        {item.time} {item.date}
                      </span>
                      <Link
                        className={style["move-btn"]}
                        to={`${MAP_PAGE_PATH}?lat=16.076344&lng=108.15216&zoom=17`}
                      >
                        Xem vị trí
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              {data2Final.pm25 && data2Final.pm25.length !== 0 && (
                <div className="row">
                  {data2Final.pm25.map((item, index) => (
                    <div
                      className={joinCls(
                        "col-12 d-flex justify-content-around align-items-center",
                        style["warning-box"]
                      )}
                      key={index}
                    >
                      <p className="mb-0">
                        Nồng độ bụi mịn PM 2.5 ở vị trí HBK-2 ở mức gây hại cho
                        sức khỏe
                      </p>
                      <span>
                        {" "}
                        {item.time} {item.date}
                      </span>
                      <Link
                        className={style["move-btn"]}
                        to={`${MAP_PAGE_PATH}?lat=16.09004&lng=108.146262&zoom=17`}
                      >
                        Xem vị trí
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
