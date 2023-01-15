import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, selectIngredients, selectNewIngredients, updateIngredients, ingredientMessage, cleanNewItem } from "../../slices/ingredientSlice";
import PlusIcon from "../../assets/Plus.png";
import Item, { EditableItem, EditableRecipeItem, EmptyItem, RecipeAndIngredientItem, RecipeIngredient, RecipeItem } from "./Item";
import { addRecipe, selectNewRecipe, selectRecipes, recipeMessage, cleanNewRecipe } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { DisplayMessage } from "../DisplayMessage/DisplayMessage";
import { AddDish } from "../../slices/platosSlice";

export default function ItemList() {
    const ingredients = useSelector(selectIngredients);
   
    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {ingredients.map(ingredient => {
                    return <Item key={ingredient.id} id={ingredient.id} name={ingredient.nombre} quantity={ingredient.cantidad} price={ingredient.precio} unit={ingredient.unidad} />
                })}
            </div>
        </>
    )
}

export function EditableItemList() {
    const ingredients = useSelector(selectIngredients);
    const sucursal = useSelector(selectSucursal);
    const dispatch = useDispatch();
    let updatedIngredients = []

    const updateIngredientEntry = (info) => {
        updatedIngredients[info.index].nombre = info.name;
        updatedIngredients[info.index].precio = info.price;
        updatedIngredients[info.index].cantidad = info.quantity;
        updatedIngredients[info.index].unidad = info.unit;
    }

    const validateUpdate = () => {
        return updatedIngredients.some( updatedIngredient => updatedIngredient.nombre === '' || updatedIngredient.precio === '' || updatedIngredient.cantidad === '' || updatedIngredient.unidad === '')
    }

    const sendUpdatedEntries = () => {
        const isEmpty = validateUpdate();
        if (isEmpty) return dispatch(ingredientMessage('Missing fields'))
        dispatch(updateIngredients({ingredients: updatedIngredients, sucursal}));
    }

    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {ingredients.map((ingredient,index) => {
                    updatedIngredients.push({
                        id: ingredient.id,
                        nombre: ingredient.nombre,
                        cantidad: ingredient.cantidad,
                        precio: ingredient.precio,
                        unidad: ingredient.unidad
                    })
                    return <EditableItem key={ingredient.id} index={index} id={ingredient.id} name={ingredient.nombre} quantity={ingredient.cantidad} price={ingredient.precio} unit={ingredient.unidad} updateFunction={updateIngredientEntry}/>
                })}
            </div>
            <div className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-4 cursor-pointer">
                <button onClick={sendUpdatedEntries}> ACTUALIZAR INGREDIENTES </button>
            </div>
            <DisplayMessage type={'ingredient'}/>
        </>
    )
}

export function EmptyItemList(props){
    const {renderAmount, addItem } = props;
    const render = [];
    const dispatch = useDispatch();
    const ingredients = useSelector(selectIngredients);
    const newIngredients = useSelector(selectNewIngredients);

    useEffect(() => {
        return function cleanup(){
            dispatch(cleanNewItem())
        }
    },[dispatch])

    const renderEmptyItems = () => {
        for (let i = 0; i < renderAmount; i++) {
             render.push(<EmptyItem key={i} id={i} render={renderAmount}/>)
        }
    }
    renderEmptyItems();

    const sendIngredientInfo = () => {
        let state = true;    
        newIngredients.forEach(newIngredient => {
            if (!newIngredient.nombre || !newIngredient.precio || !newIngredient.cantidad || !newIngredient.unidad) {
                dispatch(ingredientMessage('Missing Information'));                
                state = false
            }else{
                ingredients.forEach(ingredient => {
                    if (ingredient.nombre === newIngredient.nombre) {
                        dispatch(ingredientMessage('This ingredient already exist'))
                        state = false;
                    }
                })
            }
        })
        
        if (state) {
            const ingredientInfo = {
                ingredientes: newIngredients
            }
            dispatch(addIngredient(ingredientInfo));    
        }
    }

    return(
        <>
            <div className=" h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <div className="flex place-content-between">
                <div key='2' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={sendIngredientInfo}> AGREGAR INGREDIENTE/S AL INVENTARIO </div>
                <div key='1' className="h-[60px] w-[60px] bg-inv-blue rounded-full mx-auto mt-7">
                    <img className="mx-auto pt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addItem}/>
                </div>
            </div>
            <DisplayMessage type={'ingredient'}/>
        </>
    )
}

export function RecipeList(props) {
    const recipes = useSelector(selectRecipes);
    return (
        <>
            {recipes.map(recipe => {
                return <RecipeItem key={recipe.id} id={recipe.id} name={recipe.nombre}/>
            })}
        </>
    )
}

export function EmptyRecipeList(){
    const [amount, setAmount] = useState(1);
    const render = [];
    const recipeName = useRef();
    const dispatch = useDispatch();
    const sucursal = useSelector(selectSucursal);
    const recipes = useSelector(selectRecipes);
    const ingredients = useSelector(selectIngredients);
    const newRecipe = useSelector(selectNewRecipe);

    useEffect(() => {
        return function cleanup(){
            dispatch(cleanNewRecipe())
        }
    },[dispatch])

    const addIngredientToRecipe = () => {
        setAmount( prevState => prevState + 1);
    }

    const renderRecipeItems = () => {
        for (let i = 0; i < amount; i++) {
             render.push(<RecipeIngredient key={i} id={i} amount={amount}/>)
        }
    }
    renderRecipeItems();

    const validateIngredient = () => {
        return newRecipe.ingredientes.some(ingredientName => ingredients.some( ingredient => ingredient.nombre === ingredientName))
    }

    const validateCantidades = () => {
        return newRecipe.cantidades.some(cantidad => cantidad === '')
    }

    const validateRecipeName = (newRecipeName) => {
        return recipes.some( recipe => recipe.nombre === newRecipeName)
    }

    const sendRecipeInfo = () => {
        const ingredientExist = validateIngredient();
        const emptyQty = validateCantidades()
        const recipeExist = validateRecipeName(recipeName.current.value)

        if (emptyQty) return dispatch(recipeMessage('Must fill out all quantities field'))
        if (!ingredientExist) return dispatch(recipeMessage('One or more of the ingredients does not exist'))
        if (!recipeName.current.value) return dispatch(recipeMessage('Missing recipe name'))
        if (recipeExist) return dispatch(recipeMessage('This recipe name is already being used'))

        const newRecipeInfo = {
            sucursal,
            nombre: recipeName.current.value,
            ingredientes: newRecipe.ingredientes,
            cantidades: newRecipe.cantidades,
            unidades: newRecipe.unidades
        }
        dispatch(addRecipe(newRecipeInfo))
    }

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-9/12 h-[65px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-3xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre Receta" type='text' ref={recipeName}/>
                </div>
                <div className="h-[60px] w-[60px] bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addIngredientToRecipe}/>
                </div>
            </div> 
            <div className=" h-[380px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <div key='1' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={sendRecipeInfo}> AGREGAR RECETA </div>
            <DisplayMessage type={'recipe'}/>
        </>
    )
}

export function EditableRecipeList() {
    const recipes = useSelector(selectRecipes);

    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {recipes.map( recipe => {
                    const {id, sucursal, nombre, ingredientes, cantidades, unidades} = recipe;
                    return <EditableRecipeItem key={id} id={id} nombre={nombre} sucursal={sucursal} ingredientes={ingredientes} cantidades={cantidades} unidades={unidades}/>
                })}
            </div>
            <DisplayMessage type={'recipe'}/>
        </>
    )
}

export function AddPlateScreen(){
    const sucursal = useSelector(selectSucursal);
    const dispatch = useDispatch();
    const nameRef = useRef()
    const [renderAmount, setRenderAmount] = useState(1)
    const [ingredients, setIngredients] = useState(new Map());
    const [recipes, setRecipes] = useState(new Map());
    const render = [];

    // useEffect(() => {
    //     console.log('ingredientes\n', ingredients, '\nrecetas\n', recipes)
    // },[ingredients, recipes])

    const updatePlateInfo = (event) => {
        const target = event?.target;
        const name = target?.name ?? event.metadata.name;
        const value = target?.value ?? event.e.value;
        const type = event?.e?.type ?? null;
        const id = event?.target?.id ?? event?.metadata?.id;
        
        if(type === 'ingrediente'){
            if(recipes.has(id)) {
                const valuePair = recipes.get(id);
                setIngredients(prevState => {
                    let newMap = new Map(prevState.set(id, {...valuePair, nombre: value}));
                    return newMap;
                })
                recipes.delete(id)
            }else{
                setIngredients(prevState => {
                    let newMap = new Map(prevState.set(id,{nombre: value, cantidad: null, unidad: null}));
                    return newMap;
                })    
            }
        }else if (type === 'receta'){
            if(ingredients.has(id)) {
                const valuePair = ingredients.get(id);
                setRecipes(prevState => {
                    let newMap = new Map(prevState.set(id, {...valuePair, nombre: value}));
                    return newMap;
                })
                ingredients.delete(id)
            }else{
                setRecipes(prevState => {
                    let newMap = new Map(prevState.set(id,{nombre: value, cantidad: null, unidad: null}));
                    return newMap;
                })    
            }
        }
        
        switch(name){
            case 'cantidad':
                if(ingredients.has(parseInt(id))) {
                    setIngredients(prevState => {
                        const valuePair = ingredients.get(parseInt(id))
                        const newMap = new Map(prevState.set(parseInt(id),{...valuePair, cantidad: value}))
                        return newMap;
                    })
                }else if(recipes.has(parseInt(id))) {
                    setRecipes(prevState => {
                        const valuePair = recipes.get(parseInt(id))
                        const newMap = new Map(prevState.set(parseInt(id),{...valuePair, cantidad: value}))
                        return newMap;
                    })
                }
                break;
            case 'unidad':
                if(ingredients.has(parseInt(id))) {
                    setIngredients(prevState => {
                        const valuePair = ingredients.get(parseInt(id))
                        const newMap = new Map(prevState.set(parseInt(id),{...valuePair, unidad: value}))
                        return newMap;
                    })
                }else if(recipes.has(parseInt(id))) {
                    setRecipes(prevState => {
                        const valuePair = recipes.get(parseInt(id))
                        const newMap = new Map(prevState.set(parseInt(id),{...valuePair, unidad: value}))
                        return newMap;
                    })
                }
                break;
            default:
        }
    }

    const addNewPlate = () => {
        const newPlate = {
            usuario: sessionStorage.getItem('username'),      
            nombre: nameRef.current.value,
            sucursal,
            ingredientes: [...ingredients.values()],
            recetas: [...recipes.values()]
        }   
        dispatch(AddDish(newPlate));
    }

    for(let i = 0;i < renderAmount; i++){render.push(<RecipeAndIngredientItem key={i} id={i} update={updatePlateInfo}/>)}

    return(
        <>
            <div className="w-10/12 h-[80px] mx-auto flex place-content-between mt-6">
                <div className="w-9/12 h-[65px] pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-3xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre Plato" type='text' name='nombre' ref={nameRef}/>
                </div>
                <div className="h-[60px] w-[60px] bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[10px] w-[40px] cursor-pointer" src={PlusIcon} alt='add icon' onClick={() => setRenderAmount(prevState => prevState+1)}/>
                </div>
            </div> 
            <div className=" h-[380px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <h1 key='1' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={addNewPlate}> AGREGAR PLATO </h1>
        </>
    )
}