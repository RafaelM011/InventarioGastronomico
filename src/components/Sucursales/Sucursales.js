import React from "react";

import { useSelector } from "react-redux";
import { selectSucursales } from "../../slices/sucursalesSlice";
import Sucursal from "./Sucursal";
import { AddSucursal } from "./AddSucursal";


export default function Sucursales() {
    const sucursales = useSelector(selectSucursales)
    
    return(
        <>
            <AddSucursal/>
            {sucursales.items.map(sucursal => {
                return <Sucursal key={sucursal.id} sucursal={sucursal.name}/>
            })}
        </>
    )
} 