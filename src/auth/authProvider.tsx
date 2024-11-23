import {useContext, createContext, useState, useEffect} from 'react';
import { CreateContext } from 'react-admin';
import React from 'react';

interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
})

export function AuthProvider({children} : AuthProviderProps){
    const[isAuthenticated, setIsAutenticated] = useState(false);

    return(<AuthContext.Provider value={{isAuthenticated}}>{children}</AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);