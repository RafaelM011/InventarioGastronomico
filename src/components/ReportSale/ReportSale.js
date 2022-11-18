import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes, selectRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice.js";
import { RecipesHeader } from "../Item/Item";
import { RecipeList } from "../Item/ItemList";
import PlusIcon from "../../assets/Plus.png";

export default function ReportSale(props) {
    const {title} = props;
    const sucursal = useSelector(selectSucursal);
    const recipes = useSelector(selectRecipes);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRecipes(sucursal));
    }, [dispatch, sucursal])

    const sendSalesInfo = () => {
        for (let i = 0; i < recipes.length; i++){
            // DEFINE TOTAL INGREDIENT QUANTITY BASED ON REFAMOUNT AND USED QUANTITY PER INGREDIENT
            if (recipes[i].refAmount) {
                                
            }
        }
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                        <RecipesHeader/>
                    <div className=" h-[460px] overflow-auto scrollbar-hide">
                        <RecipeList/>
                    </div>
                    <div className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto">
                        <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={sendSalesInfo}/>
                    </div>
                </div>
            </div>
        </>
    );
}