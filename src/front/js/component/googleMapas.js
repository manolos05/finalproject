import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Mapss.css";

export const LocationSamples = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAS4GlwLgGlAojRVr94SxhuGj66YX5pBt8",
  });
  const center = useMemo(() => ({ lat: -36.82699, lng: -73.04977 }), []);

  const [muestras, setMuestras] = useState("")
  const [selectedMarker, setSelectedMarker] = useState(null);


  useEffect(() => {
    try {
      const getMuestras = async () => {
        const resp = await fetch("http://localhost:3001/muestra")
        const data = await resp.json()
        setMuestras(data)
      };
      getMuestras();
    } catch (error) {
      console.log("error", error);
    };
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };


  return (
    <div className="App1">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          {muestras &&
            muestras.map((muestra) => (
              <Marker
                key={muestra.id}
                position={{ lat: Number(muestra.lat), lng: Number(muestra.lng) }}
                onClick={() => handleMarkerClick(muestra)}
              />
            ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: Number(selectedMarker.lat), lng: Number(selectedMarker.lng) }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div>
                <h3>{selectedMarker.specimen}</h3>
                <p>Estado: {selectedMarker.quality_specimen}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};