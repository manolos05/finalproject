import React from "react";
import { Cards } from "./cards";
export const UserDashboard = ({ user }) => {
	const data = [
		{
			img: "https://res.cloudinary.com/dz6bglmyq/image/upload/v1688414030/working2_kchklx.png",
			title: "Make Samples",
			text: "Meets the assigned samples..",
			buttonText: "Make",
			url: "/dashboard/makemuestra",
		},
		{
			img: "https://res.cloudinary.com/dz6bglmyq/image/upload/v1688414542/vermuestras_bvoo1m.png",
			title: "View Samples",
			text: "Edit and view your samples.",
			buttonText: "Watch",
			url: "/dashboard/usergetmuestra",
		},
	];
	return (
		<div
			className=""
			style={{
				backgroundImage:
					"url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')",
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="d-flex justify-content-end">
				<div className="m-2 mx-4">
					<h2>Hello, {user.name}</h2>
				</div>
			</div>
			<div className="row  p-4 d-flex justify-content-center text-center">
				{data.map(({ img, title, text, buttonText, url }, i) => {
					return (
						<Cards
							key={i}
							img={img}
							title={title}
							text={text}
							buttonText={buttonText}
							url={url}
						/>
					);
				})}
			</div>
		</div>
	);
};