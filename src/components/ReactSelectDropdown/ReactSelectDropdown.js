import React from "react";
import { useSelector } from "react-redux";
import Select from 'react-select'
import { selectIngredients } from "../../slices/ingredientSlice";
import { selectRecipes } from "../../slices/recipeSlice";
import {conversion} from "../../unit_conversion/unit_conversion";

export const UnitSelectDropdown = (props) => {
    const { update, bgColor, color, defaultValue, metadata, selected, verify} = props;
    const type = conversion[selected?.unidad]?.Tipo;
    const style = {
        indicatorsContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '0px 24px 50px 0px'           
        }),
        valueContainer: (base) => ({
            ...base,
            'background': bgColor,
            'borderRadius': '50px 0px 0px 24px',
        }),
        control: (base) => ({
            ...base,
            'background': bgColor,
            'borderColor': bgColor,
            'borderRadius': '50px 24px 50px 24px',
            'height': 'fit',
            'paddingBottom': '8px'
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
            'fontSize': '20px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '20px',
            'paddingLeft': '10px'
        })
    }
    const options = [
        {label: 'Und', value: 'Und', isDisabled: verify === true ? type === 'Und' ? false : true : false},
        {label: 'Gr', value: 'Gr', isDisabled: verify === true ? type === 'Peso' ? false : true : false},
        {label: 'Lb', value: 'Lb', isDisabled: verify === true ? type === 'Peso' ? false : true : false},
        {label: 'Oz', value: 'Oz', isDisabled: verify === true ? type === 'Peso' ? false : true : false},
        {label: 'Kl', value: 'Kl', isDisabled: verify === true ? type === 'Volumen' ? false : true : false},
        {label: 'Lt', value: 'Lt', isDisabled: verify === true ? type === 'Volumen' ? false : true : false},
        {label: 'Ml', value: 'Ml', isDisabled: verify === true ? type === 'Volumen' ? false : true : false},
        {label: 'Gl (128Onz)', value: 'Gl (128Onz)', isDisabled: verify === true ? type === 'Volumen' ? false : true : false}
    ]
    return(
        <>
            <Select defaultValue={{label:defaultValue, value:defaultValue}} styles={style} options={options} onChange={(e) => update({e, metadata})}/>
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
            'height': 'fit',
            'paddingBottom': '8px'
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
            'fontSize': '20px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '20px',
            'paddingLeft': '10px'
        })
    }
    const options = ingredients.map(ingredient => ({label: ingredient.nombre, value:ingredient.nombre, unidad: ingredient.unidad}))
    
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
            'height': 'fit',
            'paddingBottom':'8px'
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
            'fontSize': '20px'
        }),
        input: (base) => ({
            ...base,
            'padding': '0px 0px 0px 10px',
        }),
        placeholder: (base) => ({
            ...base,
            'fontWeight': '500',
            'fontSize': '20px',
            'paddingLeft': '10px'
        }),
        groupHeading: (base) => ({
            ...base,
            'color': '#0067D1'
        })
    }
    const ingredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);
    const ingredientsOption = ingredients.map(ingredient => ({ label: ingredient.nombre, value: ingredient.nombre, type: 'ingrediente', unidad: ingredient.unidad}))
    const recipesOption = recipes.map(recipe => ({ label: recipe.nombre, value: recipe.nombre, type: 'receta', unidad: recipe.unidad}))
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
            <Select defaultValue={{label: defaultValue, value: defaultValue}} options={groupedOptions} styles={style} onChange={(e) => update({e, metadata})}/>
        </>
    )
}