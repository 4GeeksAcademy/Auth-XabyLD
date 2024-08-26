import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, Navigate, useNavigate } from "react-router-dom";



const Private = () => {

    const navigate = useNavigate()

    const {store, actions } = useContext(Context)

    const handleLogOut = (e) => {
        e.preventDefault()
        actions.logoutSession()
        navigate("/login")
    }
    return(
        <>
        <h1>Este es la ruta protegida que solo puedes entrar con Token</h1>
        <button onClick={handleLogOut} className="text-center text-secondary" type="button"> LogOut</button>
        </>

    )
}

export default Private;