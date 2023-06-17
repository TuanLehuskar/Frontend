import React, { useState, useEffect } from "react"; // nạp thư viện react
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import {
  MapContainer,
  LayerControl,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  useMapEvents,
} from "react-leaflet";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "./images/pin.png";
import markerIcon2 from "./images/placeholder.png";
import { DASHBOARD_PAGE_PATH } from "../Dashboard/constant";
import { Link } from "react-router-dom";
import axios from "axios";
import { DUT_1_PAGE_PATH } from "../Dashboard/SubPage/DUTPage1/constant";
import { DUT_2_PAGE_PATH } from "../Dashboard/SubPage/DUTPage2/constant";
import { DUT_3_PAGE_PATH } from "../Dashboard/SubPage/DUTPage3/constant";
import { DUT_4_PAGE_PATH } from "../Dashboard/SubPage/DUTPage4/constant";
import GetLocationButton from "../../components/locationMarker/LocationMarker.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Map() {
  const markers = [
    {
      id: 1,
      geoCode: [16.07489869581357, 108.15175951170275],
      popup: "DUT-1",
      path: DUT_1_PAGE_PATH,
    },
    {
      id: 2,
      geoCode: [16.0757176185992, 108.153703320611],
      popup: "DUT-2",
      path: DUT_2_PAGE_PATH,
    },
    {
      id: 3,
      geoCode: [16.077086462870547, 108.15213504320542],
      popup: "DUT-3",
      path: DUT_3_PAGE_PATH,
    },
    {
      id: 4,
      geoCode: [16.0759008729407, 108.15245570733465],
      popup: "DUT-center",
      path: DUT_4_PAGE_PATH,
    },
    // { id: 5, geoCode: [16.061063, 108.223943], popup: "Rong Bridge" },
    // { id: 6, geoCode: [16.071766, 108.223955], popup: "Han Bridge" },
    // { id: 7, geoCode: [16.049439, 108.222323], popup: "Tran Thi Ly Bridge" },
  ];
  const customIcon = L.icon({
    iconUrl: `${markerIcon}`,
    iconSize: [38, 38],
    iconAnchor: [20, 20],
  });
  const customIcon2 = L.icon({
    iconUrl: `${markerIcon2}`,
    iconSize: [36, 36],
    iconAnchor: [25, 36],
  });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [dataMakers, setDataMarkers] = useState([]);
  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    setMarkerPosition({ lat, lng });

    try {
      const response = await axios.post("http://localhost:8000/click", {
        lat,
        lng,
        markers: markers,
      });
      setDataMarkers(JSON.parse(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  function ClickHandler() {
    useMapEvents({
      click: handleMapClick,
    });

    return null;
  }
  const [circleColor, setCircleColor] = useState("green");
  const [permanentData, setPermanentData] = useState({});
  const handleMarkerClick = async (markerId) => {
    try {
      // Gọi API Axios về backend với ID của marker
      const response = await axios.get(
        `http://localhost:8000/api/markers/${markerId}`
      );
      const data = response.data;
      const temperatureValues = data.temperature.map((item) => item.value);
      const humidityValues = data.humidity.map((item) => item.value);
      const pm25Values = data.pm25.map((item) => item.value);
      const pm10Values = data.pm10.map((item) => item.value);
      const COValues = data.CO.map((item) => item.value);
      const poisonGasValues = data.poisonGas.map((item) => item.value);

      const lastTemperatureValue = temperatureValues.pop();
      const lastHumidityValue = humidityValues.pop();
      const lastPM25Value = pm25Values.pop();
      const lastPM10Value = pm10Values.pop();
      const lastCOValue = COValues.pop();
      const lastPoisonGasValue = poisonGasValues.pop();

      const resultObject = {
        lastTemperature: lastTemperatureValue,
        lastHumidity: lastHumidityValue,
        lastPM25: lastPM25Value,
        lastPM10: lastPM10Value,
        lastCO: lastCOValue,
        lastPoisonGas: lastPoisonGasValue,
      };
      const maxValue = Math.max(
        lastTemperatureValue,
        lastHumidityValue,
        lastPM25Value,
        lastCOValue,
        lastPoisonGasValue
      );
      setPermanentData(resultObject);
      setDataMarkers([]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const markerIds = [1, 2, 3, 4]; // ID của các marker cần kiểm tra
    const pm25Thresholds = [36, 36, 36, 36]; // Ngưỡng PM 2.5 tương ứng cho từng marker
    const pm10Thresholds = [155, 155, 155, 155]; // Ngưỡng PM 10 tương ứng cho từng marker

    const intervals = markerIds.map((markerId, index) => {
      const pm25Threshold = pm25Thresholds[index];
      const pm10Threshold = pm10Thresholds[index];

      const interval = setInterval(() => {
        // Gọi hàm kiểm tra cảnh báo
        checkWarning(markerId, pm25Threshold, pm10Threshold);
      }, 15000);

      return interval;
    });

    // Trả về một hàm trong useEffect để dọn dẹp tất cả các interval khi component unmount
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);
  const checkWarning = async (markerId, pm25Threshold, pm10Threshold) => {
    try {
      // Gọi API Axios về backend với ID của marker
      const response = await axios.get(
        `http://localhost:8000/api/markers/${markerId}`
      );
      const data = response.data;
      const pm25Values = data.pm25.map((item) => item.value);
      const pm10Values = data.pm10.map((item) => item.value);

      const lastPM25Value = pm25Values.pop();
      const lastPM10Value = pm10Values.pop();

      if (lastPM25Value >= pm25Threshold) {
        toast.error(
          `Nồng độ bụi mịn PM 2.5 ở vị trí DUT-${markerId} ở mức gây hại sức khỏe!`
        );
      } else if (lastPM10Value >= pm10Threshold) {
        toast.error(
          `Nồng độ bụi thô PM 10 ở vị trí DUT-${markerId} ở mức gây hại sức khỏe!`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Locate
  const [location, setLocation] = useState(null);
  return (
    <div className={style["map"]}>
      <MapContainer
        className={joinCls("", style["map-wrap"])}
        center={[16.0544, 108.2022]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
            // onClick={() => handleMarkerClick(marker.id)}
            eventHandlers={{
              click: () => handleMarkerClick(marker.id),
            }}
            key={marker.id}
            position={marker.geoCode}
            icon={customIcon}
          >
            <Popup offset={[-8, -10]}>
              <div>
                <p>{marker.popup}</p>
                Hello
              </div>
              <Link to={marker.path}>Xem thêm</Link>
            </Popup>
          </Marker>
        ))}
        <Circle center={[16.0759008729407, 108.15245570733465]} radius={150} />/
        <Circle
          center={[16.0759008729407, 108.15245570733465]}
          radius={15}
          fillColor={circleColor}
          fillOpacity={0.3}
        />
        <Circle
          center={[16.077086462870547, 108.15213504320542]}
          radius={15}
          fillColor={circleColor}
          fillOpacity={0.3}
        />
        <Circle
          center={[16.0757176185992, 108.153703320611]}
          radius={15}
          fillColor={circleColor}
          fillOpacity={0.3}
        />
        <Circle
          center={[16.07489869581357, 108.15175951170275]}
          radius={15}
          fillColor={circleColor}
          fillOpacity={0.3}
        />
        <Circle center={[16.061063, 108.223943]} radius={15} />
        <Circle center={[16.071766, 108.223955]} radius={15} />
        <Circle center={[16.049439, 108.222323]} radius={15} />
        {markerPosition && (
          <Marker icon={customIcon2} position={markerPosition}>
            <Popup offset={[-8, -20]}>
              <div>Hello</div>
              <Link to={DASHBOARD_PAGE_PATH}>Xem thêm</Link>
            </Popup>
          </Marker>
        )}
        <ClickHandler />
        <GetLocationButton setLocation={setLocation} />
        {location && (
          <Marker icon={customIcon} position={location}>
            <Popup>Current Position</Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="mx-5 mb-2 overflow-hidden mt-3">
        <div className="row justify-content-around">
          <div
            className={joinCls(
              "col-2 p-2 text-white position-relative",
              style["box-wrap-1"]
            )}
          >
            <div className="text-center">
              <i className="fa-brands fa-blackberry me-2"></i>
              PM 2.5
            </div>
            <div className={joinCls("text-center", style["tem-text"])}>
              {dataMakers.interpolationPM25 || permanentData.lastPM25}
            </div>
            <div className={style["unit-common-position"]}>μm/m3</div>
          </div>
          <div
            className={joinCls(
              "col-2 p-2 text-white position-relative",
              style["box-wrap-2"]
            )}
          >
            <div className="text-center">
              <i className="fa-brands fa-blackberry me-2"></i>
              PM 10
            </div>
            <div className={joinCls("text-center", style["tem-text"])}>
              {dataMakers.interpolationPM10 || permanentData.lastPM10}
            </div>
            <div className={style["unit-common-position"]}>μm/m3</div>
          </div>
          <div
            className={joinCls(
              "col-2 p-2 text-white position-relative",
              style["box-wrap-3"]
            )}
          >
            <div className="text-center">
              <i className="fa-solid fa-smog me-2"></i>
              CO
            </div>
            <div className="text-center">
              {dataMakers.interpolationCO || permanentData.lastCO}
            </div>
            <div className={style["unit-common-position"]}>ppm</div>
          </div>
          <div
            className={joinCls(
              "col-2 p-2 text-white position-relative",
              style["box-wrap-4"]
            )}
          >
            <div className="text-center">
              <i className="fa-solid fa-virus me-2"></i>
              Poison Gas
            </div>
            <div className="text-center">
              {dataMakers.interpolationPoisonGas || permanentData.lastPoisonGas}
            </div>
            <div className={style["unit-common-position"]}>ppm</div>
          </div>
          <div className={joinCls("col-3", style["box-wrap-5"])}>
            <div className="row">
              <div
                className={joinCls(
                  "col-6 p-2 position-relative",
                  style["temperature"]
                )}
              >
                <i
                  className={joinCls(
                    "fa-solid fa-temperature-three-quarters me-1",
                    style["icon"]
                  )}
                ></i>
                Temperature
                <div className={joinCls("text-center", style["tem-text"])}>
                  {dataMakers.interpolationTemperature ||
                    permanentData.lastTemperature}
                </div>
                <div className={style["unit-position"]}>°C</div>
              </div>
              <div
                className={joinCls(
                  "col-6 p-2 position-relative",
                  style["humidity"]
                )}
              >
                <i
                  className={joinCls("fa-solid fa-droplet me-3", style["icon"])}
                ></i>
                Humidity
                <div className={joinCls("text-center", style["tem-text"])}>
                  {dataMakers.interpolationHumidity ||
                    permanentData.lastHumidity}
                </div>
                <div className={style["unit-position"]}>%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Map;
