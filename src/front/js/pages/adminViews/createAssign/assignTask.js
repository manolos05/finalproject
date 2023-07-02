import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../store/appContext";


export const AssignTask = () => {

  const { store, actions } = useContext(Context)

  const heading = ["Id", "Proyecto", "Ubicación", "Especie", "Calidad", "Imagen", "Comentatios", "Eliminar"]

  useEffect(() => {
    actions.getSample()
  }, []);


  const handledelete = async (id) => {
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
            store.getMuestra.map(({ project_name, id, aditional_comments, specimen, image_specimen, quality_specimen, ubication }, i) =>

              <tr key={i}>
                <td>{id}</td>
                <td>{project_name}</td>
                <td>{ubication}</td>
                <td>{specimen}</td>
                <td>{quality_specimen}</td>
                <td>{image_specimen}</td>
                <td>{aditional_comments}</td>
                <td><button onClick={() => handledelete(id)} className="btn btn-danger">Delete</button></td>
              </tr>
            )

          )
            : (<div></div>)}
        </tbody>
      </table>

    </>


  )
}