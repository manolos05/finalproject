import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../store/appContext";


export const AssignTask = () => {

  const { store, actions } = useContext(Context)

  const [deleteId, setDeleteId] = useState(null);

  const heading = ["Proyecto", "Id", "area", "Especie", "imagen", "Calidad", "Ubicacion", "imagen ubicacion", "Comentarios", "Eliminar"]

  useEffect(() => {
    actions.getSample()
  }, []);


  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/muestra/${id}`,
        {
          method: "DELETE",
        }
      ); if (response.ok) {
        await response.json()
        actions.getSample()
      };
    } catch (error) {
      console.log("error", error);
    }


  }





  return (
    <>
      <table class="table">
        <thead>
          <tr>
            {heading.map((head, i) => (
              <th scope="col" key={i}>{head}</th>
            ))
            }
          </tr>
        </thead>
        <tbody>

          {store.getMuestra.length !== 0 ? (
            store.getMuestra.map(({ project_name, id, area, aditional_comments, specimen, image_specimen, quality_specimen, ubication, ubication_image }, i) =>

              <tr key={i}>
                <td>{image_specimen}</td>
                <td>{id}</td>
                <td>{area}</td>
                <td>{specimen}</td>
                <td>{project_name}</td>
                <td>{quality_specimen}</td>
                <td>{ubication}</td>
                <td>{aditional_comments}</td>
                <td>{ubication_image}</td>
                <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-danger" onClick={() => setDeleteId(id)}>Delete</button></td>
              </tr>
            )

          )
            : (<tr>
              <td colSpan="10">No hay muestras</td>
            </tr>)}

          <div class="modal fade" id="staticBackdrop" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Eliminar muestra</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ¿Está seguro que desea eliminar la muestra?
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-danger" onClick={() => { handleDelete(deleteId) }} data-bs-dismiss="modal">Eliminar muestra</button>
                </div>
              </div>
            </div>
          </div>



        </tbody>
      </table>




    </>


  )
}