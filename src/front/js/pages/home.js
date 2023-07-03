import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {

	return (
		<>
			<div
				className="alert alert-info container ml-3 text-center text-black"
				style={{ backgroundColor: "" }}
			>
				Explora los reportes, visualiza las muestras en tiempo real y descubre
				la información que necesitas al instante
			</div>
			<div className="row" style={{ backgroundColor: "rgb()" }}>
				<div
					className="col-4  container-fluid"
					style={{ backgroundColor: "rgb(17, 122, 101)", borderRadius: "3%" }}
				>
					<h1
						className="lh-base text-white fs-1"
						style={{ textAlign: "left", margin: "30px auto 0" }}
					>
						"Potencia tu proceso de toma y gestión de{" "}
						<span className="text-black">muestras</span> con nuestra plataforma{" "}
						<span className="text-black">líder en su clase"</span>
					</h1>
					<br></br>
					<h3 className="lh-base text-white" style={{ textAlign: "left" }}>
						Ahorra tiempo en terreno y procesa tus muestras de forma
						automatizada para una mayor eficiencia.
					</h3>
					<div className="d-flex justify-content-center">
						<button type="button" className="btn btn-dark mt-5">
							<a
								href="http://localhost:3000/signup"
								className="text-white text-decoration-none"
							>
								Comenzar
							</a>
						</button>
					</div>
				</div>
				<div className="col-6 d-flex">
					<img
						src="https://res.cloudinary.com/dz6bglmyq/image/upload/v1688328444/Sin_equipos_especiales3_hxvq43.png"
						style={{
							width: "400px",
							margin: "0",
							borderRadius: "5%",
						}}
					/>
				</div>
				<h1 className="mt-5 text-center">Con Field Expedition podras...</h1>
				<p className="d-flex justify-content-center">
					<img
						src="https://res.cloudinary.com/dz6bglmyq/image/upload/v1688330120/Field_Expedition2_sp1xfs.png"
						style={{
							borderRadius: "5%",
						}}
					/>
				</p>
			</div>
		</>
	);
};
