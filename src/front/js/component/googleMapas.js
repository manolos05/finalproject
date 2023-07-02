import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Mapss.css";

export const LocationSamples = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBJZvuPMhRyzqRVJwbNwO2P03360jQy2V0",
  });
  const center = useMemo(() => ({ lat: -36.82699, lng: -73.04977 }), []);

  const [muestras, setMuestras] = useState("")


  const [coord, SetCoord] = useState({})

  const newMuestras = () => {
    let newCoord = [...muestras]
    const newFormat = newCoord.map(obj => {
      const lat = Number(obj.lat);
      const lng = Number(obj.lng)
      return ({ lat: `${lat}`, lat: `${lng}` })
      SetCoord(newFormat)
    })


  }




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
          {muestras.length !== 0 ?

            (coord.map((cod, i) => {
              return [
                <div key={i}>
                  <Marker position={cod} />

                </div>

              ]

            })) : (<></>)

          }


        </GoogleMap>
      )}
    </div>
  );
};