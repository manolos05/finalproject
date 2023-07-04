import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context)
	const location = useLocation();
	const navigate = useNavigate();

	const logoutCondition = location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/signup"


	return (

		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container">
				<a class="navbar-brand" href="http://localhost:3001">
					<img src="https://www.calacademy.org/sites/all/themes/calacademy_zen/images/logo-green-460px.png" alt="Logo" width="30" height="30" class="d-inline-block align-top" />
					Field Expedition
				</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item dropdown">
							<button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
								Contacto
							</button>
							<ul class="dropdown-menu dropdown-menu-dark">
								<li><a class="dropdown-item" href="mailto:franciscocuello86@gmail.com">Daniel Cuello</a></li>
								<li><a class="dropdown-item" href="mailto:manusalh@gmail.com">Manuel Salazar</a></li>

							</ul>
						</li>
					</ul>
					<ul class="navbar-nav">

						<li class="nav-item">
							{location.pathname === "/" && <a className="nav-link" href="http://localhost:3000/login">Login</a>}
						</li>

					</ul>
				</div>
				<div className="ml-auto">
					{logoutCondition && <button onClick={() => actions.logOut(navigate)} className="btn btn-primary">Log Out</button>}
				</div>
			</div>
		</nav>


	);
};
