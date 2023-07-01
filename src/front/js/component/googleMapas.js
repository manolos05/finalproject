import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Maps.css";

export const LocationSamples = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJZvuPMhRyzqRVJwbNwO2P03360jQy2V0",
  });
  const center = useMemo(() => ({ lat: -36.82699, lng: -73.04977 }), []);

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
        <Marker position={{ lat: -36.82699, lng: -73.04977  }} />
        </GoogleMap>
      )}
    </div>
  );
};