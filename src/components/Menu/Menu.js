import React from "react";

import InventarioImg from "../../assets/Inventario.png";
import ReporteVentaImg from "../../assets/Reporte_de_venta.png";
import SuplirIngredientesImg from "../../assets/Suplir_ingrediente.png";
import ConfigIngredientesImg from "../../assets/Configurar_ingredientes.png";
import ContactosImg from "../../assets/Contactos.png";
import PrecioImg from "../../assets/Precios.png";
import ManualImg from "../../assets/Manual.png";
import { Link } from "react-router-dom";

export function LargeMenu() {
    return(
        <>
            <div className="w-[225px] h-[300px] bg-inv-blue rounded-b-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55) mx-auto"> 
                <div className="h-[180px] w-[180px] relative top-[90px] left-[23px] rounded-full bg-[#EFEFEF]"></div>
            </div>
        </>
    )
}

export function SmallMenu() {
    return(
        <>
            <div className="w-11/12 h-[100px] bg-inv-blue rounded-r-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] mt-32 place-self-start flex place-content-end"> 
                <div className="h-[80px] w-[80px] relative top-[10px] right-[12px] rounded-full bg-[#EFEFEF]"></div>
            </div>
        </>
    )
}

export function LargeMenuOptions(){
    return(
        <>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/inventario">
                    <h1 className="text-center text-3xl mt-3"> VER INVENTARIO </h1>
                </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/reporte_de_ventas">
                    <h1 className="text-center text-3xl mt-3"> REPORTE DE VENTAS </h1>
                </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/suplir_ingredientes">
                        <h1 className="text-center text-3xl mt-3"> SUPLIR INGREDIENTES </h1>
                </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                 <Link to="/configurar_ingredientes">
                    <h1 className="text-center text-3xl mt-3"> CONFIGURAR INGREDIENTES </h1>
                 </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/contactos">
                    <h1 className="text-center text-3xl mt-3"> CONTACTOS </h1>
                </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/precios">
                    <h1 className="text-center text-3xl mt-3"> PRECIOS </h1>
                </Link>
            </div>
            <div className="place-self-start w-10/12 h-[65px] bg-[#DCDCDC] rounded-r-full mt-3 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)]">
                <Link to="/manual">
                    <h1 className="text-center text-3xl mt-3"> MANUAL </h1>
                </Link>
            </div>
        </>
    )
}

export function SmallMenuOptions(){
    return(
        <>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/inventario">
                    <img className="w-11/12" src={InventarioImg} alt="inventario"/>
                </Link>
            </div>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/reporte_de_ventas">
                    <img className="w-6/12 mx-auto" src={ReporteVentaImg} alt="reporte de venta"/> 
                </Link>
            </div>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/suplir_ingredientes">
                    <img className="w-6/12 mx-auto" src={SuplirIngredientesImg} alt="suplir ingredientes"/> 
                </Link>
            </div>  
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/configurar_ingredientes">
                    <img className="w-6/12 mx-auto" src={ConfigIngredientesImg} alt="configurar ingredientes"/> 
                </Link>
            </div>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/contactos">
                    <img className="w-6/12 mx-auto" src={ContactosImg} alt="contactos"/> 
                </Link>
            </div>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/precios">
                    <img className="w-6/12 mx-auto" src={PrecioImg} alt="precio"/> 
                </Link>
            </div>
            <div className="place-self-start w-5/12 h-[50px] bg-[#DCDCDC] rounded-r-full mt-6 shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] flex place-items-center place-content-center hover:bg-inv-blue hover:w-6/12">
                <Link to="/manual">
                    <img className="w-6/12 mx-auto" src={ManualImg} alt="manual"/> 
                </Link>
            </div>
            <div className="">
                <Link to="/">
                    <button className="text-center text-3xl text-white bg-inv-blue p-3 rounded-3xl mt-10 hover:scale-110"> LOG OUT </button>
                </Link>
            </div>
        </>
    )
}