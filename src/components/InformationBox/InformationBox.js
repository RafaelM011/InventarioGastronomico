import React from "react";

import { ItemsHeader } from "../Item/Item";
import ItemList from "../Item/ItemList";

export default function InfoBox(props) {
    const {title} = props;

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1> 
                        <ItemsHeader/>
                    <div className=" h-[500px] overflow-auto scrollbar-hide">
                        <ItemList/>
                    </div>                                    
                </div>
            </div>
        </>
    );
}