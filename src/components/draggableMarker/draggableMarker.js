import React from "react";
import { useState, useRef, useMemo, useCallback } from "react";
import ReactDOM from "react-dom/client"; // nạp thư viện react-dom
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function DraggableMarker() {
  const center = {
    lat: 51.505,
    lng: -0.09,
  };
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? "Marker is draggable"
            : "Click here to make marker draggable"}
        </span>
      </Popup>
    </Marker>
  );
}

export default DraggableMarker;
