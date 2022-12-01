import React, { useState } from "react";

import { EditableItemList, EditableRecipeList } from "../Item/ItemList";

export default function ConfigInventory(props) {
    const {title} = props;
    const [pressed, setPressed] = useState(1);
    const pressedStyle = "bg-inv-blue text-white p-1 rounded-t-lg";
    const defaultStyle = "p-1 rounded-t-lg";

    const changePressed = current => {
        setPressed(current)
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    <div className="flex place-content-evenly mt-4 text-xl font-semibold">
                        <button className={pressed === 1 ? pressedStyle : defaultStyle} onClick={() => changePressed(1)}>CONFIGURAR INGREDIENTE</button>
                        <button className={pressed === 2 ? pressedStyle : defaultStyle} onClick={() => changePressed(2)}>CONFIGURAR RECETA</button>
                    </div>
                    {pressed === 1 ? <EditableItemList/> : <EditableRecipeList/>}
                </div>
            </div>
        </>
    );
}