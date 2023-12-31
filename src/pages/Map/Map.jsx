import React, { useState, useEffect, useRef } from "react"; // nạp thư viện react
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import style from "./style.module.css";
import { joinCls } from "../../utilities/text.utilities";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "./images/pin.png";
import markerIcon2 from "./images/placeholder.png";
import axios from "axios";
import GetLocationButton from "../../components/locationMarker/LocationMarker.jsx";
import { setToastToLocalStorage } from "../../components/toastMessage/toastUtils";
import { useLocation } from "react-router-dom";
function Map() {
  const markers = [
    {
      id: 1,
      geoCode: [16.076344, 108.15216],
      popup: "HKB-1",
    },
    {
      id: 2,
      geoCode: [16.09004, 108.146262],
      popup: "HKB-2",
    },
    {
      id: 3,
      geoCode: [16.076239, 108.126125],
      popup: "HKB-3",
    },
    {
      id: 4,
      geoCode: [16.080747, 108.140488],
      popup: "HKB-Center",
    },
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
      const response = await axios.post(`${process.env.HOST}/click`, {
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
  const [permanentData, setPermanentData] = useState({});
  const handleMarkerClick = async (markerId) => {
    try {
      // Gọi API Axios về backend với ID của marker
      const response = await axios.get(
        `${process.env.HOST}/api/markers/${markerId}`
      );
      const data = response.data;
      const resultObject = data;
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
    const COThresholds = [100, 100, 100, 100];
    const poisonGasThresholds = [50, 50, 50, 50];
    const markerPagePathThresholds = [
      [16.09004, 108.146262],
      [16.073119, 108.151242],
      [16.076239, 108.126125],
      [16.080747, 108.140488],
    ];
    const intervals = markerIds.map((markerId, index) => {
      const pm25Threshold = pm25Thresholds[index];
      const pm10Threshold = pm10Thresholds[index];
      const COThreshold = COThresholds[index];
      const poisonGasThreshold = poisonGasThresholds[index];
      const markerPagePathThreshold = markerPagePathThresholds[index];

      const interval = setInterval(() => {
        checkWarning(
          markerId,
          pm25Threshold,
          pm10Threshold,
          COThreshold,
          poisonGasThreshold,
          markerPagePathThreshold
        );
      }, 300000);

      return interval;
    });

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);
  const checkWarning = async (
    markerId,
    pm25Threshold,
    pm10Threshold,
    COThreshold,
    poisonGasThreshold,
    markerPagePathThreshold
  ) => {
    try {
      // Gọi API Axios về backend với ID của marker
      const response = await axios.get(
        `${process.env.HOST}/api/markers/${markerId}`
      );
      const data = response.data;
      if (data.pm25 >= pm25Threshold) {
        const currentDate = new Date().toLocaleString();
        const message = `Nồng độ bụi mịn PM 2.5 ở vị trí HKB-${markerId} ở mức gây hại sức khỏe!`;
        // Lưu trữ toast message vào localStorage
        const toastMessage = {
          id: `pm25-${markerId}`,
          message: message,
          time: currentDate,
          timestamp: Date.now(),
          path: markerPagePathThreshold,
        };
        setToastToLocalStorage(toastMessage);
      }

      if (data.pm10 >= pm10Threshold) {
        const currentDate = new Date().toLocaleString();
        const message = `Nồng độ bụi thô PM 10 ở vị trí HKB-${markerId} ở mức gây hại sức khỏe!`;
        // Lưu trữ toast message vào localStorage
        const toastMessage = {
          id: `pm10-${markerId}`,
          message: message,
          time: currentDate,
          timestamp: Date.now(),
          path: markerPagePathThreshold,
        };
        setToastToLocalStorage(toastMessage);
      }

      if (data.CO >= COThreshold) {
        const currentDate = new Date().toLocaleString();
        const message = `Nồng độ khí CO ở vị trí HKB-${markerId} ở mức gây hại sức khỏe!`;
        // Lưu trữ toast message vào localStorage
        const toastMessage = {
          id: `CO-${markerId}`,
          message: message,
          time: currentDate,
          timestamp: Date.now(),
          path: markerPagePathThreshold,
        };
        setToastToLocalStorage(toastMessage);
      }

      if (data.poisonGas >= poisonGasThreshold) {
        const currentDate = new Date().toLocaleString();
        const message = `Nồng độ khí độc ở vị trí HKB-${markerId} ở mức gây hại sức khỏe!`;
        // Lưu trữ toast message vào localStorage
        const toastMessage = {
          id: `poisonGas-${markerId}`,
          message: message,
          time: currentDate,
          timestamp: Date.now(),
          path: markerPagePathThreshold,
        };
        setToastToLocalStorage(toastMessage);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.HOST}/`);
      } catch (error) {
        console.error(error);
      }
    };
    const intervalTime = 15000;
    const interval = setInterval(getData, intervalTime);

    return () => clearInterval(interval);
  }, []);
  //Locate
  const [location, setLocation] = useState(null);
  ////
  const newLocation = useLocation();
  const searchParams = new URLSearchParams(newLocation.search);

  // Lấy giá trị các tham số từ URL
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));
  const zoom = parseInt(searchParams.get("zoom"));
  function MapViewport() {
    const map = useMap();

    useEffect(() => {
      if (lat && lng && zoom) {
        map.flyTo([lat, lng], zoom);
      }
    }, [lat, lng, zoom, map]);

    return null;
  }
  return (
    <div className={style["map"]}>
      <MapContainer
        className={joinCls("", style["map-wrap"])}
        center={[16.0544, 108.2022]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <MapViewport />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker) => (
          <Marker
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
              </div>
            </Popup>
          </Marker>
        ))}
        {markerPosition && (
          <Marker icon={customIcon2} position={markerPosition}>
            <Popup offset={[-8, -20]}>
              <div>Selected Position</div>
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
              "col-lg-2 col-5 mb-lg-0 mb-3 p-2 text-white position-relative",
              style["box-wrap-1"]
            )}
          >
            <div className="text-center">
              <i className="fa-brands fa-blackberry me-2"></i>
              PM 2.5
            </div>
            <div className={joinCls("text-center", style["tem-text"])}>
              {dataMakers.interpolationPM25 || permanentData.pm25}
            </div>
            <div className={style["unit-common-position"]}>μm/m3</div>
          </div>
          <div
            className={joinCls(
              "col-lg-2 col-5 mb-lg-0 mb-3 p-2 text-white position-relative",
              style["box-wrap-2"]
            )}
          >
            <div className="text-center">
              <i className="fa-brands fa-blackberry me-2"></i>
              PM 10
            </div>
            <div className={joinCls("text-center", style["tem-text"])}>
              {dataMakers.interpolationPM10 || permanentData.pm10}
            </div>
            <div className={style["unit-common-position"]}>μm/m3</div>
          </div>
          <div
            className={joinCls(
              "col-lg-2 col-5 mb-lg-0 mb-3 p-2 text-white position-relative",
              style["box-wrap-3"]
            )}
          >
            <div className="text-center">
              <i className="fa-solid fa-smog me-2"></i>
              CO
            </div>
            <div className={joinCls("text-center", style["tem-text"])}>
              {dataMakers.interpolationCO || permanentData.CO}
            </div>
            <div className={style["unit-common-position"]}>ppm</div>
          </div>
          <div
            className={joinCls(
              "col-lg-2 col-5 mb-lg-0 mb-3 p-2 text-white position-relative",
              style["box-wrap-4"]
            )}
          >
            <div className="text-center">
              <i className="fa-solid fa-virus me-2"></i>
              Poison Gas
            </div>
            <div
              className={joinCls("text-center mt-2 mt-lg-0", style["tem-text"])}
            >
              {dataMakers.interpolationPoisonGas || permanentData.poisonGas}
            </div>
            <div className={style["unit-common-position"]}>ppm</div>
          </div>
          <div className={joinCls("col-lg-3 col-9", style["box-wrap-5"])}>
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
                <div
                  className={joinCls(
                    "text-center mt-2 mt-lg-0",
                    style["tem-text"]
                  )}
                >
                  {dataMakers.interpolationTemperature ||
                    permanentData.temperature}
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
                <div
                  className={joinCls(
                    "text-center mt-2 mt-lg-0",
                    style["tem-text"]
                  )}
                >
                  {dataMakers.interpolationHumidity || permanentData.humidity}
                </div>
                <div className={style["unit-position"]}>%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Map;
