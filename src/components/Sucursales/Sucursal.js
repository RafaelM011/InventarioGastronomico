import React from "react";
import { useDispatch } from "react-redux";
import { changeSucursal } from "../../slices/sucursalesSlice";

export default function Sucursal(props) {
    const {sucursal} = props;
    const dispatch = useDispatch();

    const changeLocation = () => {
        dispatch(changeSucursal(sucursal))
    }

    return(
        <>
            <h1 className="text-[150%] font-semibold mt-3 ml-6 hover:bg-gradient-to-r from-transparent to-[#000692CC] cursor-pointer" onClick={changeLocation}> {sucursal} </h1>
        </>
    )
}