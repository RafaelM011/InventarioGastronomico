import React, { useEffect }from "react";
import { useDispatch, useSelector } from "react-redux";

import DropDown from "../../components/DropDown/DropDown";
import InfoBox from "../../components/InformationBox/InformationBox";
import LeftArrow from "../../assets/left_arrow.png";
import RightArrow from "../../assets/right_arrow.png";
import Download from "../../assets/download.png";
import Upload from "../../assets/upload.png";

import { fetchSucursales, selectSucursal } from "../../slices/sucursalesSlice";
import { selectUser } from "../../slices/userSlice";
import { fetchIngredients } from "../../slices/ingredientSlice";

export default function Datasheet(props) {
    const {option, active} = props;
    // let [ingredientes, setIngredientes] = useState([]);
  
    const dispatch = useDispatch();
    const userData = useSelector(selectUser);
    const sucursal = useSelector(selectSucursal);

    //Request Sucursales on page load
   useEffect( () => {
        dispatch(fetchSucursales(userData.info.username))
    }, [dispatch, userData]) 
    useEffect( () => {
        dispatch(fetchIngredients(sucursal))        
    }, [dispatch,sucursal])

    return (
        <>
            <div className="col-start-2 bg-[#F4F4F4] grid grid-rows-[2fr,8fr]">
                {/*TOP SECTION*/}
                <div className="row-start-1 flex w-full h-full">
                    <div className="w-1/2 mt-4">
                        <h1 className="text-3xl text-center"> INVENTARIO: </h1>
                        <DropDown active={active}/>
                    </div>
                    <div className="w-1/2 h-[140px] bg-[#000692] rounded-l-full shadow-[1px_1px_14px_3px_rgba(0,0,0,0.55)] place-self-start mt-8 flex"> 
                        <div className="h-[70%] w-[11.5%] relative top-[20px] left-[20px] rounded-full bg-[#EFEFEF]"></div>
                        <h1 className="text-[40px] text-white font-thin self-center ml-10"> USUARIO RESTAURANTE LOS 100 CIELOS </h1>
                    </div>
                </div>
                {/*INFORMATION SECTION*/}
                <div className="row-start-2 grid grid-cols-[8fr,2fr] mt-10">
                    <div className="col-start-1">
                        <InfoBox option={option}/>
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