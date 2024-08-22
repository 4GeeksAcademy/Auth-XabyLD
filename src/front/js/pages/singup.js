import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


const SingUp = () => {

    const {store, actions} = useContext(Context) 

    const [formData , setFormData] = useState({
        email : "",
        password : ""
    }) 

    const changesInput = (event) => {
        const {name, value} = event.target
        console.log(value)
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.registerUser(formData)
    }


    return (
        <>
        <div className="container-fluid">
          <h1 className="text-center">Form de Registro</h1>

          <form onSubmit={handleSubmit}>
            <div className="">
            <label>Introduzca su email:</label>
            <input type="email" name="email" placeholder="example@example.com" value={formData.email} onChange={changesInput}/>

            </div>
            <div className="">

            <label>Introduzca su contraseña : </label>
            <input type="password" name="password" value={formData.password} onChange={changesInput}/>
            </div>
          </form>

          <button onClick={handleSubmit} type="button">Register</button>

        </div>

       


        </>

     
    )
}


export default SingUp