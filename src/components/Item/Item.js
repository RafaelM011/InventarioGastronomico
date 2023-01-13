import React, { useRef, useState, useEffect, useId } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewItem, createNewItem, selectIngredients } from "../../slices/ingredientSlice";
import { addRefAmount, createNewRecipe, recipeMessage, selectRecipes, updateNewRecipe, updateRecipe } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { IngredientSelectDropdown, UnitSelectDropdown } from "../ReactSelectDropdown/ReactSelectDropdown";

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
                        <input className="w-10/12 text-3xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={name} name="nombre" onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-8/12 text-3xl text-white font-thin mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" name="precio" defaultValue={price} onBlur={updateMyEntry}/>
                    </div>
                </div>
                <div className="w-5/12 h-[60px] flex">
                    <div className="w-9/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-10/12 text-3xl mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name="cantidad" defaultValue={quantity} onBlur={updateMyEntry}/>
                    </div>
                    <div className="w-3/12 h-[60px] ml-[-10px] bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input className="w-8/12 text-3xl text-white font-thin mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" name="unidad" defaultValue={unit} onBlur={updateMyEntry}/>
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
        const name = target?.name ?? event.name;
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
                        <UnitSelectDropdown update={updateNewItem} bgColor='#0067D1'/>
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
                        <input ref={quantityRef} className="w-9/12 text-3xl text-right font-semibold mt-3 ml-8 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" onChange={updateRef}/>
                    </div>
                </div>
            </div>  
        </>
    )
}

export function RecipeIngredient(props) {
    const {id, amount} = props;
    const sucursal = useSelector(selectSucursal);
    const dispatch = useDispatch();

    useEffect( () => {
        const newItem = () => {
            if ( id === amount - 1 && sucursal){
                dispatch(createNewRecipe({id}))    
            }
        }
        newItem()
    },[dispatch,id,amount,sucursal])

    const updateNewRecipeInfo = (event) => {
        const target = event?.target;
        const name = target?.name ?? event.name;
        const value = target?.value ?? event.e.value;
        const newRecipeInfo = {
            id,
            name,
            value,
        }
        dispatch(updateNewRecipe(newRecipeInfo))
    }

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around relative">
                <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <IngredientSelectDropdown update={updateNewRecipeInfo} bgColor='#F4F4F4'/>                    
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input type='number' id={id} name='cantidad' className="w-10/12 text-2xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={updateNewRecipeInfo}/>
                </div>
                <div className="w-2/12 h-[60px] ml-[-10px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <UnitSelectDropdown update={updateNewRecipeInfo} bgColor='#F4F4F4'/>
                </div>
            </div>
        </>
    )
}

export function EditableRecipeItem(props) {
    const {id, nombre, ingredientes, cantidades, sucursal} = props;
    const [allowSend, setAllowSend] = useState(false)
    const [recipe, setRecipe] = useState({
        id,
        nombre,
        ingredientes,
        cantidades,
        sucursal
    });
    const dispatch = useDispatch();
    let newIngredientes = [...recipe.ingredientes];
    let newCantidades = [...recipe.cantidades];
    let [display, setDisplay] = useState(false)
    const unique = useId();
    const ingredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);

    const updateRecipeInfo = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const index = target.attributes[1].value;
        let ingredientExist = true;
        let recipeNameExist = false;

        if (name === 'ingredientes') ingredientExist = validateIngredient(value)
        if (name === 'nombre') recipeNameExist = recipes.some(recipe => recipe.nombre === value)

        if (ingredientExist && !recipeNameExist && value !== ''){
            switch (name){
                case 'nombre':
                    setRecipe( recipe => {
                        return {...recipe, nombre: value}
                    });
                    break;
                case 'ingredientes':
                    newIngredientes[index] = value;
                    setRecipe( recipe => {
                        return {...recipe, ingredientes: newIngredientes}
                    });
                    break;
                case 'cantidades':
                    newCantidades[index] = value;
                    setRecipe( recipe => {
                        return {...recipe, cantidades: newCantidades}
                    });
                    break;
                default:
            }
            setAllowSend(true)
        }
        else{
            setAllowSend(false)
            if (e.type !== 'focus')  {
                value === '' ? 
                dispatch(recipeMessage('Missing field(s)')) :
                !recipeNameExist ? 
                dispatch(recipeMessage('This ingredient does not exist')) :
                dispatch(recipeMessage('This recipe name already exist'))
            }
        }
    }

    const updateRecipeOnDB = () => {
        if (allowSend) return dispatch(updateRecipe(recipe));
    }

    const validateIngredient = (name) => {
        const exist = ingredients.some(ingredient => ingredient.nombre.includes(name))
        return exist
    }

    return(
        <div className="flex w-12/12 place-content-around items-start">
            <details className="w-7/12">
                <summary className="w-inherit h-[80px] ml-10 mt-6 bg-[#F4F4F4] flex place-content-between rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]" onClick={() => setDisplay(prev=>!prev)}>
                    <input className="text-3xl text-left font-semibold my-auto ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name='nombre' defaultValue={nombre} onBlur={updateRecipeInfo} onClick={(e)=>e.stopPropagation()}/>
                    <h1 className="text-xl text-right font-normal mx-auto place-self-center underline underline-offset-4 decoration-inv-blue cursor-pointer"> {display ? "COLAPSAR" :"EXPANDIR"} </h1>
                </summary>
                <div>
                    {ingredientes.map( (ingrediente,index) => {
                        return <EditableRecipeIngredient key={index} id={unique} index={index} nombre={ingrediente} cantidad={cantidades[index]} update={updateRecipeInfo}/>
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
    const {id, index, nombre, cantidad, update} = props;
    const ingredients = useSelector(selectIngredients)
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
    const [show, setShow] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false)

    const setDisplay = (event) =>{
        if (!isMouseOver || event.type === 'focus') {
            setShow(prevState => !prevState)
            update(event)
        }
        else if (event.type === 'click'){
            document.getElementById(`${id}${index}`).value = event.target.innerHTML;
            setIsMouseOver(false)
            document.getElementById(`${id}${index}`).focus()
            document.getElementById(`${id}${index}`).blur()
        }
    }

    const filterIngredientList = (event) => {
        const value = event.target.value;
        const filtered = ingredients.filter(ingredient => ingredient.nombre.toLowerCase().includes(value.toLowerCase()))
        setFilteredIngredients(filtered)
    }
    
    const render = 
    <div className="ring-4 ring-inv-blue w-6/12 max-h-[180px] min-h-fit absolute top-full py-2 bg-[#F4F4F4] rounded-xl z-30 overflow-auto scrollbar-hide" onMouseEnter={() => setIsMouseOver(true)} onMouseLeave={() => setIsMouseOver(false)}> 
        {filteredIngredients.map( ingredient => <button key={ingredient.id} id={ingredient.id} className="w-full pl-8 text-left text-lg font-semibold hover:bg-gradient-to-r from-transparent to-[#000692CC] hover:scale-95 block rounded-lg" onClick={setDisplay}>{ingredient.nombre}</button>)}    
    </div>

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around">
                <div className="relative w-9/12 h-2/12">
                    <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                        <input id={`${id}${index}`} index={index} name='ingredientes' className=" w-10/12 text-2xl text-left font-normal mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={nombre} onChange={filterIngredientList} onFocus={setDisplay} onBlur={setDisplay}/>
                    </div>
                    {show ? render : null}
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input index={index} name='cantidades' className="w-9/12 text-2xl text-center font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={cantidad} onBlur={update}/>
                </div>
            </div>
        </>
    )
}