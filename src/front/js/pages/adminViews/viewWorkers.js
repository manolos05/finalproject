import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";


export const ViewWorkers = () => {
  const { store, actions } = useContext(Context)

  const heading = ["Name", "Last Name", "Email", "Delete"]

  useEffect(() => {
    actions.loadUser()
  }, []);

  const handledelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/${id}`,
        {
          method: "DELETE",
        }
      ); if (response.ok) {
        await response.json()
        actions.loadUser()
      };
    } catch (error) {
      console.log("error", error);
    }


  }

  return (
    <section className="vh-100" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>

      <div className=" mx-auto" style={{ maxWidth: "80%" }}>
        <br />
        <div className="table-responsive">
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
              {(
                store.users.map(({ name, last_name, email, id }, i) => {
                  return (
                    <tr key={i} className="table-light">
                      <td>{name}</td>
                      <td>{last_name}</td>
                      <td>{email}</td>
                      <td><button onClick={() => handledelete(id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                  )
                }))
              }
            </tbody>
          </table>
        </div>
      </div>

    </section>



  )
}