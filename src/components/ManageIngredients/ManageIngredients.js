import React, { useState } from "react";

import { AddPlateScreen, EmptyItemList, EmptyRecipeList } from "../Item/ItemList.js";

export default function ManageIngredient(props) {
    const {title} = props;
    const [amount, setAmount] = useState(1);
    const [pressed, setPressed] = useState(1);

    const pressedStyle = "bg-inv-blue text-white p-1 rounded-t-lg";
    const defaultStyle = "p-1 rounded-t-lg";

    const addEmptyItem = () =>{
        setAmount( prevAmount => prevAmount + 1);
    }

    return(
        <>
            <div className="row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    <div className="flex place-content-evenly mt-4 text-xl font-semibold">
                        <button className={pressed === 1 ? pressedStyle : defaultStyle} onClick={() => setPressed(1)}>AGREGAR INGREDIENTE</button>
                        <button className={pressed === 2 ? pressedStyle : defaultStyle} onClick={() => setPressed(2)}>AGREGAR RECETA</button>
                        <button className={pressed === 3 ? pressedStyle : defaultStyle} onClick={() => setPressed(3)}>AGREGAR PLATO</button>
                    </div>
                    {pressed === 1 ? <EmptyItemList renderAmount={amount} addItem={addEmptyItem}/> : pressed === 2 ? <EmptyRecipeList/> : <AddPlateScreen/>}
                </div>
            </div>
        </>
    );
}