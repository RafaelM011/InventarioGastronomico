import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice.js";
// import { RecipesHeader } from "../Item/Item";
import { RecipeList } from "../Item/ItemList";
import PlusIcon from "../../assets/Plus.png";
import { decreaseIngredient, selectIngredients } from "../../slices/ingredientSlice";
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

        dispatch(decreaseIngredient({
            sucursal,
            ingredientes: ingredientsToDecrease,
            cantidades: newQuantities
        }))
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                        {/* <RecipesHeader/> */}
                    <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent mt-10">
                        <RecipeList/>
                    </div>
                    <div className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto">
                        <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={sendSalesInfo}/>
                    </div>
                </div>
            </div>
            <DisplayMessage type={'ingredient'}/>
        </>
    );
}