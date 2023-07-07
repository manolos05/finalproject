import React, { useContext, useEffect, useState } from "react";




export const Gestionar = () => {
    const [proyectos, setProyectos] = useState([])

    const data = ["Id", "Project", "Location", "State"]


    const getProject = async () => {
        try {
            const response = await fetch("http://wwww.localhost:3001/proyectos")
            if (response.ok) {
                const data = await response.json();
                setProyectos(() => data)
            }
        }
        catch (error) {
            console.log("error", error)
        }

    }

    const updateProjects = (id) => {

        let projectsCopy = [...proyectos];
        projectsCopy.forEach(x => {
            if (x.id === id) { x.is_active = !x.is_active }
        }

        )

        setProyectos(() => projectsCopy)


    }

    useEffect(() => {

        if (proyectos.length === 0) {
            getProject()
        }

    }, [proyectos])

    const setStatusProject = (newState, id) => {
        try {
            fetch(`http://localhost:3001/proyecto/${id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        is_active: newState,
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
        <section className="vh-100" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
            <div className="mx-auto" style={{ maxWidth: "80%" }}>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            {data.map((dat, i) => (
                                <th scope="col" key={i}>{dat}</th>
                            ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {proyectos.length !== 0 ? (
                            proyectos.map(({ direction, id, name, is_active }, i) => {
                                return (
                                    <tr key={i} className="table-light">
                                        <td>{id}</td>
                                        <td>{name}</td>
                                        <td>{direction}</td>
                                        <td><button className={`btn ${is_active ? "btn-success" : "btn-danger"}`} onClick={() => { setStatusProject(!is_active, id); updateProjects(id) }} >{is_active ? "Active" : "Inactive"}</button></td>
                                        <td></td>

                                    </tr>
                                )

                            }))
                            : (<tr>
                                <td colSpan="10">No project to show</td>
                            </tr>)}
                    </tbody>
                </table>
            </div>


        </section>


    )




}