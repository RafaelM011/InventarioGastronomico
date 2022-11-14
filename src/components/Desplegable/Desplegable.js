import React from "react";

import { LargeMenu, LargeMenuOptions, SmallMenu, SmallMenuOptions } from "../../components/Menu/Menu";

import DesplegarFlecha from "../../assets/menu_arrow.png";

export default function Desplegable(props) {
    const {isActive, buttonOffset, deploy} = props;
    
    return(
        <>
            <div className="col-start-1 z-20 shadow-[8px_8px_8px_0px_#bbb] flex flex-col items-center">
                { isActive ? <LargeMenu/> : <SmallMenu/>}
                <button className={`w-[70px] h-[70px] rounded-full bg-[#EFEFEF] place-self-end place-content-center relative ${buttonOffset} left-[30px] flex`} onClick={deploy}>
                    <img className={`place-self-center ${isActive ? 'rotate-90 mr-2' : '-rotate-90 ml-2'}`} src={DesplegarFlecha} alt="flecha desplegar menu"/>
                </button>
                { isActive ? <LargeMenuOptions/> : <SmallMenuOptions/>}
            </div>
        </>
    )
}