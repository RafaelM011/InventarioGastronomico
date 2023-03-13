import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewItem, createNewItem, selectIngredients } from "../../slices/ingredientSlice";
import { selectRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { IngredientSelectDropdown, RecipeAndIngredientDropdown, UnitSelectDropdown } from "../ReactSelectDropdown/ReactSelectDropdown";

// INGREDIENTS

export default function Item(props) {
    const {name, quantity, price, unit} = props;
    return(
        <div className="w-11/12 h-fit mx-auto flex place-content-between mt-6">
            <div className="w-7/12 h-fit flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl mt-3 ml-6"> {name} </h1>
                </div>
                <div className="w-3/12 h-fit pb-2 ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="decoration-2 text-xl text-white font-thin mt-3 ml-6"> {price} $ </h1>
                </div>
            </div>
            <div className="w-5/12 h-fit flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl text-right mt-3 mr-6"> {quantity} </h1>
                </div>
                <div className="w-5/12 h-fit pb-2 ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl text-white font-thin mt-3 ml-6"> {unit} </h1>
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
            <div className="w-11/12 h-fit mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-fit flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={name} name="nombre" onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-3/12 h-fit pb-2 ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-9/12 text-xl text-white font-thin mt-3 ml-6 pl-1 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" name="precio" defaultValue={price} onBlur={updateMyEntry}/>
                    </div>
                </div>
                <div className="w-5/12 h-fit flex">
                    <div className="w-6/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name="cantidad" defaultValue={quantity} onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-6/12 h-fit ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <UnitSelectDropdown defaultValue={unit} bgColor='#0067D1' color='#fff' isDisabled={false} notRecipe={true} isRecipe={false} update={updateMyEntry} metadata={{name: 'unidad'}}/>
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
            <div className="w-10/12 h-fit mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-fit flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='nombre' className="text-xl w-10/12 mt-3 ml-6 pl-2 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre" type='text' onBlur={updateNewItem}/>
                    </div>
                    <div className="w-3/12 h-fit pb-2 ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='precio' className="text-xl w-8/12 mt-3 ml-6 pl-2 bg-inherit outline-none appearance-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" placeholder="Precio" type='number' onBlur={updateNewItem}/>
                    </div>
                </div>
                <div className="w-5/12 h-fit flex">
                    <div className="w-7/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={id} name='cantidad' className="text-xl text-left w-10/12 mt-3 ml-6 bg-inherit outline-none appearance-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Cantidad" type='number' onBlur={updateNewItem}/>
                    </div>
                    <div className="w-5/12 h-fit ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <UnitSelectDropdown update={updateNewItem} bgColor='#0067D1' color='#fff' verify={false} metadata={{name:'unidad'}}/>
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
        <div className="w-11/12 h-fit mx-auto flex place-content-between mt-6">
            <div className="w-7/12 h-fit flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl mt-3 ml-6"> {name} </h1>
                </div>
            </div>
            <div className="w-5/12 h-fit flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl text-right mt-3 mr-6"> {quantity} </h1>
                </div>
                <div className="w-5/12 h-fit pb-2 ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl text-white font-thin mt-3 ml-6"> {unit} </h1>
                </div>
            </div>
        </div>  
    )
}

export function RecipeIngredient(props) {   
    const {id, update} = props;
    const [selectedIngredient, setSelectedIngredient] = useState('');

    const selectIngredient = (event) => {
        setSelectedIngredient(event.e)
        update(event);
    }

    return(
        <>
            <div className="w-10/12 h-[fit mx-auto flex mt-2 place-content-around relative">
                <div className="w-6/12 h-fit bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <IngredientSelectDropdown update={selectIngredient} bgColor='#F4F4F4'  color='#000' metadata={{name: 'ingrediente', id}}/>                    
                </div>
                <div className="w-2/12 h-fit pb-2 z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input type='number' id={id} name='cantidad' className="w-10/12 text-xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Cantidad" onBlur={update}/>
                </div>
                <div className="w-2/12 h-fit ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <UnitSelectDropdown update={update} bgColor='#F4F4F4' color='#000' selected={selectedIngredient} verify={true} metadata={{name: 'unidad', id, type:'ingrediente'}}/>
                </div>
            </div>
        </>
    )
}

export function EditableRecipeItem(props) {
    const {unit, quantity, name, index, updateFunction} = props;
    const info = {
        index,
        name,
        quantity,
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
            case "unidad":
                info.unit = value;
                break;
            default:
        }     

        updateFunction(info)
    }

    return(
        <>
            <div className="w-11/12 h-fit mx-auto flex place-content-between mt-6">
                <div className="w-7/12 h-fit flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={name} name="nombre" onBlur={updateMyEntry}/>
                    </div>
                </div>
                <div className="w-5/12 h-fit flex">
                    <div className="w-6/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name="cantidad" defaultValue={quantity} onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-6/12 h-fit ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <UnitSelectDropdown defaultValue={unit} bgColor='#0067D1' color='#fff' isDisabled={false} notRecipe={true} isRecipe={false} update={updateMyEntry} metadata={{name: 'unidad'}}/>
                    </div>
                </div>
            </div>  
        </>
    )
}

// PLATES

export function PlateItem(props){
    const {nombre, ingredientes, recetas, update} = props;
    const ingredients = [];
    const recipes = [];
    ingredientes.forEach((ingrediente, index) => {
        ingredients[index] = {...ingrediente}
    })
    recetas.forEach((receta, index) => {
        recipes[index] = {...receta}
    })

    const info = {
        nombre,
        ingredientes: ingredients,
        recetas: recipes
    }


    return(
        <div className="w-11/12 h-fit mx-auto flex place-content-between mt-6">
            <div className="w-7/12 h-fit flex">
                <div className="w-10/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <h1 className="text-xl mt-3 ml-6"> {nombre} </h1>
                </div>
            </div>
            <div className="w-4/12 h-fit flex">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input onBlur={(event) => update({event, info })} placeholder="Cantidad" className="w-11/12 text-xl text-left pl-4 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue"/>
                </div>
            </div>
    </div>  
    )
}

export function RecipeAndIngredientItem(props){
    const {update, id} = props;   
    const [selectedIngredient, setSelectedIngredient] = useState('');

    const itemSelected = (data) => {
        setSelectedIngredient(data.e)
        update(data)
    }

    return(
        <div className="w-10/12 h-fit mx-auto flex mt-2 place-content-around relative">
            <div className="w-6/12 h-fit bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <RecipeAndIngredientDropdown bgColor="#F4F4F4" color='#000' update={itemSelected} metadata={{name:"recipe/ingredient", id}}/>
            </div>
            <div className="w-2/12 h-fit pb-2 z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input id={id} type='number' name='cantidad' className="w-10/12 text-xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={update}/>
            </div>
            <div className="w-2/12 h-fit ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <UnitSelectDropdown update={update} bgColor='#F4F4F4' selected={selectedIngredient} verify={true} color='#000' metadata={{name: 'unidad', id}}/>
            </div>
    </div>
    )
}

export function EditablePlateItem(props){
    const {nombre, recetas, ingredientes, index, updateFunction} = props;
    const [isShowing, setIsShowing] = useState(false);
    const info = {
        index,
        nombre,
        ingredientes: [...ingredientes],
        recetas: [...recetas]
    }

    const updateMyEntry = ({event, index, type}) => {
        const target = event?.target;
        const value = target?.value ?? event.e.value;
        const name = target?.name ?? event.metadata.name;

       switch(name) {
            case "nombre":
                info.nombre = value;
                break;
            case "cantidad":
                if(type === 'ingrediente') info.ingredientes[index] = {...info.ingredientes[index], cantidad: value};
                else info.recetas[index] = {...info.recetas[index], cantidad: value};
                break;
            case "unidad":
                if(type === 'ingrediente') info.ingredientes[index] = {...info.ingredientes[index], unidad: value};
                else info.recetas[index] = {...info.recetas[index], unidad: value};
                break;
            default:
        }     
        updateFunction(info)
    }

    const show = () => {
        setIsShowing(prevState => !prevState)
    }
 
    return(
        <>
            <div className="w-11/12 h-fit mx-auto flex-col place-content-between mt-6">
                <div className="w-7/12 h-fit flex">
                    <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={nombre} name="nombre" onBlur={ event => updateMyEntry({event})}/>
                    </div>
                    <div className="cursor-pointer w-fit h-fit rounded-full p-3 ml-4 bg-inv-blue text-white font-semibold" onClick={show}> {!isShowing ? "SHOW" : "HIDE"} </div>
                </div>
                <div className="w-full h-fit flex-col">
                    {isShowing ? 
                        <div> 
                            {ingredientes.length === 0 ? null : 
                                <div className="flex"> 
                                    {ingredientes.map((ingrediente, index) => {
                                        return <EditablePlateIngredient key={index} index={index} nombre={ingrediente.nombre} unidad={ingrediente.unidad} cantidad={ingrediente.cantidad} update={updateMyEntry}/>
                                    })}
                                </div>
                            }
                            {recetas.length === 0 ? null : 
                                <div className="flex"> 
                                    {recetas.map((receta, index) => {
                                        return <EditablePlateRecipe key={index} index={index} nombre={receta.nombre} unidad={receta.unidad} cantidad={receta.cantidad} update={updateMyEntry}/>
                                    })}
                                </div>
                            }
                        </div>
                    : 
                        null}
                </div>
            </div>  
        </>
    ) 
}

export function EditablePlateIngredient(props){
    const {index, nombre, unidad, cantidad, update} = props;
    const selectedIngredient = {label: nombre, type: 'ingrediente', unidad, value: nombre};

    const updatePlateRecipe = (event) => {
        update({event, index, type: 'ingrediente'})
    }  

    return(
        <div className="w-10/12 h-fit mx-auto flex mt-2 place-content-around relative">
            <div className="w-5/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" value={nombre} name="nombre" readOnly/>
            </div>
            <div className="w-3/12 h-fit pb-2 z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input type='number' defaultValue={cantidad} name='cantidad' className="w-10/12 text-xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={e => updatePlateRecipe(e)}/>
            </div>
            <div className="w-3/12 h-fit ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <UnitSelectDropdown update={updatePlateRecipe} bgColor='#F4F4F4' selected={selectedIngredient} verify={true} color='#000' metadata={{name: 'unidad'}} defaultValue={unidad}/>
            </div>
    </div>
    )
}

export function EditablePlateRecipe(props){
    const {index, nombre, unidad, cantidad, update} = props;
    const selectedIngredient = {label: nombre, type: 'ingrediente', unidad, value: nombre};

    const updatePlateRecipe = (event) => {
        update({event, index, type: 'receta'})
    }  
    
    return(
        <div className="w-10/12 h-fit mx-auto flex mt-2 place-content-around relative">
            <div className="w-5/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input className="w-10/12 text-xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" value={nombre} name="nombre" readOnly/>
            </div>
            <div className="w-3/12 h-fit pb-2 z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <input type='number' defaultValue={cantidad} name='cantidad' className="w-10/12 text-xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={e => updatePlateRecipe(e)}/>
            </div>
            <div className="w-3/12 h-fit ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                <UnitSelectDropdown update={updatePlateRecipe} bgColor='#F4F4F4' selected={selectedIngredient} verify={true} color='#000' metadata={{name: 'unidad'}} defaultValue={unidad}/>
            </div>
    </div>
    )
}


// CALCULATOR

export function CalcultorItem(props){
    const {nombre, ingredientes, recetas, update} = props
    const ingredients = [];
    const recipes = [];
    ingredientes.forEach((ingrediente, index) => {
        ingredients[index] = {...ingrediente}
    })
    recetas.forEach((receta, index) => {
        recipes[index] = {...receta}
    })

    const info = {
        nombre,
        ingredientes: ingredients,
        recetas: recipes
    }

    return(
        <div className="flex place-content-between mx-20 my-4">
            <p className="w-8/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{nombre}</p>
            <input className="w-2/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center" type='number' placeholder="cantidades" onBlur={(event) => update({event,info})}/>
        </div>
    )
}

export function ResultDisplay(props){
    const {ingredientes, recetas, toggle} = props;

    return(
        <>
            <div className="flex flex-col items-start h-full pt-4">
                <h1 className="text-black text-xl font-semibold text-left pl-10 border-b-2 border-white w-full"> INGREDIENTES </h1>
                <div className="w-full h-1/2 overflow-auto scrollbar-hide pt-2">
                    {[...ingredientes.keys()].map(ingrediente => {
                        return <ResultItem key={ingrediente} nombre={ingrediente} cantidad={ingredientes.get(ingrediente)}/>
                    })}
                </div>
                <h1 className="text-black text-xl font-semibold text-left pl-10 border-b-2 border-white w-full"> RECETAS </h1>
                <div className="w-full h-1/2 overflow-auto scrollbar-hide pt-2">
                    {[...recetas.keys()].map(receta => {
                        return <ResultItem key={receta} nombre={receta} cantidad={recetas.get(receta)}/>
                    })}
                </div>
            </div>
            <button className="h-fit w-fit p-2 bg-inv-blue text-white rounded-xl ml-4 mt-4" onClick={toggle}>
                Toggle
            </button>
        </>
    )

}

export function ResultItem(props){
    const {nombre, cantidad} = props;
    const ingredientes = useSelector(selectIngredients);
    const recetas = useSelector(selectRecipes);
    const ingredienteActual  = ingredientes.filter(ingrediente => ingrediente.nombre === nombre)
    const recetaActual = recetas.filter(receta => receta.nombre === nombre);

    return(
        <div className="flex place-content-between px-20">
            <h1 className="w-5/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-left my-2"> {nombre} </h1>
            <h1 className="self-center font-semibold w-1/12"> Inventario: </h1>
            <h1 className="w-1/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-center my-2"> {ingredienteActual[0]?.cantidad ?? recetaActual[0]?.cantidad} </h1>
            <h1 className="self-center font-semibold w-1/12"> Requiere: </h1> 
            <h1 className={`w-1/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] ${parseInt(ingredienteActual[0]?.cantidad) >= parseInt(cantidad) || parseInt(recetaActual[0]?.cantidad) >= parseInt(cantidad) ? 'bg-green-400':'bg-red-400'} pl-4 py-1 font-semibold text-medium text-center my-2`}> {cantidad} </h1>
        </div>
    )
}

export function SummaryDisplay(props){
    const {toggle, data} = props;
    const render = [];

    data.forEach( (info, nombre) => {
        render.push(<SummaryItem key={nombre} nombre={nombre} info={info}/>)
    })

    return(
        <>
            <div className="h-full pt-4">
                {render}                
            </div>
            <button className="h-fit w-fit p-2 bg-inv-blue text-white rounded-xl ml-4 mt-4" onClick={toggle}>
                Toggle
            </button>
        </>
    )
}

export function SummaryItem(props){
    const {nombre, info} = props;
    const length = info.ingredientes?.length + info.recetas?.length;

    return(
        <div className="">
            <h1 className="text-black text-xl font-semibold text-left pl-10 border-b-2 border-white w-full"> {`${nombre} - ${length} items`} </h1>
            {info.ingredientes?.map((ingrediente,index) => {
                return(
                    <div key={`ing${index}`} className="flex place-content-between px-20">
                        <h1 className="w-5/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-left my-2"> {ingrediente.nombre} </h1>
                        <h1 className="w-2/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-center my-2"> {ingrediente.cantidad} {ingrediente.unidad} </h1>
                    </div>
                )
            })}
            {info.recetas?.map((receta,index) => {
                return(
                    <div key={`rec${index}`} className="flex place-content-between px-20">
                        <h1 className="w-5/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-left my-2"> {receta.nombre} </h1>
                        <h1 className="w-2/12 h-fit rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-medium text-center my-2"> {receta.cantidad} {receta.unidad} </h1>
                    </div>
                )
            })}
        </div>
    )
}