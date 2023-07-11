import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useForm } from "../../../hooks/useform";


export const MakeMuestra = () => {
  const { store, actions } = useContext(Context)
  const [tasks, setTasks] = useState(null);

  const [coordinates, setCoordinates] = useState(null);

  const [coordinates1, setCoordinates1] = useState(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCoordinates(latitude);
          setCoordinates1(longitude)
        },
        error => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const [values, handleInputChange, reset] = useForm({
    imagen1: "",
    ubication_image: "",
    area: "",
    specimen: "",
    quality_specimen: "",
    image_specimen: "",
    aditional_comments: "",
    proyecto_id: ""

  })

  const [selectedTask, setSelectedTask] = useState(null)

  const selectTask = (taskId) => {
    let newTasks = [...tasks]
    let filteredTask = newTasks.filter((x) => x.id == taskId)
    setSelectedTask(() => filteredTask)
  }

  const { ubication_image, specimen, quality_specimen, image_specimen, aditional_comments, imagen1 } = values;

  const estado = [{ val: "Good", id: 1 }, { val: "Slightly affected", id: 2 }, { val: "Bad", id: 3 }];

  let storageUSer = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (tasks === null) {
      try {
        const getTasks = async () => {
          const res = await fetch(`http://localhost:3001/user/${storageUSer.id}/projects`)
          const data = await res.json();
          setTasks(data)

        };
        getTasks()
      }
      catch (error) {
        console.log("error", error)
      }
    };
    getLocation();

  }, [tasks])

  const updateTask = (id) => {

    let updateState = [...tasks];
    updateState.forEach(e => {
      if (e.id === id) {
        e.is_active = false
      }

    })
    setTasks(() => updateState)

  }



  const createSampleRequest = async () => {
    try {
      await fetch(
        "http://localhost:3001/muestra",
        {
          method: "POST",
          body: JSON.stringify({
            user_id: `${storageUSer.id}`,
            proyecto_id: `${selectedTask !== null ? selectedTask[0].id : ""}`,
            project_name: store.image,
            ubication: `${selectedTask[0].direction}`,
            lat: `${coordinates}`,
            lng: `${coordinates1}`,
            specimen: specimen,
            quality_specimen: quality_specimen,
            image_specimen: `${selectedTask[0].name}`,
            aditional_comments: aditional_comments,

          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    };
  }

  const handleChangeProjectState = async () => {
    try {
      fetch(`http://localhost:3001/proyecto/${selectedTask[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            is_active: false
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

    <section
      className="vh-100"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0 align-items-center">
                  <div className="col-md-6 col-lg-5 d-none d-md-block align-items-center m-5">
                    <img
                      src="https://res.cloudinary.com/dz6bglmyq/image/upload/v1688411078/muestra_qdbrqw.png"
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1 align-items-center">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 align-items-center">
                      Create a new Sample
                    </p>
                    {tasks !== null &&
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <select onChange={(e) => { handleInputChange(e); selectTask(e.target.value) }} name="proyecto_id" className="form-select" aria-label="Default select example">
                              <option defaultValue>Select Project</option>
                              {
                                tasks.map((task, i) => {

                                  return (
                                    task.is_active && <option value={task.id} key={i}>{task.name}</option>
                                  )
                                })
                              }
                            </select>
                            <label className="form-label" htmlFor="form3Example1c">Project</label>


                          </div>

                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="text" id="form3Example1c" className="form-control" name="specimen" value={specimen} onChange={handleInputChange} />
                            <label className="form-label" htmlFor="form3Example1c">Species Name</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <select onChange={handleInputChange} value={quality_specimen} name="quality_specimen" className="form-select" aria-label="Default select example">
                              <option defaultValue>Select Sample Condition</option>
                              {
                                estado.map(({ val, id }, i) => {
                                  return (
                                    <option value={val} key={i}>{val}</option>

                                  )
                                })
                              }
                            </select>
                            <label className="form-label" htmlFor="form3Example1c">Sample Condition</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input type="file" id="form3Example1c" name="imagen1" value={imagen1} className="form-control" onChange={(e) => { actions.postUrlImages(e); handleInputChange(e) }} />
                            <label className="form-label" htmlFor="form3Example1c">Image</label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <textarea type="text" id="form3Example1c" className="form-control" name="aditional_comments" value={aditional_comments} onChange={handleInputChange} />
                            <label className="form-label" htmlFor="form3Example1c">Adittional Comments</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="button" className="btn btn-dark btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop1">Create</button>

                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4"></div>
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Finish Sample</button>
                          </div>
                        </div>

                      </form>
                    }

                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Finish</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              To confirm press finish
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => { handleChangeProjectState(); updateTask(selectedTask[0].id) }} data-bs-dismiss="modal">Finish</button>
            </div>
          </div>
        </div>
      </div>


      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Confirm</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              To confirm press the button
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={() => { createSampleRequest(); reset() }} data-bs-dismiss="modal">Confirm</button>
            </div>
          </div>
        </div>
      </div>

    </section>

  )
}