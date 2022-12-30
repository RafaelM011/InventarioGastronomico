import React from "react";
import { useSelector } from "react-redux";

import DropdownFlecha from "../../assets/dropdown_arrow.png";
import Sucursales from "../../components/Sucursales/Sucursales";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { DisplayMessage } from "../DisplayMessage/DisplayMessage";

export default function DropDown(props) {
    const {active} = props;
    const sucursalSeleccionada = useSelector(selectSucursal);

    return(
        <>
            <details id='details' className={`${active ? 'w-[32%]': 'w-[40%]'} mt-1 z-100 absolute`}>
                <summary id='sucursales_dropdown' className="select-none w-[120%] ml-8 list-none cursor-pointer flex" onClick={(e) => e.stopPropagation()}>
                    <div className="w-[70%] h-fit z-10 border-[3px] border-inv-blue bg-[#F4F4F4] rounded-tr-xl rounded-tl-[30px] rounded-bl-xl rounded-br-[30px] pb-2 flex">
                        <h1 className="text-[150%] font-semibold mt-3 ml-6"> {sucursalSeleccionada} </h1>
                    </div>
                    <div className="w-[15%] z-0 bg-inv-blue ml-[-30px] rounded-tr-xl rounded-tl-[30px] rounded-bl-xl rounded-br-[30px] flex place-content-center">
                        <img className={`place-self-center w-[64px] ml-4`} src={DropdownFlecha} alt="dropdown flecha"/>
                    </div>
                </summary>
                <div className="select-none w-[83%] h-[290px] bg-[#F4F4F4] border-[3px] border-inv-blue ml-8 rounded-tr-xl rounded-tl-[30px] rounded-bl-xl rounded-br-[30px] mt-4 pb-2 overflow-auto scrollbar-hide"> 
                    <Sucursales/>
                </div>
            </details>
            <DisplayMessage type={'sucursales'}/>
        </>
    )
}