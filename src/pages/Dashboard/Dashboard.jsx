import React from "react"; // nạp thư viện react
import style from "./style.module.css";
import { joinCls } from "../../../src/utilities/text.utilities";
import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../../../src/components/charts/barChart";
import LineChart from "../../../src/components/charts/lineChart";
import DUT1Page from "./SubPage/DUTPage1/DUT1Page.jsx";
import DistrictSelector from "../../components/districtLocating/districtLocating.jsx";
import mockData from "../../components/mockData";
import WeekPage1 from "./WeekPage/WeekPage1/WeekPage1.jsx";
function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const handleComponentClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [data4, setData4] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`${process.env.HOST}/diagram/1`);
        setData1(response1.data);
        const response2 = await axios.get(`${process.env.HOST}/diagram/2`);
        setData2(response2.data);
        const response3 = await axios.get(`${process.env.HOST}/diagram/3`);
        setData3(response3.data);
        const response4 = await axios.get(`${process.env.HOST}/diagram/4`);
        setData4(response4.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handlePrevDownload = (data) => {
    const newObject = {};

    for (let field in data) {
      const fieldArray = data[field];
      const lastObjects = fieldArray.slice(-24); // Lấy 24 đối tượng cuối cùng của mảng
      const modifiedObjects = lastObjects.map((obj, index) => {
        const modifiedObj = { ...obj };

        // Thay đổi giá trị trường time từ 0h đến 23h
        modifiedObj.time = `${index.toString().padStart(2, "0")}:00`;

        // Đặt giá trị trường date là ngày hôm qua
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        modifiedObj.date = formatDate(yesterday);

        return modifiedObj;
      });
      newObject[field] = modifiedObjects;
    }
    return newObject;
  };
  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  //Download data
  const handleDownload = () => {
    let data;
    if (activeComponent === "Component1") {
      if (selectedOption === "1") {
        data = handlePrevDownload(data1);
      }
    } else if (activeComponent === "Component2") {
      if (selectedOption === "1") {
        data = handlePrevDownload(data2);
      }
    } else if (activeComponent === "Component3") {
      if (selectedOption === "1") {
        data = handlePrevDownload(data3);
      }
    } else {
      if (selectedOption === "1") {
        data = handlePrevDownload(data4);
      }
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv"); //
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  const [selectedOption, setSelectedOption] = useState("1");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
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
    <div className={style["dashboard"]}>
      <div className="pt-5 d-flex container">
        <DistrictSelector
          districts={mockData}
          selectedDistrict={selectedDistrict}
          selectedWard={selectedWard}
          onChangeDistrict={handleDistrictChange}
          onChangeWard={handleWardChange}
        />
      </div>
      <div className="">
        {!selectedDistrict || !selectedWard ? (
          <div
            className={joinCls(
              "container d-flex justify-content-between align-items-center",
              style[""]
            )}
          >
            <p className="mb-0">Vui lòng chọn khu vực</p>
          </div>
        ) : selectedDistrict === "quan_lien_chieu" &&
          selectedWard === "phuong_hoa_khanh_bac" ? (
          <div className="container mt-3">
            <button
              onClick={() => handleComponentClick("Component1")}
              className={
                activeComponent === "Component1" ? style["active"] : style[""]
              }
            >
              HKB-1
            </button>
            <button
              onClick={() => handleComponentClick("Component2")}
              className={
                activeComponent === "Component2" ? style["active"] : style[""]
              }
            >
              HKB-2
            </button>
            <button
              onClick={() => handleComponentClick("Component3")}
              className={
                activeComponent === "Component3" ? style["active"] : style[""]
              }
            >
              HKB-3
            </button>
            <button
              onClick={() => handleComponentClick("Component4")}
              className={
                activeComponent === "Component4" ? style["active"] : style[""]
              }
            >
              HKB-Center
            </button>

            <select
              className="ms-1 me-3"
              value={selectedOption}
              onChange={handleOptionChange}
            >
              <option value="1">1 ngày</option>
              <option value="7">7 ngày</option>
            </select>
            <button
              className={style["download-btn"]}
              onClick={handleDownload}
              disabled={Object.keys(data1).length !== 0 ? false : true}
            >
              Tải xuống dữ liệu
            </button>

            {selectedOption === "7" ? (
              <div className="">
                {activeComponent === "Component1" && <WeekPage1 data={data1} />}
                {activeComponent === "Component2" && <WeekPage1 data={data2} />}
                {activeComponent === "Component3" && <WeekPage1 data={data3} />}
                {activeComponent === "Component4" && <WeekPage1 data={data4} />}
              </div>
            ) : (
              <div>
                {activeComponent === "Component1" && (
                  <DUT1Page data={data1} day={24} />
                )}
                {activeComponent === "Component2" && (
                  <DUT1Page data={data2} day={24} />
                )}
                {activeComponent === "Component3" && (
                  <DUT1Page data={data3} day={24} />
                )}
                {activeComponent === "Component4" && (
                  <DUT1Page data={data4} day={24} />
                )}
              </div>
            )}
          </div>
        ) : (
          <div
            className={joinCls(
              "container d-flex justify-content-between align-items-center",
              style[""]
            )}
          >
            <p className="mb-0">Khu vực chưa khả thi</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
