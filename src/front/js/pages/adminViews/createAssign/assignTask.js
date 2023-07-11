import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../../store/appContext";


export const AssignTask = () => {

  const { store, actions } = useContext(Context)

  const [deleteId, setDeleteId] = useState(null);

  const heading = ["Id", "Project", "Location", "Species", "Condition", "Image", "Comments", "Delete"]

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

    <section className="vh-100" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

      <div>
        < br />
        <div className="table-responsive mx-auto" style={{ maxWidth: "80%" }}>
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

              {store.getMuestra.length !== 0 ? (
                store.getMuestra.map(({ project_name, id, aditional_comments, specimen, image_specimen, quality_specimen, ubication, ubication_image }, i) =>
                  <tr key={i} className="table-light">
                    <td>{id}</td>
                    <td>{image_specimen}</td>
                    <td>{ubication}</td>
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
                    <td><button data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="btn btn-danger" onClick={() => setDeleteId(id)}>Delete</button></td>
                  </tr>
                )

              )
                : (<tr>
                  <td colSpan="10">No Samples</td>
                </tr>)}

            </tbody>
          </table>


          <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Sample</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  Press delete to confirm
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-danger" onClick={() => { handleDelete(deleteId) }} data-bs-dismiss="modal">Delete</button>
                </div>
              </div>
            </div>
          </div>






        </div>
      </div>
    </section>

  )
}