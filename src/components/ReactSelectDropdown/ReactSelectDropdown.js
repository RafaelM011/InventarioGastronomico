import React from "react";
import { useSelector } from "react-redux";
import Select from 'react-select'
import { selectIngredients } from "../../slices/ingredientSlice";
import { selectRecipes } from "../../slices/recipeSlice";

export const UnitSelectDropdown = (props) => {
    const { update, bgColor, color, defaultValue, metadata, isDisabled} = props;
    const style = {
        indicatorsContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '0px 24px 50px 0px'           
        }),
        valueContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '50px 0px 0px 24px'
        }),
        control: (base) => ({
            ...base,
            'background': bgColor,
            'borderColor': bgColor,
            'borderRadius': '50px 24px 50px 24px',
            'height': '60px',
        }),
        option: (base, state) => ({
            ...base,
            'background': state.isDisabled ? '#ddd': '#fff',
            'backgroundImage': state.isDisabled ? '#ddd' : state.isFocused ? "linear-gradient(to right,#0067D1,#0067D1)" : '#fff',
            'color': state.isDisabled ? '#000' : state.isFocused ? "#fff" : "#000",
        }),
        menu: (base) => ({
            ...base,
            'borderRadius': "10px",
        }),
        menuList: (base) => ({
            ...base, 
            'border': '3px',
            'borderStyle': 'solid',
            'borderColor': '#0067D1',
            'background': '#fff',
            'borderRadius': '10px',
            "::-webkit-scrollbar": {
                'display': 'none'
            },
            'msOverflowStyle': 'none',
            'scrollbarWidth': 'none'
        }),
        singleValue: (base) => ({
            ...base,
            'color':  color,
            'fontWeight': '400',
            'padding': '0px 0px 0px 10px',
            'fontSize': '24px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '24px'
        })
    }
    const options = [
        {label: 'Lb', value: 'Lb', isDisabled},
        {label: 'Oz', value: 'Oz', isDisabled},
        {label: 'Und', value: 'Und', isDisabled},
        {label: 'Kl', value: 'Kl', isDisabled},
        {label: 'Lt', value: 'Lt', isDisabled},
        {label: 'Ml', value: 'Ml', isDisabled},
        {label: 'Gr', value: 'Gr', isDisabled},
        {label: 'Gl (128Onz)', value: 'Gl (128Onz)', isDisabled}
    ]
    return(
        <>
            <Select defaultValue={defaultValue} styles={style} options={options} onChange={(e) => update({e, metadata})}/>
        </>
    )
}

export const IngredientSelectDropdown = (props) => {
    const {update, bgColor, color, defaultValue, metadata} = props;
    const ingredients = useSelector(selectIngredients)
    const style = {
        indicatorsContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '0px 24px 50px 0px'           
        }),
        valueContainer: (base) => ({
            ...base,
            'background':bgColor,
            'borderRadius': '50px 0px 0px 24px'
        }),
        control: (base) => ({
            ...base,
            'background': bgColor,
            'borderColor': bgColor,
            'borderRadius': '50px 24px 50px 24px',
            'height': '60px',
        }),
        option: (base, state) => ({
            ...base,
            'background': '#fff',
            'backgroundImage': state.isFocused ? "linear-gradient(to right,#0067D1,#0067D1)" : '#fff',
            'color': state.isFocused ? "#fff" : "#000",
        }),
        menu: (base) => ({
            ...base,
            'borderRadius': "10px"
        }),
        menuList: (base) => ({
            ...base, 
            'border': '3px',
            'borderStyle': 'solid',
            'borderColor': '#0067D1',
            'background': '#fff',
            'borderRadius': '10px',
            "::-webkit-scrollbar": {
                'display': 'none'
            },
            'msOverflowStyle': 'none',
            'scrollbarWidth': 'none'
        }),
        singleValue: (base) => ({
            ...base,
            'color': color,
            'fontWeight': '400',
            'padding': '0px 0px 0px 10px',
            'fontSize': '24px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '24px'
        })
    }
    const options = ingredients.map(ingredient => ({label: ingredient.nombre, value:ingredient.nombre}))
    
    return(
        <>
            <Select defaultValue={defaultValue} styles={style} options={options} onChange={(e) => update({e, metadata})}/>
        </>
    )
}

export const RecipeAndIngredientDropdown = (props) => {
    const { update, bgColor, color, defaultValue, metadata} = props;
    const style = {
        indicatorsContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '0px 24px 50px 0px'           
        }),
        valueContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '50px 0px 0px 24px'
        }),
        control: (base) => ({
            ...base,
            'background': bgColor,
            'borderColor': bgColor,
            'borderRadius': '50px 24px 50px 24px',
            'height': '60px',
        }),
        option: (base, state) => ({
            ...base,
            'background': '#fff',
            'backgroundImage': state.isFocused ? "linear-gradient(to right,#0067D1,#0067D1)" : '#fff',
            'color': state.isFocused ? "#fff" : "#000",
        }),
        menu: (base) => ({
            ...base,
            'borderRadius': "10px",
        }),
        menuList: (base) => ({
            ...base, 
            'border': '3px',
            'borderStyle': 'solid',
            'borderColor': '#0067D1',
            'background': '#fff',
            'borderRadius': '10px',
            "::-webkit-scrollbar": {
                'display': 'none'
            },
            'msOverflowStyle': 'none',
            'scrollbarWidth': 'none'
        }),
        singleValue: (base) => ({
            ...base,
            'color':  color,
            'fontWeight': '400',
            'padding': '0px 0px 0px 10px',
            'fontSize': '24px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '24px'
        }),
        groupHeading: (base) => ({
            ...base,
            'color': '#0067D1'
        })
    }
    const ingredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);
    const ingredientsOption = ingredients.map(ingredient => ({ label: ingredient.nombre, value: ingredient.nombre, type: 'ingrediente'}))
    const recipesOption = recipes.map(recipe => ({ label: recipe.nombre, value: recipe.nombre, type: 'receta'}))
    const groupedOptions = [
        {
            label: "Ingredientes",
            options: ingredientsOption
        },
        {
            label: "Recetas",
            options: recipesOption
        }
    ]

    return(
        <>
            <Select defaultValue={defaultValue} options={groupedOptions} styles={style} onChange={(e) => update({e, metadata})}/>
        </>
    )
}