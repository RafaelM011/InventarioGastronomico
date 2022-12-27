import React, { useEffect, useState } from "react";

import Desplegable from "../../components/Desplegable/Desplegable";
import Datasheet from "../../components/Datasheet/Datasheet";
import { useNavigate } from "react-router-dom";

export default function SuplirIngredientes() {
    let [gridLayout, setGridLayout] = useState('grid-cols-[1fr,9fr]');
    let [buttonOffsetTop, setButtonOffsetTop] = useState('top-[-85px]');
    let [active, setActive] = useState(false);
    const navigate = useNavigate();

    useEffect( () => {
        if (!sessionStorage.getItem('username')) navigate('/')
    },[navigate])
    function deployMenu(){
        if (active === false) {
            setGridLayout("grid-cols-[3fr,7fr]");
            setButtonOffsetTop("top-[-157px]");
            setActive(true);
        }
        else {
            setGridLayout("grid-cols-[1fr,9fr]");
            setButtonOffsetTop("top-[-85px]");
            setActive(false);
        }
        return;
    }

    return(
        <>
            <div className={`grid ${gridLayout} h-screen w-screen`}>
                {/*PRIMERA COLUMNA*/}
                <Desplegable isActive={active} buttonOffset={buttonOffsetTop} deploy={deployMenu}/>
                {/*SEGUNDA COLUMNA*/}
                <Datasheet option={{id: 2, title: "ADMINISTRAR INVENTARIO"}} active={active}/>
            </div>
        </>
    )
}