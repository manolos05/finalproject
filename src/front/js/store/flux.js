const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				},
			],
			authToken: null,
			user: null,
			users: [],
			del: null,
			samplePost: "",
			getMuestra: [],
			image: "",
			loading: false,

		},
		actions: {
			// Use getActions to call a function within a fuction

			login: async (email, password, navigate) => {
				try {
					const response = await fetch(
						"http://localhost:3001/login",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								email: email,
								password: password
							}),
						}
					);
					if (response.ok) {
						const data = await response.json()
						setStore({ authToken: data.auth_token });
						navigate("/dashboard")
						return true
					}
				} catch (error) {
					console.log(error);
				};
				return false

			},

			getUser: async () => {
				const store = getStore()
				try {
					const response = await fetch("http://localhost:3001/dashboard", {
						headers: { Authorization: `Bearer ${store.authToken}` }
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ user: data })
						localStorage.setItem("user", JSON.stringify(data))
					}
				}
				catch (error) {
					console.log(error)
				}

			},

			loadUser: async () => {
				const store = getStore();
				try {
					const response = await fetch("http://localhost:3001/user", {
						headers: { Authorization: `Bearer ${store.authToken}` }
					});
					if (response.ok) {
						const data = await response.json();
						setStore({ users: data.users })
					}
				}
				catch (error) {
					console.log(error)
				}

			},

			postSample: async ({ ubication_image, area, specimen, quality_specimen, image_specimen, aditional_comments }) => {
				try {
					const response = await fetch(
						"http://localhost:3001/muestra",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								user_id: user_id,
								proyecto_id: proyecto_id,
								ubication: ubication,
								ubication_image: ubication_image,
								area: area,
								specimen: specimen,
								quality_specimen: quality_specimen,
								image_specimen: image_specimen,
								aditional_comments: aditional_comments
							}),
						}
					)
					if (response.ok) {
						const data = await response.json()
						setStore({ samplePost: data });
						return true
					}
				} catch (error) {
					console.log(error);
				};
				return false

			},

			editarMuestra: async ({ id, ubication, ubication_image, area, specimen, quality_specimen, image_specimen, aditional_comments }) => {
				try {
					const response = await fetch(
						`http://localhost:3001/muestra/${id}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({
								ubication: ubication,
								ubication_image: ubication_image,
								area: area,
								specimen: specimen,
								quality_specimen: quality_specimen,
								image_specimen: image_specimen,
								aditional_comments: aditional_comments
							}),
						}
					);
					if (response.ok) {
						const data = await response.json()
						setStore({ edit: data });
					}
				} catch (error) {
					console.log("error", error);
				};
			},

			getSample: async () => {
				const store = getStore()
				try {
					const response = await fetch("http://localhost:3001/muestra");
					if (response.ok) {
						const data = await response.json();
						setStore({ getMuestra: data })
					}
				}
				catch (error) {
					console.log("error", error)
				}

			},

			postUrlImages: async (e) => {
				const files = e.target.files;
				const data = new FormData();
				data.append("file", files[0])
				data.append("upload_preset", "proyecto4Geeks");
				setStore({ loading: true })
				const res = await fetch("http://api.cloudinary.com/v1_1/dadtkqfdf/image/upload",
					{
						method: "POST",
						body: data
					})
				const file = await res.json()
				const data1 = file.secure_url
				setStore({ image: data1 });
				setStore({ loading: false })
			},

			logOut: async (navigate) => {
				setStore({ user: null })
				localStorage.clear()
				navigate("/")
			},






			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				token:

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
