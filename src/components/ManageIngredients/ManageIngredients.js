import React, { useState } from "react";

import { EmptyItemList, EmptyRecipeList } from "../Item/ItemList.js";

import PlusIcon from "../../assets/Plus.png";

export default function ManageIngredient(props) {
    const {title} = props;
    const [amount, setAmount] = useState(1);
    const [pressed, setPressed] = useState(1);

    const pressedStyle = "bg-inv-blue text-white p-1 rounded-t-lg";
    const defaultStyle = "p-1 rounded-t-lg";

    const addEmptyItem = () =>{
        setAmount( prevAmount => prevAmount + 1);
    }

    const changePressed = current => {
        setPressed(current)
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    <div className="flex place-content-evenly mt-4 text-xl font-semibold">
                        <button className={pressed === 1 ? pressedStyle : defaultStyle} onClick={() => changePressed(1)}>AGREGAR INGREDIENTE</button>
                        <button className={pressed === 2 ? pressedStyle : defaultStyle} onClick={() => changePressed(2)}>AGREGAR RECETA</button>
                    </div>
                    <div className=" h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-inv-blue via-transparent to-transparent">
                        {pressed === 1 ? <EmptyItemList renderAmount={amount}/> : <EmptyRecipeList/>}
                    </div>                    
                    <div className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto mt-10">
                        <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addEmptyItem}/>
                    </div>
                </div>
            </div>
        </>
    );
}