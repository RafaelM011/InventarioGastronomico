import React from "react";
import { DisplayMessage } from "../DisplayMessage/DisplayMessage";
import { PlateSaleReport } from "../Item/ItemList";

export default function ReportSale(props) {
    const {title} = props;

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    <PlateSaleReport/>
                </div>
            </div>
            <DisplayMessage type={'ingredient'}/>
        </>
    );
}