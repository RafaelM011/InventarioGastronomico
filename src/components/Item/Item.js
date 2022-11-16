import React from "react";

import PlusIcon from "../../assets/Plus.png";

export default function Item(props) {
    const {name, quantity, price, unit} = props;
    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="text-3xl mt-3 ml-6"> {name} </h1>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="decoration-2 text-3xl text-white font-thin mt-3 ml-6"> {price} $ </h1>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="text-3xl text-right mt-3 mr-6"> {quantity} </h1>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="text-3xl text-white font-thin mt-3 ml-6"> {unit} </h1>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function EmptyItem() {
    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl w-10/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Nombre" type='text'/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl w-8/12 mt-3 ml-6 bg-inherit outline-none appearance-none" placeholder="Precio" type='number'/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-8/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl w-10/12 mt-3 ml-6 bg-inherit outline-none placeholder:text-right appearance-none text-right" placeholder="Cantidad" type='number'/>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl w-8/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Unidad" type='text'/>
                    </div>
                </div>
                <div className="h-[60px] w-[60px] bg-inv-blue rounded-full">
                    <img className="mx-auto mt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon'/>
                </div>
            </div>  
        </>
    )
}

export function ItemsHeader() {
    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="underline underline-offset-4 decoration-2 text-3xl text-left font-semibold mt-3 ml-6"> NOMBRE </h1>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="underline underline-offset-4 decoration-2 text-3xl font-semibold text-white text-left mt-3 ml-3"> PRECIO </h1>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="underline underline-offset-4 decoration-2 text-3xl text-right font-semibold mt-3 mr-6"> CANTIDAD </h1>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="text-3xl text-white text-left font-semibold underline underline-offset-4 decoration-2 mt-3 ml-3"> UNIDAD </h1>
                    </div>
                </div>
            </div>  
        </>
    )
}