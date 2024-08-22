import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


const Login = () => {
    // src/Login.js

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })


  const [errorMessage, setErrorMessage] = useState('');
  const {store, actions} = useContext(Context)

    const handleChange = (event) => {
        const {name , value} = event.target
        console.log(value)
        setFormData((prev) => ({...prev , [name]: value}))
    }


    const handleLogin = async (e) => {
        e.preventDefault();
        actions.loginUser(formData)
        
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
        <Link to="/private">
            <button type="submit">Login</button>

        </Link>
      </form>
    </div>
  );
};


export default Login;