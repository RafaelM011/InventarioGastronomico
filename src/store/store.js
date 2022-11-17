import { configureStore } from '@reduxjs/toolkit';

import userReducer from "../slices/userSlice.js";
import sucursalesReducer from "../slices/sucursalesSlice.js";
import ingredientsReducer from "../slices/ingredientSlice.js";
import recipesReducer from "../slices/recipeSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    sucursales: sucursalesReducer,
    ingredients: ingredientsReducer,
    recipes: recipesReducer
  },
});
