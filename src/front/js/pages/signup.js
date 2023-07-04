import React from "react";
import { useForm } from "../../hooks/useform";
import { Link } from "react-router-dom";


export const Signup = () => {

    const [inputValues, handleInputChange] = useForm({
        name: "",
        lastname: "",
        rut: "",
        email: "",
        rol: "",
        password: "",
        password2: ""
    })

    const userRol = [{ val: "1 ", id: 1 }, { val: "2", id: 2 }];

    const { name, lastname, rut, email, rol, password, password2 } = inputValues;

    const createUserRequest = async () => {
        try {
            await fetch(
                "http://localhost:3001/signup",
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        last_name: lastname,
                        rut: rut,
                        email: email,
                        rol: rol,
                        password: password
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


    return (
        <>
            <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ borderRadius: "25px" }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4">

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="name" id="form3Example1c" className="form-control" value={name} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example1c">Your Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="lastname" id="form3Example1c" className="form-control" value={lastname} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example1c">Last Name</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="text" name="rut" id="form3Example1c" className="form-control" value={rut} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example1c">R.U.T</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row justify-content-center align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <select onChange={handleInputChange} name="rol" className="form-select" aria-label="Default select example">
                                                            <option defaultValue>Select your Rol</option>
                                                            {
                                                                userRol.map(({ val, id }, i) => {
                                                                    return (
                                                                        <option value={val} key={i}>{val}</option>

                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                        <label className="form-label" htmlFor="form3Example1c">Select your rol: 1 for admin or 2 for user</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="email" name="email" id="form3Example3c" className="form-control" value={email} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example3c">Your Email</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="password" id="form3Example4c" className="form-control" value={password} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example4c">Password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input type="password" name="password2" id="form3Example4cd" className="form-control" value={password2} onChange={handleInputChange} />
                                                        <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="button" className="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={createUserRequest}>Register</button>
                                                </div>


                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                                className="img-fluid" alt="Sample image" />

                                        </div>

                                        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Signup Complete</h1>

                                                    </div>
                                                    <div className="modal-body">
                                                        Welcome, you will be redirected to login
                                                    </div>
                                                    <div className="modal-footer">
                                                        <Link to="/login">
                                                            <button type="button" className="btn btn-success">Understood</button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )



}