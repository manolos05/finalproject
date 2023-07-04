import React from "react";
import { Cards } from "../../component/cards";
export const CreateMuestra = () => {
	const data = [
		{
			img: "https://res.cloudinary.com/dz6bglmyq/image/upload/v1688339501/add_zh8o3m.png",
			title: "Agregar tarea por usuario",
			text: "Agrega una tarea a un usuario",
			buttonText: "Agregar",
			url: "/dashboard/createproject",
		},
		{
			img: "https://res.cloudinary.com/dz6bglmyq/image/upload/v1688339243/delete_b1uzqe.png",
			title: "Eliminar muestras de usuarios",
			text: "Elimina las tareas a los usuarios",
			buttonText: "Eliminar",
			url: "/dashboard/assigntask",
		},
		{
			img: "https://res.cloudinary.com/dz6bglmyq/image/upload/v1688339243/delete_b1uzqe.png",
			title: "Activar/Desactivar proyectos",
			text: "Puedes activar o desactivar los proyectos a los usuarios",
			buttonText: "Gestionar",
			url: "/dashboard/manageproject",
		},
	];
	return (

		<section className="vh-100" style={{ backgroundImage: "url('https://res.cloudinary.com/dz6bglmyq/image/upload/v1688068965/banner3_xq4wvf.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
			<div
				className=""

			>
				<div>
					<div className="row p-4 d-flex justify-content-center text-center">
						{data.map(({ img, title, text, buttonText, url }, i) => {
							return (
								<Cards
									key={i}
									img={img}
									title={title}
									text={text}
									url={url}
									buttonText={buttonText}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};