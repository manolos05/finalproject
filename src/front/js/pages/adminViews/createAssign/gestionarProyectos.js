import React, { useContext, useEffect, useState } from "react";



export const Gestionar = () => {
    const [proyectos, setProyectos] = useState([])

    const data = ["Id", "Nombre del proyecto", "Ubicacion", "Estado"]


    const getProject = async () => {
        try {
            const response = await fetch("http://wwww.localhost:3001/proyectos")
            if (response.ok) {
                const data = await response.json();
                setProyectos(data)
            }
            getProject();
        }
        catch (error) {
            console.log("error", error)
        }

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


        <table className="table mt-4 p-4 rounded">
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
                            <tr key={i} className="table-active">
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{direction}</td>
                                <td><button className={`btn ${is_active ? "btn-success" : "btn-danger"}`} onClick={() => { setStatusProject(!is_active, id); getProject() }} >{is_active ? "Activo" : "Inactivo"}</button></td>
                                <td></td>

                            </tr>
                        )

                    }))
                    : (<div>No hay proyectos</div>)}
            </tbody>
        </table>





    )




}