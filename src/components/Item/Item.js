import React, { useRef } from "react";

import { useDispatch } from "react-redux";
import { addRefAmount } from "../../slices/recipeSlice";


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

export  function EditableItem(props) {
    const {index, name, quantity, price, unit, updateFunction} = props;
    const info = {
        index,
        name,
        quantity,
        price,
        unit
    }

    const updateMyEntry = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

       switch(name) {
            case "nombre":
                info.name = value;
                break;
            case "cantidad":
                info.quantity = value;
                break;
            case "precio":
                info.price = value;
                break;
            case "unidad":
                info.unit = value;
                break;
            default:
        }     

        updateFunction(info)
    }

    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl mt-3 ml-6 bg-inherit outline-none" defaultValue={name} name="nombre" onChange={updateMyEntry}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl text-white font-thin mt-3 ml-6 bg-inherit w-9/12 outline-none" name="precio" defaultValue={price} onChange={updateMyEntry}/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl mt-3 ml-6 bg-inherit outline-none" name="cantidad" defaultValue={quantity} onChange={updateMyEntry}/>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="text-3xl text-white font-thin mt-3 ml-6 bg-inherit w-8/12 outline-none" name="unidad" defaultValue={unit} onChange={updateMyEntry}/>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function EmptyItem(props) {
    const {id, addFunction} = props;
    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='nombre' className="text-3xl w-10/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Nombre" type='text'onChange={addFunction}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='precio'  className="text-3xl w-8/12 mt-3 ml-6 bg-inherit outline-none appearance-none" placeholder="Precio" type='number' onChange={addFunction}/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-8/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='cantidad'  className="text-3xl w-10/12 mt-3 ml-6 bg-inherit outline-none placeholder:text-right appearance-none text-right" placeholder="Cantidad" type='number' onChange={addFunction}/>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='unidad'  className="text-3xl w-8/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Unidad" type='text' onChange={addFunction}/>
                    </div>
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

export function RecipesHeader(){
    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="underline underline-offset-4 decoration-2 text-3xl text-left font-semibold mt-3 ml-6"> NOMBRE </h1>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="underline underline-offset-4 decoration-2 text-3xl text-right font-semibold mt-3 mr-6"> CANTIDAD </h1>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function RecipeItem(props) {
    const {name, id} = props;
    const quantityRef = useRef();
    const dispatch = useDispatch();

    const updateRef = () => {
        const obj = {
            refAmount: quantityRef.current.value,
            id,
        }
        dispatch(addRefAmount(obj))
    }

    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <h1 className="text-3xl text-left font-semibold mt-3 ml-6"> {name} </h1>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input ref={quantityRef} className="w-9/12 text-3xl text-right font-semibold mt-3 ml-8 bg-inherit outline-none" onChange={updateRef}/>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function RecipeIngredient(props) {
    const {addRecipeInfo, id} = props;
    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around">
                <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input id={id} name='ingredientes' className=" w-11/12 text-2xl text-left font-normal mt-3 ml-6 bg-inherit outline-none" placeholder="NOMBRE" onChange={addRecipeInfo}/>
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input id={id} name='cantidades' className="w-10/12 text-2xl text-right font-normal mt-3 ml-3 bg-inherit outline-none" placeholder="CANTIDAD"  onChange={addRecipeInfo}/>
                </div>
            </div>
        </>
    )
}