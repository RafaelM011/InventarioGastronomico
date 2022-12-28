import React, { useRef, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addNewItem, createNewItem, selectIngredients } from "../../slices/ingredientSlice";
import { addRefAmount, createNewRecipe, updateNewRecipe, updateRecipe } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";


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
            if ( id === render - 1 && sucursal){
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
        const target = event.target;
        const id = target.id;
        const name = target.name;
        const value = target.value;

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
                        <input id={id} name='unidad'  className="text-3xl w-8/12 mt-3 ml-6 pl-2 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-white" placeholder="Unidad" type='text' onBlur={updateNewItem}/>
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
    const [show, setShow] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const sucursal = useSelector(selectSucursal);
    const ingredients = useSelector(selectIngredients);
    const [filteredIngredients, setFilteredIngredients] = useState(ingredients);
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
        const target = event.target;
        const id = target.id;
        const name = target.name || 'ingrediente';
        const value = target.value || target.innerHTML;

        const newRecipeInfo = {
            id,
            name,
            value,
        }
        dispatch(updateNewRecipe(newRecipeInfo))
    }

    const changeMouseOver = () => {
        setIsMouseOver(mouseOver => !mouseOver)
    }

    const showIngredientList = (event) => {
        if(!isMouseOver) {
            updateNewRecipeInfo(event)
            setShow(prevState => !prevState)
        }else if(event.type === 'focus')(
            setShow(prevState => !prevState)            
        )
    }

    const changeIngredientInput = (event) => {
        document.getElementById(event.target.id).value = event.target.innerHTML
        updateNewRecipeInfo(event)
        setIsMouseOver(mouseOver => !mouseOver)
        setShow(prevState => !prevState)
    }

    const filterIngredientList = (event) => {
        const value = event.target.value;
        const filtered = ingredients.filter( ingredient => {
            return ingredient.nombre.toLowerCase().includes(value.toLowerCase())
        })
        setFilteredIngredients(filtered)
    }

    const render = 
    <div className="ring-4 ring-inv-blue w-6/12 max-h-[180px] min-h-fit absolute top-full right-[420px] py-2 bg-[#F4F4F4] rounded-xl z-30 overflow-auto scrollbar-hide" onMouseEnter={changeMouseOver} onMouseLeave={changeMouseOver}> 
        {filteredIngredients.map( ingredient => <button key={ingredient.id} id={id} className="w-full pl-8 text-left text-lg font-semibold hover:bg-gradient-to-r from-transparent to-[#000692CC] hover:scale-95 block rounded-lg" onClick={changeIngredientInput}>{ingredient.nombre}</button>)}    
    </div>

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around relative">
                <div className="teteo w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] z-10">
                    <input id={id} name='ingrediente' className=" w-11/12 text-2xl text-left font-normal mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="NOMBRE INGREDIENTE" onFocus={showIngredientList} onBlur={showIngredientList} onChange={filterIngredientList}/>
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input type='number' id={id} name='cantidad' className="w-10/12 text-2xl text-left pl-3 font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="CANTIDAD" onBlur={updateNewRecipeInfo}/>
                </div>
                {show ? render : null}
            </div>
        </>
    )
}

export function EditableRecipeItem(props) {
    const {id, nombre, ingredientes, cantidades, sucursal} = props;
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

    const updateRecipeInfo = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;
        const index = target.attributes[0].value;

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
    }

    const updateRecipeOnDB = () => {
        dispatch(updateRecipe(recipe));
    }

    return(
        <div className="flex w-12/12 place-content-around items-start">
            <details className="w-7/12">
                <summary className="w-inherit h-[80px] ml-10 mt-6 bg-[#F4F4F4] flex place-content-between rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-3xl text-left font-semibold my-auto ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" name='nombre' defaultValue={nombre} onChange={updateRecipeInfo}/>
                    <h1 className="text-xl text-right font-normal mx-auto place-self-center underline underline-offset-4 decoration-inv-blue cursor-pointer"> EXPANDIR </h1>
                </summary>
                <div>
                    {ingredientes.map( (ingrediente,index) => {
                        return <EditableRecipeIngredient key={index} index={index} nombre={ingrediente} cantidad={cantidades[index]} update={updateRecipeInfo}/>
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
    const {index, nombre, cantidad, update} = props;
    
    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex mt-2 place-content-around">
                <div className="w-6/12 h-[60px] bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input index={index} name='ingredientes' className=" w-10/12 text-2xl text-left font-normal mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={nombre} onChange={update}/>
                </div>
                <div className="w-2/12 h-[60px] z-10 bg-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input index={index} name='cantidades' className="w-9/12 text-2xl text-center font-normal mt-3 ml-3 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" defaultValue={cantidad} onChange={update}/>
                </div>
            </div>
        </>
    )
}