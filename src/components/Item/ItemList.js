import React from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../slices/ingredientSlice";

import Item, { EmptyItem, EmptyRecipe, RecipeItem } from "./Item";
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
    const {renderAmount} = props;
    const render = []; 
    const newIngredients = [];

    const addNewIngredientToState = (event) => {
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
             render.push(<EmptyItem key={i} id={i} addFunction={addNewIngredientToState}/>)
             newIngredients.push({
                id: i,
                nombre: '',
                precio: null,
                cantidad: null,
                unidad: ''
             })
        }
    }
    renderEmptyItems();

    return(
        <>
            {render}
            <div className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto mt-10">
                <button type="submit"> HERE </button>
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

export function EmptyRecipeList(props){
    const {renderAmount} = props;
    const render = [];    
    const renderEmptyRecipe = () => {
        for (let i = 1; i <= renderAmount; i++) {
             render.push(<EmptyRecipe key={i}/>)
        }
    }
    renderEmptyRecipe();
    return(
        <>
            {render}
        </>
    )
}