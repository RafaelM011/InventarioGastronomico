import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ingredientMessage, selectIngredientMessage } from '../../slices/ingredientSlice';
import { dishMessage, selectDishMessage} from '../../slices/platosSlice';
import { recipeMessage, selectRecipeMessage } from '../../slices/recipeSlice';
import { selectSucursalesMessage, sucursalesMessage } from '../../slices/sucursalesSlice';

export const DisplayMessage = (props) => {
    const {type} = props;
    const dispatch = useDispatch();
    const ingredientsMessage = useSelector(selectIngredientMessage);
    const recipesMessage = useSelector(selectRecipeMessage);
    const sucursalMessage = useSelector(selectSucursalesMessage);
    const dishesMessage = useSelector(selectDishMessage)
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
        case 'dish':
            message = dishesMessage;
            break;
        default:
    }

    useEffect(()=> {
        if(message !== ""){
            switch (type){
                case 'ingredient':
                    setTimeout(() => {
                        dispatch(ingredientMessage(''))
                    },2000)
                    break;
                case 'recipe':
                    setTimeout(() => {
                        dispatch(recipeMessage(''))
                    },2000)
                    break;
                case 'sucursales':
                    setTimeout(() => {
                        dispatch(sucursalesMessage(''))
                    },2000)
                    break;
                case 'dish':
                    setTimeout(() => {
                        dispatch(dishMessage(''))
                    },2000)
                    break;
                default:
            }
        }
    },[message, dispatch, type])

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
            case 'dish':
                dispatch(dishMessage(''))
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