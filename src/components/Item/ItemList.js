import React from "react";
import { useSelector } from "react-redux";
import { selectIngredients } from "../../slices/ingredientSlice";

import Item from "./Item";

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