import React, { useState } from "react";
import '../styles.css';
import { CiUser } from "react-icons/ci";
import { Link,useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import PostLocalStorage from "../localStorage/postLocalStorage";
import { LoadingProgress } from "./loading";

export function App({value}){
    const [email, setEmail] = useState(value);
    const [password, setPassword] = useState(value);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false)
    const goTo = useNavigate()
    //const [isAuth, setIsAuth] = useState(true);

    async function validateLogin(email, password) {
        setIsLoading(true);
        try{
            const response = await fetch(`${API_URL}/login`,{
                mode: 'no-cors',
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
                console.log("login successfull")
                PostLocalStorage(email)
                setError(false)
                setIsLoading(false)
                goTo("/banks")
            }else{
                setIsLoading(false)
                const json = (await response.json())
                setErrorMessage(json.body.error)
                console.log("something went wrong")
                goTo("/")
                setError(true)
            }
        }catch(error){
            console.log(error)
        }
    }

    
    return (
        isLoading ?  LoadingProgress():
        <form
            onSubmit={ev => {
                ev.preventDefault();
                const email = ev.target.email.value;
                const password = ev.target.password.value
                validateLogin(email, password)
            }}
        >
        <div style={{alignContent: 'center'}}>
        <CiUser size={60} style={{color: "yellow"}} />
        </div>
        <input 
            type="text" 
            name = "email"
            placeholder="email"
            autoComplete="off"
            value ={email} 
            onChange={ev => setEmail(ev.target.value)}
        />
        <input 
            type="password"  
            name = "password"
            placeholder="contraseña"
            value = {password} 
            onChange={ev => setPassword(ev.target.value)}
        />
        <button type="submit"style={{background: 'yellow',}}  onClick={() => {}}>Iniciar sesión</button>
        <div style={{alignContent: 'center'}}>
        {error ? <div 
        style={{color: "white", backgroundColor: "#dd415e",  display: "flex",
            alignself: "center",
            flexdirection: "column",
            justifycontent: "center",
            alignitems: "center",
            padding: "2px",
            borderRadius: "50px"}} 
            className="errorMessage"> {errorMessage} </div> : <div/>}
        <Link to={"/registro"} style={{background: 'transparent',color:'white'}} >Crear una cuenta</Link>
        </div>
        </form>
    );
}
