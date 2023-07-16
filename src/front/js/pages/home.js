import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
export const Home = () => {
	return (
		<>
			<div className="row mb-2" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1689301357/fondo_6_e8obbx.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
				<div
					className="col-4  container-fluid"
					style={{ backgroundColor: "rgb(120, 202, 29)", borderRadius: "3%", marginTop: "80px" }}
				>
					<h1
						className="lh-base text-white fs-1"
						style={{ textAlign: "left", margin: "30px auto 0" }}
					>
						"Empower your{" "}
						<span className="text-black">sample collection</span> and management process with {" "}
						<span className="text-black">our best-in-class platform"</span>
					</h1>
					<br></br>
					<h3 className="lh-base text-white" style={{ textAlign: "left" }}>
						Save time in the field and process your samples automatically for greater efficiency.
					</h3>
					<div className="d-flex justify-content-center">
						<button type="button" className="btn btn-dark mt-5">
							<a
								href="http://localhost:3000/signup"
								className="text-white text-decoration-none"
							>
								Sign Up
							</a>
						</button>
					</div>
				</div>
				<div className="col-6 " style={{
					marginTop: "80px"
				}}>
					<img
						src="https://res.cloudinary.com/dz6bglmyq/image/upload/v1689302380/geolo4_q3tx89.png"
						style={{
							marginTop: "80px",
							width: "600px",
							margin: "0",
							borderRadius: "5%",
						}}
					/>
				</div>
			</div>
		</>
	);
};