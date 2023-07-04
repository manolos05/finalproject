import React, { useContext, useEffect, useState } from "react";




export const Gestionar = () => {
    const [proyectos, setProyectos] = useState([])

    const data = ["Id", "Nombre del proyecto", "Ubicacion", "Estado"]


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

        <div className="mt-3 mx-auto" style={{ maxWidth: "80%" }}>
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
                                <tr key={i}>
                                    <td>{id}</td>
                                    <td>{name}</td>
                                    <td>{direction}</td>
                                    <td><button className={`btn ${is_active ? "btn-success" : "btn-danger"}`} onClick={() => { setStatusProject(!is_active, id); updateProjects(id) }} >{is_active ? "Activo" : "Inactivo"}</button></td>
                                    <td></td>

                                </tr>
                            )

                        }))
                        : (<div>No hay proyectos</div>)}
                </tbody>
            </table>
        </div>





    )




}