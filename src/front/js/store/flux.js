const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			//Inicializamos el usuario
			user : ""
				
			
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			registerUser: async(formData) => {
				const response = await fetch("http://localhost:3001/api/singup" , {
					method: "POST",
					headers:{
						"Content-Type": "application/json"
					},
					body: JSON.stringify(formData),
				});
				const data = await response.json()
				setStore({user : data})
				if (data.success){
					console.log("Usuario registrado")
				} else {
					console.log("No se ha podido registrar el usuario")
				}
			},
			loginUser: async(formData) => {
				const response = await fetch("http://localhost:3001/api/login",{
					method: "POST",
					headers:{
						"Content-Type": "application/json"

					},
					body: JSON.stringify(formData)
				});
				const data = await response.json()
				console.log(data)
					if (data.success){
						console.log("Estás logueado")
					} else {
						console.log("Login fallido")
					}
					
				
			},
			privateRoute: async(email) => {
				let myToken = localStorage.getItem("token")
				const response = await fetch("http://localhost:3001/api/private", {
					method: "GET", 
					headers:{
						"Authorization": myToken,
					}
				});
				const data = await response.json()
				console.log(data)
			}


			
			
		}
	};
};

export default getState;
