import React, { useEffect, useState } from "react";
import { useForm } from "../../../hooks/useform";
import { LocationSamples } from "../../component/googleMapas";



export const UserGetMuestra = () => {

  const [muestras, setMuestras] = useState([])

  const [values, handleInputChange] = useForm({
    specimen: "",
    quality_specimen: "",
    aditional_comments: ""

  })

  const { specimen, quality_specimen, aditional_comments } = values

  const heading = ["Id", "Proyecto", "Ubicación", "Especie", "Calidad", "imagen", "Comentarios", "Editar", "Coordenadas"]

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



  const handleChangeSampleData = async (id) => {
    try {
      fetch(`http://localhost:3001/muestra/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            specimen: "",
            quality_specimen: "",
            aditional_comments: ""
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
    }
    catch (error) {
      console.log("error", error)
    }

  }

  return (
    <>

      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">

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
                muestras.muestras.map(({ project_name, id, aditional_comments, specimen, image_specimen, ubication, quality_specimen, lat, lng }, i) =>

                  <tr key={i}>
                    <td>{id}</td>
                    <td>{project_name}</td>
                    <td>{ubication}</td>
                    <td>{specimen}</td>
                    <td>{quality_specimen}</td>
                    <td>{image_specimen}</td>
                    <td>{aditional_comments}</td>
                    <td>lat: {Number(lat)} , lng: {Number(lng)}</td>
                    <td><button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" name="id" defaultValue>Editar</button>
                    </td>
                  </tr>



                )


              )
                : (<></>)}
            </tbody>
          </table>

          <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="staticBackdropLabel">Terminar muestreso</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Solo puede modificar los siguientes datos:
                </div>
                <form>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name="specimen" value={specimen} onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example1c">Especie</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name="quality_specimen" value={quality_specimen} onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example1c">Calidad</label>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center mb-4">
                    <div className="form-outline flex-fill mb-0">
                      <input type="text" id="form3Example1c" className="form-control" name="aditional_comments" value={aditional_comments} onChange={handleInputChange} />
                      <label className="form-label" htmlFor="form3Example1c">Comentarios</label>
                    </div>
                  </div>
                </form>
                <div class="modal-footer">
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                  <button type="button" class="btn btn-primary" onClick={() => handleChangeSampleData()}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">

          <LocationSamples />
        </div>
      </div>
    </>

  )

}




