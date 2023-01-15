import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewItem, createNewItem } from "../../slices/ingredientSlice";
import { updateRecipe } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { IngredientSelectDropdown, RecipeAndIngredientDropdown, UnitSelectDropdown } from "../ReactSelectDropdown/ReactSelectDropdown";

// INGREDIENTS

export default function Item(props) {
    const {name, quantity, price, unit} = props;
    return(
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
        const target = event?.target;
        const value = target?.value ?? event.e.value;
        const name = target?.name ?? event.metadata.name;

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
                        <input className="w-10/12 text-3xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={name} name="nombre" onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-8/12 text-3xl text-white font-thin mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" name="precio" defaultValue={price} onBlur={updateMyEntry}/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-3xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name="cantidad" defaultValue={quantity} onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-6/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <UnitSelectDropdown defaultValue={{label:unit, value: unit}} bgColor='#0067D1' color='#fff' isDisabled={false} update={updateMyEntry} metadata={{name: 'unidad'}}/>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function EmptyItem(props) {
    const {id, render} = props;
    const dispatch = useDispatch();
    const sucursal = useSelector(selectSucursal);

    useEffect( () => {
        const newItem = () => {
            if (sucursal){
                const newItem = {
                    id,
                    sucursal
                }
                dispatch(createNewItem(newItem))    
            }
        }
        newItem()
    },[dispatch,id,render,sucursal])


    const updateNewItem = (event) => {
        const target = event?.target;
        const name = target?.name ?? event.metadata.name;
        const value = target?.value ?? event.e.value;
        const updatedItem = {
            id,
            name,
            value
        }
        dispatch(addNewItem(updatedItem))
    }

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='nombre' className="text-3xl w-10/12 mt-3 ml-6 pl-2 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre" type='text' onBlur={updateNewItem}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='precio'  className="text-3xl w-8/12 mt-3 ml-6 pl-2 bg-inherit outline-none appearance-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" placeholder="Precio" type='number' onBlur={updateNewItem}/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-7/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='cantidad'  className="text-3xl text-left w-10/12 mt-3 ml-6 bg-inherit outline-none appearance-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Cantidad" type='number' onBlur={updateNewItem}/>
                    </div>
                    <div className="w-5/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <UnitSelectDropdown update={updateNewItem} bgColor='#0067D1' color='#fff' isDisabled={false} metadata={{name:'unidad'}}/>
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

// RECIPES

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
    const {name, quantity, unit} = props;

    return(
        <div className="w-11/12 h-[80px] mx-auto flex place-content-between mt-6">
            <div className="w-7/12 h-[60px] flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-3xl mt-3 ml-6"> {name} </h1>
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
    )
}

export function RecipeIngredient(props) {
    const {id, update} = props;

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around relative">
                <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <IngredientSelectDropdown update={update} bgColor='#F4F4F4'  color='#000' metadata={{name: 'ingrediente', id}}/>                    
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input type='number' id={id} name='cantidad' className="w-10/12 text-2xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={update}/>
                </div>
                <div className="w-2/12 h-[60px] ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <UnitSelectDropdown update={update} bgColor='#F4F4F4'  color='#000' isDisabled={false} metadata={{name: 'unidad', id, type:'ingrediente'}}/>
                </div>
            </div>
        </>
    )
}

export function EditableRecipeItem(props) {
    const {id, nombre, ingredientes, cantidades, unidades, sucursal} = props;
    // const [allowSend, setAllowSend] = useState(false)
    const [recipe, setRecipe] = useState({
        id,
        nombre,
        ingredientes,
        cantidades,
        unidades,
        sucursal
    });
    const dispatch = useDispatch();
    let [display, setDisplay] = useState(false)
    let newIngredientes = [...recipe.ingredientes]
    let newCantidades = [...recipe.cantidades];
    let newUnidades =[...recipe.unidades]
    // const recipes = useSelector(selectRecipes);

    const updateRecipeInfo = (event) => {
        const target = event?.target;
        const value = target?.value ?? event.e.value;
        const name = target?.name ?? event.metadata.name;
        const index = target?.attributes[0]?.value ?? event?.metadata?.index ?? null;
        switch(name){
            case 'nombre':
                setRecipe(prevRecipe => ({...prevRecipe, nombre: value}))
                break;
            case 'ingrediente':
                newIngredientes[index] = value;
                setRecipe(prevRecipe => ({...prevRecipe, ingredientes: newIngredientes}))
                break;
            case 'cantidad':
                newCantidades[index] = value;
                setRecipe(prevRecipe => ({...prevRecipe, cantidades: newCantidades}))
                break;
            case 'unidad':
                newUnidades[index] = value;
                setRecipe(prevRecipe => ({...prevRecipe, unidades: newUnidades}))
                break;
            default:
        }
    }

    const updateRecipeOnDB = () => {
        // if (allowSend) return dispatch(updateRecipe(recipe));
        dispatch(updateRecipe(recipe))
    }

    return(
        <div className="flex w-12/12 place-content-around items-start">
            <details className="w-7/12">
                <summary className="w-inherit h-[80px] ml-10 mt-6 bg-[#F4F4F4] flex place-content-between rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]" onClick={() => setDisplay(prev=>!prev)}>
                    <input className="text-3xl text-left font-semibold my-auto ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name='nombre' defaultValue={nombre} onBlur={updateRecipeInfo} onClick={(e)=>e.stopPropagation()}/>
                    <h1 className="text-xl text-right font-normal mx-auto place-self-center underline underline-offset-4 decoration-inv-blue cursor-pointer"> {display ? "COLAPSAR" :"EXPANDIR"} </h1>
                </summary>
                <div className="-mr-20 ml-10">
                    {ingredientes.map( (ingrediente,index) => {
                        return <EditableRecipeIngredient key={index} index={index} nombre={ingrediente} cantidad={cantidades[index]} unidad={unidades[index]} update={updateRecipeInfo}/>
                    })}
                </div>
            </details>
            <button className="bg-inv-blue w-3/12 h-fit p-2 mt-[36px] text-2xl text-white rounded-2xl self-start" onClick={updateRecipeOnDB}>
                ACTUALIZAR
            </button>
        </div>
    )

}

export function EditableRecipeIngredient(props) {
    const {index, nombre, cantidad, unidad, update} = props;
    return(
        <>
            <div className="w-11/12 h-[80px] mx-auto flex mt-2 place-content-around">
                <div className="w-5/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <IngredientSelectDropdown defaultValue={{label:nombre, value:nombre}} update={update} bgColor='#F4F4F4' color='#000'metadata={{name:'ingrediente', index}}/>
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input index={index} name='cantidad' className="w-9/12 text-2xl text-center font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={cantidad} onBlur={update}/>
                </div>
                <div className="w-4/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <UnitSelectDropdown defaultValue={{label:unidad, value:unidad}} update={update} bgColor='#F4F4F4' color='#000' isDisabled={false} metadata={{name:'unidad', index}}/>
                </div>
            </div>
        </>
    )
}

// PLATES

export function RecipeAndIngredientItem(props){
    const {update, id} = props;   
    const [isDisabled, setIsDisabled] = useState(true);

    const itemSelected = (data) => {
        setIsDisabled(false);
        update(data)
    }

    return(
        <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around relative">
            <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <RecipeAndIngredientDropdown bgColor="#F4F4F4" color='#000' update={itemSelected} metadata={{name:"recipe/ingredient", id}}/>
            </div>
            <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input id={id} type='number' name='cantidad' disabled={isDisabled} className="w-10/12 text-2xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={update}/>
            </div>
            <div className="w-2/12 h-[60px] ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <UnitSelectDropdown update={update} bgColor='#F4F4F4'  color='#000' metadata={{name: 'unidad', id}} isDisabled={isDisabled}/>
            </div>
    </div>
    )
}