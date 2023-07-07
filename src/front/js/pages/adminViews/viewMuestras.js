import React, { useState, useEffect, useContext } from "react";
import { LocationSamples } from "../../component/googleMapas";
import { Context } from "../../store/appContext";
import moment from 'moment'






export const ViewMuestras = () => {
  const { store, actions } = useContext(Context)

  const [muestras, setMuestras] = useState("")


  const [search, setSearch] = useState("")

  const heading = ["Id", "Project", "Location", "Date", "Name", "Species", "Condition", "Image", "Comments"]


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

    actions.loadUser()

  }, []);


  moment()
















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
          <div className="mx-auto" style={{ maxWidth: "80%" }}>
            < br />
            <input type="text" onChange={(i) => setSearch(i.target.value)} />
            <table className="table" id="tablaMuestra">
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
                  muestras.filter((i) => {
                    return (
                      search === "" ? i : i.project_name.toLocaleLowerCase().includes(search) || i.specimen.toLocaleLowerCase().includes(search) || i.quality_specimen.toLocaleLowerCase().includes(search) || i.ubication.toLocaleLowerCase().includes(search) || i.fecha.toLocaleLowerCase().includes(search)
                    )
                  }).map(({ project_name, id, user_id, fecha, aditional_comments, specimen, image_specimen, quality_specimen, ubication }, i) => {
                    return (
                      <tr key={i} className="table-light">
                        <td>{id}</td>
                        <td>{image_specimen}</td>
                        <td>{ubication}</td>
                        <td>{moment(fecha).format('MMMM Do YYYY, h:mm:ss a')}</td>
                        {store.users.length !== 0 && <td>{`${store.users.find(user => user.id === user_id).name} ${store.users.find(user => user.id === user_id).last_name}`}</td>}
                        <td>{specimen}</td>
                        <td>{quality_specimen}</td>
                        <td>
                          <a href={project_name} target="_plank">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
                              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
                            </svg>
                          </a>
                        </td>
                        <td>{aditional_comments}</td>
                      </tr>
                    )

                  }))
                  : (<tr>
                    <td colSpan="10">Nothing here</td>
                  </tr>)}
              </tbody>
            </table>

          </div>

        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
          <div className="mt-4">
            <LocationSamples />
          </div>
        </div>

      </div>




    </section>


  )
}