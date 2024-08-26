import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";



const Login = () => {
    // src/Login.js

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

   const navigate = useNavigate(); 


  const [errorMessage, setErrorMessage] = useState('');
  const {store, actions} = useContext(Context)

    const handleChange = (event) => {
        const {name , value} = event.target
        console.log(value)
        setFormData((prev) => ({...prev , [name]: value}))
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await actions.loginUser(formData);

        if ( response){
          navigate("/private");

        } else {
          console.log("Login fallido");
        }
        
      };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={formData.email}
            name = "email"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
       
            <button type="submit">Login</button>
           

      
      </form>
    </div>
  );
};


export default Login;