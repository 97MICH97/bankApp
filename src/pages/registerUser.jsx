import React, { useState } from "react";
import '../styles.css';
import { BsPiggyBank } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { LoadingProgress } from "./loading";

export function RegisterUser({value}){
    const [email, setEmail] = useState(value);
    const [password, setPassword] = useState(value);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const goTo = useNavigate()

    async function registerUser(email, password) {
        setIsLoading(true)
        try{
              headers.append('Access-Control-Allow-Origin', 'https://bankapptest97.netlify.app');
              headers.append('Access-Control-Allow-Credentials', 'true');
            const response = await fetch(`${API_URL}/signup`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    username: email, 
                    password: password
                })
            });
            
            if(response.ok){
                console.log("user creted successfully")
                setError(false)
                setIsLoading(false)
                goTo("/")
            }else{
                const json = (await response.json())
                setIsLoading(false)
                setErrorMessage(json.body.error)
                setError(true)
            }
        }catch(error){

        }

        console.log(email)
        console.log(password)
    }

    
    return (
        isLoading ?  LoadingProgress() :
        <form
            onSubmit={ev => {
                ev.preventDefault();
                const email = ev.target.email.value;
                const password = ev.target.password.value
                registerUser(email, password)
            }}
        >
        <div style={{alignContent: 'center'}}>
        <h1 >Bienvenido a bankApp!</h1>
        <label style={{alignContent: 'center', paddingBottom:'50px'}}>Para usar nuestros servicios primero crea una cuenta con nosotros.</label>
        <BsPiggyBank size={60} style={{color: "yellow"}}  />
        </div>
        <input 
            type="text" 
            name = "email"
            placeholder="Ingresa tu correo"
            autoComplete="off"
            value ={email} 
            onChange={ev => setEmail(ev.target.value)}
        />
        <input 
            type="password"  
            name = "password"
            placeholder="crea una contraseña"
            value = {password} 
            onChange={ev => setPassword(ev.target.value)}
        />
        <button style={{background: 'yellow',}} onClick={() => {}}>crear cuenta</button>
        {error ? <div 
        style={{color: "white", backgroundColor: "#dd415e",  display: "flex",
            alignself: "center",
            flexdirection: "column",
            justifycontent: "center",
            alignitems: "center",
            padding: "2px",
            borderRadius: "50px"}} 
        className="errorMessage"> {errorMessage} </div> : <div/>}
        <div style={{alignContent: 'center'}}>
        <Link to={"/"} style={{background: 'transparent',color:'white', }} >Si ya tienes una cuenta inicia session aqui!</Link>
        </div>
        </form>
    );
}
