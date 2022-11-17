import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "../../components/DropDown/DropDown";

import { fetchSucursales, selectSucursal } from "../../slices/sucursalesSlice";
import { fetchIngredients } from "../../slices/ingredientSlice";
import ManageIngredient from "../ManageIngredients/ManageIngredients";
import InfoBox from "../InformationBox/InformationBox.js";
import ReportSale from "../ReportSale/ReportSale";

export default function Datasheet(props) {
    const {option, active} = props;
    const  username = sessionStorage.getItem("username");
    const sucursal = useSelector(selectSucursal);    
    const dispatch = useDispatch();

    //Request Sucursales on page load
   useEffect( () => {
        dispatch(fetchSucursales(username))
    }, [dispatch, username]) 
    useEffect( () => {
        dispatch(fetchIngredients(sucursal))        
    }, [dispatch,sucursal])

    const SwitchRender = () => {
        switch(option.id){
            case 1: return <InfoBox title={option.title}/>
            case 2: return <ManageIngredient title={option.title}/>
            case 3: return <ReportSale title={option.title}/>
            default:
        }
    }

    return (
        <>
            <div className="col-start-2 bg-[#F4F4F4] grid grid-rows-[2fr,8fr]">
                {/*TOP SECTION*/}
                <div className="row-start-1 flex w-full h-full">
                    <div className="w-1/2 mt-4">
                        <h1 className="text-3xl text-center"> INVENTARIO: </h1>
                        <DropDown active={active}/>
                    </div>
                    <div className="w-1/2 h-[140px] bg-inv-blue rounded-l-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] place-self-start mt-8 flex"> 
                        <div className="h-[70%] w-[11.5%] relative top-[20px] left-[20px] rounded-full bg-[#EFEFEF]"></div>
                        <h1 className="text-[40px] text-white font-thin self-center ml-10"> USUARIO RESTAURANTE LOS 100 CIELOS </h1>
                    </div>
                </div>
                {/*INFORMATION SECTION*/}
                <div className="row-start-2 mt-10">
                    {SwitchRender()}    
                </div>
            </div>
        </>
    )
}