import React from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import style from "./style.module.css";
import { joinCls } from "../../../src/utilities/text.utilities";
import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "../../../src/components/charts/barChart";
import LineChart from "../../../src/components/charts/lineChart";
import Select from "react-select";
import DUT1Page from "./SubPage/DUTPage1/DUT1Page.jsx";
import DUT2Page from "./SubPage/DUTPage2/DUT2Page.jsx";
import DUT3Page from "./SubPage/DUTPage3/DUT3Page.jsx";
import DUT4Page from "./SubPage/DUTPage4/DUT4Page.jsx";
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
        const response1 = await axios.get("http://localhost:8000/diagram/1");
        setData1(response1.data);
        const response2 = await axios.get("http://localhost:8000/diagram/2");
        setData2(response2.data);
        const response3 = await axios.get("http://localhost:8000/diagram/3");
        setData3(response3.data);
        const response4 = await axios.get("http://localhost:8000/diagram/4");
        setData4(response4.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [selectedDate, setSelectedDate] = useState("");

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [dayOffset, setDayOffset] = useState(-24);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    if (event.target.value === today()) {
      setDayOffset(-24);
    } else if (event.target.value === yesterday()) {
      setDayOffset(-48);
    }
  };

  const today = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return formatDate(date);
  };
  const yesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    return formatDate(date);
  };

  //Download data
  const handleDownload = () => {
    let data;
    if (activeComponent === "Component1") {
      data = data1;
    } else if (activeComponent === "Component2") {
      data = data2;
    } else if (activeComponent === "Component3") {
      data = data3;
    } else {
      data = data4;
    }
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.txt"); //
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  return (
    <div className={style["dashboard"]}>
      <div className="ms-5 mt-5">
        <button
          onClick={() => handleComponentClick("Component1")}
          className={
            activeComponent === "Component1" ? style["active"] : style[""]
          }
        >
          DUT 1
        </button>
        <button
          onClick={() => handleComponentClick("Component2")}
          className={
            activeComponent === "Component2" ? style["active"] : style[""]
          }
        >
          DUT 2
        </button>
        <button
          onClick={() => handleComponentClick("Component3")}
          className={
            activeComponent === "Component3" ? style["active"] : style[""]
          }
        >
          DUT 3
        </button>
        <button
          onClick={() => handleComponentClick("Component4")}
          className={
            activeComponent === "Component4" ? style["active"] : style[""]
          }
        >
          DUT 4
        </button>
        <button
          className={style["download-btn"]}
          onClick={handleDownload}
          disabled={Object.keys(data1).length !== 0 ? false : true}
        >
          Tải xuống dữ liệu
        </button>
        <select
          className="ms-1"
          value={selectedDate}
          onChange={handleDateChange}
        >
          <option value={today()}>{today()}</option>
          <option value={yesterday()}>{yesterday()}</option>
        </select>
      </div>
      {activeComponent === "Component1" && (
        <DUT1Page data={data1} day={dayOffset} />
      )}
      {activeComponent === "Component2" && (
        <DUT2Page data={data2} day={dayOffset} />
      )}
      {activeComponent === "Component3" && (
        <DUT3Page data={data3} day={dayOffset} />
      )}
      {activeComponent === "Component4" && (
        <DUT4Page data={data4} day={dayOffset} />
      )}
    </div>
  );
}

export default Dashboard;
