import React, { useState } from "react";

import { ItemsHeader} from "../Item/Item.js";
import { EmptyItemList } from "../Item/ItemList.js";

export default function ManageIngredient(props) {
    const {option} = props;
    const [amount, setAmount] = useState(1);

    const addEmptyItem = () =>{
        setAmount( prevAmount => prevAmount + 1);
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {option} </h1>
                    <ItemsHeader/>
                    <div className=" h-[460px] overflow-auto scrollbar-hide">
                        <EmptyItemList renderAmount={amount}/>    
                    </div>
                    <div className="h-[60px] w-[60px] bg-inv-blue rounded-full mt-2 mx-auto">
                        <button className="text-[38px] ml-4 text-white" onClick={addEmptyItem}> + </button>
                    </div>
                </div>
            </div>
        </>
    );
}