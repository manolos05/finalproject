import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context)
	const location = useLocation();
	const navigate = useNavigate();

	const logoutCondition = location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/signup"


	return (

		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<a className="navbar-brand" href="http://localhost:3000">
					<img src="https://www.calacademy.org/sites/all/themes/calacademy_zen/images/logo-green-460px.png" alt="Logo" width="30" height="30" className="d-inline-block align-top" />
					Field Expedition
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
								Contact
							</button>
							<ul className="dropdown-menu dropdown-menu-dark">
								<li><a className="dropdown-item" href="mailto:franciscocuello86@gmail.com">Daniel Cuello</a></li>
								<li><a className="dropdown-item" href="mailto:manusalh@gmail.com">Manuel Salazar</a></li>

							</ul>
						</li>
					</ul>
					<ul className="navbar-nav">

						<li className="nav-item">
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
