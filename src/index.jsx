import { BrowserRouter,Route,  Routes } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import{App} from './pages/login'
import { RegisterUser } from "./pages/registerUser";
import { BankList } from "./pages/banks";
import {Balance} from "./pages/balance";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/registro" element={<RegisterUser/>}/>
            <Route path="/banks" element={<BankList/>}/>
            <Route path="/balance" element={<Balance/>}/>
        </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
