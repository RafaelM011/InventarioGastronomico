import React from "react";

import DropDown from "../../components/DropDown/DropDown";
import LeftArrow from "../../assets/left_arrow.png";
import RightArrow from "../../assets/right_arrow.png";
import Download from "../../assets/download.png";
import Upload from "../../assets/upload.png";

import ManageIngredient from "../ManageIngredients/ManageIngredients";
import InfoBox from "../InformationBox/InformationBox.js";
import ReportSale from "../ReportSale/ReportSale";
import ConfigInventory from "../ConfigInventory/ConfigInventory";

export default function Datasheet(props) {
    const {option, active} = props;

    const Switch = () => {
        switch(option.id){
            case 1: return <InfoBox title={option.title}/>
            case 2: return <ManageIngredient title={option.title}/>
            case 3: return <ReportSale title={option.title}/>
            case 4: return <ConfigInventory title={option.title}/>
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
                <div className="row-start-2 grid grid-cols-[8fr,2fr] mt-10">
                    <div className="col-start-1">
                        {Switch()}    
                    </div>
                    {/* BUTTONS */}
                    <div className="col-start-2 w-full h-full flex flex-col place-items-center">
                        <div className="w-[90px] h-[90px] bg-[#00C8E3] rounded-full mt-20 cursor-pointer"> <img className="w-[64px] m-auto mt-3" src={Download} alt="left arrow"/> </div>
                        <div className="w-[90px] h-[90px] bg-[#10EB26] rounded-full mt-20 cursor-pointer"> <img className="w-[64px] m-auto mt-3" src={Upload} alt="left arrow"/> </div>
                        <div className="w-[250px] flex flex-row mt-20">
                            <div className="w-[90px] h-[90px] bg-[#0009E3] rounded-full cursor-pointer"> <img className="w-[64px] m-auto mt-3" src={LeftArrow} alt="left arrow"/> </div>
                            <div className="w-[90px] h-[90px] bg-[#0009E3] rounded-full ml-20 cursor-pointer"> <img className="w-[64px] m-auto mt-3" src={RightArrow} alt="left arrow"/> </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
