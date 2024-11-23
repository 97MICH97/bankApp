import React, { useState, useEffect } from "react";
import { API_URL } from "../auth/constants";
import GetLocalStorage from "../localStorage/getLocalStorage";
import { LoadingProgress } from "./loading";
import { useNavigate } from "react-router-dom";


export function BankList(){
    const [instituciones, setInstituciones] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const goTo = useNavigate()
   
    async function getBanks() { 
        setIsLoading(true)
        try {
            const response = await fetch(`${API_URL}/getbanks`,{
                method: 'GET',
                headers: {
                    "Content-Type" : "application/json",
                    'accept': 'application/json'
                }
            })
            const body = await response.json()
            setInstituciones(body.body) 
            setIsLoading(false)
            
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    async function createLink(institucion) {
        setIsLoading(true)
        try{
            const username = GetLocalStorage();
            const response = await fetch(`${API_URL}/createLink`,{
                method: "POST",
                headers:{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    institution: institucion,
                    username: username, 
                })
            });
            
            if(response.ok){
                setIsLoading(false)
                console.log("Link creted successfully")
                
                goTo("/balance")
            }else{
                setIsLoading(false)
                await response.json()
            }
        }catch(error){

        }
    }

    useEffect(() => {
        getBanks();
    },[])

    return(
            isLoading ?  LoadingProgress():
            <ul>
            <h1>Instituciones bancarias</h1>
                {
                    instituciones.map(institucion => (
                        <li key={institucion.id} style={{backgroundColor: '#e9cfa8', color: 'black'}}>
                            <h2 style={{paddingLeft: '20px'}}>{institucion.display_name}</h2>
                            <p style={{paddingLeft: '20px'}}><strong>País:</strong> {institucion.country_code}</p>
                            <p style={{paddingLeft: '20px'}}><strong>Tipo:</strong> {institucion.type}</p>
                            <p style={{paddingLeft: '20px'}}><strong>Recursos:</strong> {institucion.resources.join(', ')}</p>
                            <button style={{width: '50%' , alignItems: 'center',}} onClick={() => {
                                createLink(institucion.name,)
                            }}>Crear cuenta</button>
                        </li>
                    ),[])
                }
            </ul>
    );
}
