import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, selectIngredients, updateIngredients } from "../../slices/ingredientSlice";
import PlusIcon from "../../assets/Plus.png";
import Item, { EditableItem, EditableRecipeItem, EmptyItem, RecipeIngredient, RecipeItem } from "./Item";
import { addRecipe, selectRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";

export default function ItemList() {
    const ingredients = useSelector(selectIngredients);
    return(
        <>
            {ingredients.map(ingredient => {
                return <Item key={ingredient.id} id={ingredient.id} name={ingredient.nombre} quantity={ingredient.cantidad} price={ingredient.precio} unit={ingredient.unidad} />
            })}
        </>
    )
}

export function EditableItemList() {
    const ingredients = useSelector(selectIngredients);
    const dispatch = useDispatch();
    let updatedIngredients = []

    const updateIngredientEntry = (info) => {
        updatedIngredients[info.index].nombre = info.name;
        updatedIngredients[info.index].precio = info.price;
        updatedIngredients[info.index].cantidad = info.quantity;
        updatedIngredients[info.index].unidad = info.unit;
    }

    const sendUpdatedEntries = () => {
        dispatch(updateIngredients(updatedIngredients));
    }

    return(
        <>
            <div className=" h-[450px] overflow-auto scrollbar-hide">
                {ingredients.map((ingredient,index) => {
                    updatedIngredients.push({
                        id: ingredient.id,
                        nombre: ingredient.nombre,
                        cantidad: ingredient.cantidad,
                        precio: ingredient.precio,
                        unidad: ingredient.unidad
                    })
                    return <EditableItem key={ingredient.id} index={index} id={ingredient.id} name={ingredient.nombre} quantity={ingredient.cantidad} price={ingredient.precio} unit={ingredient.unidad} updateFunction={updateIngredientEntry}/>
                })}
            </div>
            <div className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-4 cursor-pointer">
                <button onClick={sendUpdatedEntries}> ACTUALIZAR INGREDIENTES </button>
            </div>
        </>
    )
}

export function EmptyItemList(props){
    const {renderAmount, addItem} = props;
    const dispatch = useDispatch();
    const sucursal = useSelector(selectSucursal);
    const render = []; 
    const newIngredients = [];

    const addNewIngredient = (event) => {
        const target = event.target;
        const id = target.id;
        const name = target.name;
        const value = target.value;

        switch (name) {
            case 'nombre':
                newIngredients[id-1].nombre = value;
            break;
            case 'precio':
                newIngredients[id-1].precio = value;
                break;
            case 'cantidad':
                newIngredients[id-1].cantidad = value;
                break;
            case 'unidad':
                newIngredients[id-1].unidad = value;
                break;
            default:
        }
    }

    const renderEmptyItems = () => {
        for (let i = 1; i <= renderAmount; i++) {
             render.push(<EmptyItem key={i} id={i} addFunction={addNewIngredient}/>)
             newIngredients.push({
                id: i,
                sucursal,
                nombre: '',
                precio: null,
                cantidad: null,
                unidad: ''
             })
        }
    }
    renderEmptyItems();

    const sendIngredientInfo = () => {
        const ingredientInfo = {
            ingredientes: newIngredients
        }
        dispatch(addIngredient(ingredientInfo));
    }

    return(
        <>
            <div className=" h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <div className="flex place-content-between">
                <div key='2' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={sendIngredientInfo}> AGREGAR INGREDIENTE/S AL INVENTARIO </div>
                <div key='1' className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto mt-7">
                    <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addItem}/>
                </div>
            </div>
        </>
    )
}

export function RecipeList(props) {
    const recipes = useSelector(selectRecipes);
    return (
        <>
            {recipes.map(recipe => {
                return <RecipeItem key={recipe.id} id={recipe.id} name={recipe.nombre}/>
            })}
        </>
    )
}

export function EmptyRecipeList(){
    const [amount, setAmount] = useState(1);
    const render = [];
    const recipeName = useRef();
    const newRecipe = {
        nombre: '',
        ingredientes: [],
        cantidades: []
    }
    const dispatch = useDispatch();
    const sucursal = useSelector(selectSucursal);
    const ingredients = useSelector(selectIngredients)

    const addRecipeInfo = (event) => {
        const target = event.target;
        const id = target.id;
        const name = target.name;
        const value = target.value;
        
        name === "ingredientes" ?
        newRecipe.ingredientes[id-1] = value
        : newRecipe.cantidades[id-1] = value;
    }
    
    const renderRecipeItems = () => {
        for (let i = 1; i <= amount; i++) {
             render.push(<RecipeIngredient key={i} id={i} addRecipeInfo={addRecipeInfo}/>)
             newRecipe.ingredientes.push('')
             newRecipe.cantidades.push(null)
        }
    }
    renderRecipeItems();

    const addIngredientToRecipe = () => {
        setAmount( prevState => prevState + 1);
    }

    const checkRecipeIngredients = recipeInfo => {
        for (const ingredient of recipeInfo.ingredientes){
            let exist = false;
            for (const element of ingredients){
                if (element.nombre === ingredient) exist = true                
            }
            if (!exist)  {
                alert(`El ingrediente '${ingredient}' no esta registrado en la base de datos`)
                return false;
            }    
        }
        return true;
    }

    const sendRecipeInfo = () => {
        const recipeInfo = {
            sucursal,
            nombre: recipeName.current.value,
            ingredientes: newRecipe.ingredientes,
            cantidades: newRecipe.cantidades
        }
        let state = checkRecipeIngredients(recipeInfo);
        if (state) dispatch(addRecipe(recipeInfo)) 
    }

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-9/12 h-[65px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-3xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Nombre Receta" type='text' ref={recipeName}/>
                </div>
                <div className="h-[60px] w-[60px] bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addIngredientToRecipe}/>
                </div>
            </div> 
            <div className=" h-[380px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <div key='1' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={sendRecipeInfo}> AGREGAR RECETA </div>
        </>
    )
}

export function EditableRecipeList() {
    const recipes = useSelector(selectRecipes);

    return(
        <>
            <div className="h-[600px] overflow-auto scrollbar-hide">
                {recipes.map( recipe => {
                    const {id, sucursal, nombre, ingredientes, cantidades} = recipe;
                    return <EditableRecipeItem key={id} id={id} nombre={nombre} sucursal={sucursal} ingredientes={ingredientes} cantidades={cantidades} />
                })}
            </div>
        </>
    )
}