import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIngredients } from "../../slices/ingredientSlice";
import { selectRecipes } from "../../slices/recipeSlice";
// import { DisplayMessage } from "../DisplayMessage/DisplayMessage";

export const Calculator = (props) => {
    const {title} = props
    // const dispatch = useDispatch();
    // const ingredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);
    const [filteredRecipe, setFilteredRecipe] = useState(recipes);

    const filterRecipes = (event) => {
        const value = event.target.value;
        const filtered = recipes.filter( recipe => recipe.nombre.toLowerCase().includes(value.toLowerCase()))
        setFilteredRecipe(filtered)    
    }

    const calculateIngredients = () => {

    }

    const renderRecipes = 
    <div className="max-h-[500px] h-fit w-11/12 mx-auto py-4 overflow-auto scrollbar-hide">
        {filteredRecipe.map(recipe => {
            return(
                <div key={recipe.id} className="flex place-content-between mx-20 my-4">
                    <p className="w-8/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{recipe.nombre}</p>
                    <input className="w-2/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center" type='number' placeholder="cantidades"/>
                </div>
            )
        })}
    </div>

    //totales y desglose
    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    <input className="ml-32 my-3 bg-inherit outline-none text-xl font-medium border-b-2 border-r-2 border-inv-blue rounded-br-xl" type='text' placeholder="Search Recipe..." onChange={filterRecipes}/>
                    <div className="h-[500px] bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                        {renderRecipes}
                    </div>
                    <div className="h-fit w-fit bg-inv-blue rounded-2xl mx-auto mt-2">
                        <button className="mx-auto w-fit p-2 cursor-pointer text-2xl text-white font-semibold" onClick={calculateIngredients}> CALCULAR </button>
                    </div>
                </div>
            </div>
            {/* <DisplayMessage type={'ingredient'}/> */}
        </>
    )
}