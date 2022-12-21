import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addSucursal } from "../../slices/sucursalesSlice";

export const AddSucursal = () => {
    const [state, setState] = useState(false);
    const dispatch = useDispatch();
    const user = sessionStorage.getItem('username');
    const sucursal = useRef();

    const changeState = () => {
        if (state === true) {
            dispatch(addSucursal({
                user,
                sucursal: sucursal.current.value
            }))
        }
        setState( state => !state);
    }

    return(
        state 
        ? <div className="h-[50px] bg-gradient-to-r from-transparent via-[#000692CC] to-transparent flex place-content-evenly place-items-center">
            <input type="text" className="w-6/12 h-4/6 bg-inherit text-xl font-semibold text-white border-b-2 border-l-2 rounded-bl-md outline-none pl-4" ref={sucursal}/>
            <button className="w-2/12 text-xl font-semibold text-white" onClick={changeState}> AÑADIR </button>
        </div>
        : <div className="h-[50px] text-center bg-gradient-to-r from-transparent via-[#000692CC] to-transparent ">
            <button className="text-[150%] text-white font-semibold py-2 cursor-pointer hover:scale-95" onClick={changeState}> AÑADIR SUCURSAL </button>
        </div>
    )
}