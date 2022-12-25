import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ingredientMessage, selectIngredientMessage } from '../../slices/ingredientSlice';
import { recipeMessage, selectRecipeMessage } from '../../slices/recipeSlice';
import { selectSucursalesMessage, sucursalesMessage } from '../../slices/sucursalesSlice';

export const DisplayMessage = (props) => {
    const {type} = props;
    const dispatch = useDispatch();
    const ingredientsMessage = useSelector(selectIngredientMessage);
    const recipesMessage = useSelector(selectRecipeMessage);
    const sucursalMessage = useSelector(selectSucursalesMessage);
    let message;

    switch (type){
        case 'ingredient':
            message = ingredientsMessage;
            break;
        case 'recipe':
            message = recipesMessage;
            break;
        case 'sucursales':
            message = sucursalMessage;
            break;
        default:
    }

    const closeMessage = () => {
        switch (type){
            case 'ingredient':
                dispatch(ingredientMessage(''))
                break;
            case 'recipe':
                dispatch(recipeMessage(''))
                break;
            case 'sucursales':
                dispatch(sucursalesMessage(''))
                break;
            default:
        }
    }

    if (message){
        return(
            <div className='absolute left-[40vw] bottom-10 opacity-90 bg-green-300 w-fit h-fit p-4 rounded-2xl text-2xl font-semibold animate-display cursor-pointer' onClick={closeMessage}>
                {message}            
            </div>
        )    
    }
}