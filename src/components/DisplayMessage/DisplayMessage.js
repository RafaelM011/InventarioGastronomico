import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ingredientMessage, selectIngredientMessage } from '../../slices/ingredientSlice';

export const DisplayMessage = () => {
    const message = useSelector(selectIngredientMessage);
    const dispatch = useDispatch();

    const closeMessage = () => {
        dispatch(ingredientMessage(''))
    }

    if (message){
        return(
            <div className='absolute left-[40vw] bottom-10 opacity-90 bg-green-300 w-fit h-fit p-4 rounded-2xl text-2xl font-semibold animate-display cursor-pointer' onClick={closeMessage}>
                {message}            
            </div>
        )    
    }
}