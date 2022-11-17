import React from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../slices/ingredientSlice";

import Item, { EmptyItem, RecipeItem } from "./Item";
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
    const renderEmptyItems = () => {
        for (let i = 1; i <= renderAmount; i++) {
             render.push(<EmptyItem key={i}/>)
        }
    }
    renderEmptyItems();

    return(
        <>
            {render}
        </>
    )
}

export function RecipeList(props) {
    const recipes = useSelector(selectRecipes);

    return (
        <>
            {recipes.map(recipe => {
                return <RecipeItem key={recipe.id} name={recipe.nombre}/>
            })}
        </>
    )
}