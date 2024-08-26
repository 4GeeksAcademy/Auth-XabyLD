

const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			//Inicializamos el usuario
			user : "",
			tokenUser: "",
				
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			registerUser: async (formData) => {
				const store = getStore()
				try {
					const response = await fetch("http://localhost:3001/api/singup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData),
					});
			
					const data = await response.json();
					console.log(data)
					setStore({user : data})
					alert("Usuario registrado")
				} catch (error) {
					console.error("Error al registrar usuario:", error);
				}
				
			},
			loginUser: async(formData) => {
				const store = getStore()
				try {
					
					const response = await fetch("http://localhost:3001/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(formData)
					});

					const data = await response.json();
					console.log("Respuesta del servidor : ", data)
			
					if (!response.ok) {
						
						
						throw new Error(data.error);
					}
			
					if (data.token) {
						sessionStorage.setItem("token", data.token)
						setStore({...store, user: data.user, token: data.token});
						console.log("Login exitoso");
						
						return data;
					} else {
						throw new Error("No se recibió token del servidor");
					}
				} catch (error) {
					console.error("Error en la solicitud: ", error);
					// Aquí podrías usar un sistema de notificación en lugar de alert
					alert(error.message);
					throw error;
				}
			},
			logoutSession: () => {
				sessionStorage.removeItem("token");
				setStore({
					...getStore(),
					user: null,
					external_customer_id: null,
					token: null,
				});
				
			},

			getUsers: async() => {
				const response = await fetch("http://localhost:3001/api/users",{
					method: "GET",
					headers:{
						"Content-Type" : "application/json"
					},
				});
				const dataUser = await response.json()
				console.log(dataUser)
			}


			
			
		}
	};
};

export default getState;
