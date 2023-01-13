import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeRefAmount, selectRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice.js";
// import { RecipesHeader } from "../Item/Item";
import { RecipeList } from "../Item/ItemList";
import { decreaseIngredient, ingredientMessage, selectIngredients } from "../../slices/ingredientSlice";
import { DisplayMessage } from "../DisplayMessage/DisplayMessage";

export default function ReportSale(props) {
    const {title} = props;
    const sucursal = useSelector(selectSucursal);
    const registeredIngredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);
    const dispatch = useDispatch();

    const sendSalesInfo = () => {
        let ingredientsToDecrease = [];
        let quantitiesToDecrease = [];
        for (let i = 0; i < recipes.length; i++){
            if (recipes[i].refAmount) {
                const refAmount = recipes[i].refAmount;
                const cantidades = recipes[i].cantidades.map( cantidad => (cantidad * refAmount));
                const {ingredientes} = recipes[i];
                ingredientes.forEach( (ingrediente,index) => {
                    if (ingredientsToDecrease.includes(ingrediente)) {
                        quantitiesToDecrease[ingredientsToDecrease.indexOf(ingrediente)] = quantitiesToDecrease[ingredientsToDecrease.indexOf(ingrediente)] + cantidades[index]
                    } 
                    else {
                        ingredientsToDecrease.push(ingrediente);
                        quantitiesToDecrease.push(cantidades[index]);
                    }
                })
            }
        }
        const newQuantities = [...quantitiesToDecrease];
        registeredIngredients.forEach( ingredient => {
            if (ingredientsToDecrease.includes(ingredient.nombre)){
                newQuantities[ingredientsToDecrease.indexOf(ingredient.nombre)] = ingredient.cantidad - newQuantities[ingredientsToDecrease.indexOf(ingredient.nombre)]; 
            }
        })

        if (ingredientsToDecrease.length > 0) {
            dispatch(decreaseIngredient({
                sucursal,
                ingredientes: ingredientsToDecrease,
                cantidades: newQuantities
            }))
        }else{
            dispatch(ingredientMessage('There is no sales to report'))
        }
    }

    useEffect(() => {
        return function cleanup() {
            dispatch(removeRefAmount())
        }
    },[dispatch])

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                        {/* <RecipesHeader/> */}
                    <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent mt-10">
                        <RecipeList/>
                    </div>
                    <div className="h-fit w-fit bg-inv-blue rounded-2xl mx-auto mt-10">
                        <button className="mx-auto p-2 w-fit cursor-pointer text-2xl text-white font-semibold" onClick={sendSalesInfo} >REPORTAR VENTAS</button>
                    </div>
                </div>
            </div>
            <DisplayMessage type={'ingredient'}/>
        </>
    );
}