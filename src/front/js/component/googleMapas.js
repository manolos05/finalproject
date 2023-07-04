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
                <h3>{selectedMarker.image_specimen}</h3>
                <p>Especie: {selectedMarker.specimen}</p>
                <p>Estado: {selectedMarker.quality_specimen}</p>
                <a href={selectedMarker.project_name} target="_planl">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                  </svg>
                </a>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};