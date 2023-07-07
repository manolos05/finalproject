import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useform";

import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import { useMemo } from "react";
import "./Maps1.css";
import moment from 'moment'

export const UserGetMuestra = () => {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAS4GlwLgGlAojRVr94SxhuGj66YX5pBt8",
  });
  const center = useMemo(() => ({ lat: -36.82699, lng: -73.04977 }), []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };



  const [muestras, setMuestras] = useState("")
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [editId, setEditId] = useState("")

  const estado = [{ val: "Conservada", id: 1 }, { val: "Ligeramente afectada", id: 2 }, { val: "Mal estado", id: 3 }];


  const [values, handleInputChange, reset] = useForm({
    specimen: "",
    quality_specimen: "",
    aditional_comments: ""

  })

  const { specimen, quality_specimen, aditional_comments } = values

  const heading = ["Id", "Project", "Location", "Date", "Species", "Condition", "Image", "Comments", "Edit"]

  let storageUSer = JSON.parse(localStorage.getItem("user"));


  useEffect(() => {
    try {
      const getMuestras = async () => {
        const resp = await fetch(`http://localhost:3001/user/${storageUSer.id}/muestras`)
        const data = await resp.json()
        setMuestras(data)

      };
      getMuestras();
    } catch (error) {
      console.log("error", error);
    };
  }, []);


  const updateMuestra = (id) => {
    let copyMuestra = [...muestras];

    copyMuestra.forEach(muestra => {

      if (muestra.id === id) {

        muestra.specimen = specimen;
        muestra.quality_specimen = quality_specimen;
        muestra.aditional_comments = aditional_comments;
      }
    })

    setMuestras(() => copyMuestra)

  }



  const handleChangeSampleData = async (id) => {
    try {
      fetch(`http://localhost:3001/muestra/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            specimen: specimen,
            quality_specimen: quality_specimen,
            aditional_comments: aditional_comments
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        ;
    }
    catch (error) {
      console.log("error", error)
    }

  }

  return (

    <section className="vh-100" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

      <nav>
        <div className="nav nav-tabs d-flex justify-content-center" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid-3x2" viewBox="0 0 16 16">
              <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v8a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5v-8zM1.5 3a.5.5 0 0 0-.5.5V7h4V3H1.5zM5 8H1v3.5a.5.5 0 0 0 .5.5H5V8zm1 0v4h4V8H6zm4-1V3H6v4h4zm1 1v4h3.5a.5.5 0 0 0 .5-.5V8h-4zm0-1h4V3.5a.5.5 0 0 0-.5-.5H11v4z" />
            </svg>
          </button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt" viewBox="0 0 16 16">
              <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
              <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
          <div className="mt-4 mx-auto" style={{ maxWidth: "80%" }}>
            <table className="table">
              <thead>
                <tr>
                  {heading.map((head, i) => (
                    <th scope="col" key={i}>{head}</th>
                  ))
                  }
                </tr>
              </thead>
              <tbody>

                {muestras.length !== 0 ? (
                  muestras.map(({ project_name, id, fecha, aditional_comments, specimen, image_specimen, ubication, quality_specimen, lat, lng }, i) =>

                    <tr key={i} className="table-light">
                      <td>{id}</td>
                      <td>{image_specimen}</td>
                      <td>{ubication}</td>
                      <td>{moment(fecha).format('MMMM Do YYYY, h:mm:ss a')}</td>
                      <td>{specimen}</td>
                      <td>{quality_specimen}</td>
                      <td>
                        <a href={project_name} target="_blank">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                          </svg>
                        </a>
                      </td>
                      <td>{aditional_comments}</td>

                      <td><button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" name="id" defaultValue onClick={() => setEditId(id)}>Editar</button>
                      </td>
                    </tr>



                  )


                )
                  : (<></>)}
              </tbody>
            </table>
          </div>

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Edit

                  <form>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" className="form-control" name="specimen" value={specimen} onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form3Example1c">Specimen</label>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <select onChange={handleInputChange} name="quality_specimen" value={quality_specimen} className="form-select" aria-label="Default select example">
                          <option defaultValue>Select Condition</option>
                          {
                            estado.map(({ val, id }, i) => {
                              return (
                                <option value={val} key={i}>{val}</option>

                              )
                            })
                          }
                        </select>
                        <label className="form-label" htmlFor="form3Example1c">Condition</label>
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <div className="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" className="form-control" name="aditional_comments" value={aditional_comments} onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form3Example1c">Comments</label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => { handleChangeSampleData(editId); updateMuestra(editId); reset() }} data-bs-dismiss="modal">Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
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
                      <h3>Project:{selectedMarker.image_specimen}</h3>
                      <p>Name: {selectedMarker.specimen}</p>
                      <p>Status: {selectedMarker.quality_specimen}</p>
                      <a href={selectedMarker.project_name} target="_blank">
                        Image:
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                          </svg></span>

                      </a>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </div>



        </div>
      </div>
    </section>

  )

}




