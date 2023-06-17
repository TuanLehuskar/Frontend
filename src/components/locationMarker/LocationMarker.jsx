import React from "react";
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

const GetLocationButton = ({ setLocation }) => {
  const map = useMapEvents({
    locationfound(e) {
      const { lat, lng } = e.latlng;
      map.flyTo(e.latlng, 17); // Zoom đến vị trí hiện tại với mức zoom là 13
      setLocation(e.latlng); // Cập nhật vị trí cho Marker
    },
  });

  const getLocation = () => {
    map.locate();
  };

  return (
    <button className={style["locate-button"]} onClick={getLocation}>
      <i className="fa-solid fa-location-dot"></i>
    </button>
  );
};

export default GetLocationButton;
