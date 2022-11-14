import React from "react";
import Sucursal from "./Sucursal";

import { useSelector } from "react-redux";
import { selectSucursales } from "../../slices/sucursalesSlice";


export default function Sucursales() {
    const sucursales = useSelector(selectSucursales)
    
    return(
        <>
            {sucursales.items.map(sucursal => {
                return <Sucursal key={sucursal.id} sucursal={sucursal.name}/>
            })}
        </>
    )
} 