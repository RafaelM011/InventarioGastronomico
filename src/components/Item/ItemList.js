import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../slices/ingredientSlice";
import PlusIcon from "../../assets/Plus.png";
import Item, { EmptyItem, RecipeIngredient, RecipeItem } from "./Item";
import { selectRecipes } from "../../slices/recipeSlice";

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

export function EmptyItemList(props){
    const {renderAmount, addItem} = props;
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

    const renderRecipeItems = () => {
        for (let i = 1; i <= renderAmount; i++) {
             render.push(<EmptyItem key={i} id={i} addFunction={addNewIngredient}/>)
             newIngredients.push({
                id: i,
                nombre: '',
                precio: null,
                cantidad: null,
                unidad: ''
             })
        }
    }
    renderRecipeItems();

    return(
        <>
            {render}
            <div key='1' className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto mt-10">
                <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addItem}/>
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
    const newRecipe = {
        nombre: '',
        ingredientes: [],
        cantidades: []
    }

    const renderRecipeItems = () => {
        for (let i = 1; i <= amount; i++) {
             render.push(<RecipeIngredient key={i} id={i}/>)
        }
    }
    renderRecipeItems();

    const addIngredientToRecipe = () => {
        setAmount( prevState => prevState + 1);
    }

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-9/12 h-[65px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-3xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none" placeholder="Nombre Receta" type='text'/>
                </div>
                <div className="h-[60px] w-[60px] bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addIngredientToRecipe}/>
                </div>
            </div> 
            {render}
        </>
    )
}