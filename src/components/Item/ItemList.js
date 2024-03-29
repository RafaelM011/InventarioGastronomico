import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient, selectIngredients, selectNewIngredients, updateIngredients, ingredientMessage, cleanNewItem, decreaseIngredient } from "../../slices/ingredientSlice";
import PlusIcon from "../../assets/Plus.png";
import Item, { EditableItem, EditablePlateItem, EditableRecipeItem, EmptyItem, PlateItem, RecipeAndIngredientItem, RecipeIngredient, RecipeItem } from "./Item";
import { selectRecipes, recipeMessage, addRecipe, decreaseRecipe, updateRecipes } from "../../slices/recipeSlice";
import { selectSucursal } from "../../slices/sucursalesSlice";
import { DisplayMessage } from "../DisplayMessage/DisplayMessage";
import { AddDish, selectDishes, UpdateDishes } from "../../slices/platosSlice";
import { UnitSelectDropdown } from "../ReactSelectDropdown/ReactSelectDropdown";

// INGREDIENTS

export default function ItemList() {
    const ingredients = useSelector(selectIngredients);
   
    return(
        <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
            {ingredients.map(ingredient => {
                return <Item key={ingredient.id} id={ingredient.id} name={ingredient.nombre} quantity={ingredient.cantidad} price={ingredient.precio} unit={ingredient.unidad} />
            })}
        </div>
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

// RECIPES

export function RecipeList() {
    const recipes = useSelector(selectRecipes);
    return (
        <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent mt-10">
            {recipes.map(recipe => {
                    return <RecipeItem key={recipe.id} id={recipe.id} name={recipe.nombre} quantity={recipe.cantidad} unit={recipe.unidad}/>
            })}
        </div>
    )
}

export function EmptyRecipeList(){
    const [amount, setAmount] = useState(1);
    const [recipeInfo, setRecipeInfo] = useState({
        unidad: '',
        ingredientes: []
    });
    const render = [];
    const nameRef = useRef();
    const quantityRef = useRef();
    const dispatch = useDispatch();
    const usuario = sessionStorage.getItem('username');
    const sucursal = useSelector(selectSucursal);
    const recipes = useSelector(selectRecipes);

    for (let i = 0; i < amount; i++) {
        render.push(<RecipeIngredient key={i} id={i} update={updateRecipeInfo}/>)
    }

    const addIngredientToRecipe = () => {
        setAmount( prevState => prevState + 1);
    }

    const validateRecipeName = (newRecipeName) => {
        return recipes.some( recipe => recipe.nombre === newRecipeName)
    }

    function updateRecipeInfo(event) {
        const target = event?.target;
        const name = target?.name ?? event.metadata.name;
        const value = target?.value ?? event.e.value;
        const type = event?.metadata?.type ?? null;
        const id = target?.attributes[1]?.value ?? event?.metadata?.id ;

        if(type === 'receta') {
            setRecipeInfo(prevState => ({...prevState, unidad: value}))
        }else if (type === 'ingrediente'){
            if(recipeInfo.ingredientes[id]){
                setRecipeInfo(prevState => {
                    const newIngredientes = recipeInfo.ingredientes;
                    newIngredientes[id].unidad = value;
                    return {...prevState, ingredientes: newIngredientes}
                })
            }else{
                setRecipeInfo(prevState => {
                    const newIngredientes = recipeInfo.ingredientes;
                    newIngredientes[id] = {nombre: '', cantidad: '', unidad: value}
                    return {...prevState, ingredientes: newIngredientes}
                }) 
            }
        }

        switch(name){
            case 'ingrediente':
                if(recipeInfo.ingredientes[id]){
                    setRecipeInfo(prevState => {
                        const newIngredientes = recipeInfo.ingredientes;
                        newIngredientes[id].nombre = value;
                        return {...prevState, ingredientes: newIngredientes}
                    })
                }else{
                    setRecipeInfo(prevState => {
                        const newIngredientes = recipeInfo.ingredientes;
                        newIngredientes[id] = {nombre: value, cantidad: '', unidad: ''}
                        return {...prevState, ingredientes: newIngredientes}
                    }) 
                }
            break;
            case 'cantidad':
                if(recipeInfo.ingredientes[id]){
                    setRecipeInfo(prevState => {
                        const newIngredientes = recipeInfo.ingredientes;
                        newIngredientes[id].cantidad = value;
                        return {...prevState, ingredientes: newIngredientes}
                    })
                }else{
                    setRecipeInfo(prevState => {
                        const newIngredientes = recipeInfo.ingredientes;
                        newIngredientes[id] = {nombre: '', cantidad: value, unidad: ''}
                        return {...prevState, ingredientes: newIngredientes}
                    }) 
                }   
            break;
            default:
        }
    }

    const sendRecipeInfo = () => {
        const recipeExist = validateRecipeName(nameRef.current.value)

        if (!nameRef.current.value) return dispatch(recipeMessage('Missing recipe name'))
        if (recipeExist) return dispatch(recipeMessage('This recipe name is already being used'))

        const newRecipeInfo = {
            usuario,
            sucursal,
            nombre: nameRef.current.value,
            cantidad: quantityRef.current.value,
            unidad: recipeInfo.unidad,
            ingredientes: recipeInfo.ingredientes
        }

        dispatch(addRecipe(newRecipeInfo))
    }

    return(
        <>
            <div className="w-10/12 h-fit mx-auto flex place-content-between mt-6">
                <div className="w-6/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input ref={nameRef} className="text-xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre Receta" type='text'/>
                </div>
                <div className="w-2/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input ref={quantityRef} className="text-xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Cantidad" type='text'/>
                </div>
                <div className="w-2/12 h-fit bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] z-20">
                    <UnitSelectDropdown update={updateRecipeInfo} bgColor='#F4F4F4' verify={false} color='#000' metadata={{name: 'unidad', type:'receta'}}/>
                </div>
                <div className="bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[7px] w-[70%] cursor-pointer" src={PlusIcon} alt='add icon' onClick={addIngredientToRecipe}/>
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
    const sucursal = useSelector(selectSucursal);
    const dispatch = useDispatch();
    let updatedRecipes = []

    const updateRecipeEntry = (info) => {
        updatedRecipes[info.index].nombre = info.name;
        updatedRecipes[info.index].precio = info.price;
        updatedRecipes[info.index].cantidad = info.quantity;
        updatedRecipes[info.index].unidad = info.unit;
    }

    const validateUpdate = () => {
        return updatedRecipes.some( updatedRecipe => updatedRecipe.nombre === '' || updatedRecipe.cantidad === '' || updatedRecipe.unidad === '')
    }

    const sendUpdatedEntries = () => {
        const isEmpty = validateUpdate();
        if (isEmpty) return dispatch(recipeMessage('Missing fields'))
        dispatch(updateRecipes({recipes: updatedRecipes, sucursal}));
    }

    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {recipes.map( (recipe,index) => {
                    updatedRecipes.push({
                        id: recipe.id,
                        nombre: recipe.nombre,
                        cantidad: recipe.cantidad,
                        unidad: recipe.unidad
                    })
                    return <EditableRecipeItem key={recipe.id} name={recipe.nombre} quantity={recipe.cantidad} unit={recipe.unidad} index={index} updateFunction={updateRecipeEntry}/>
                })}
            </div>
            <div className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-4 cursor-pointer">
                <button onClick={sendUpdatedEntries}> ACTUALIZAR RECETAS </button>
            </div>
            <DisplayMessage type={'recipe'}/>
        </>
    )
}

// PLATES

export function PlateList(){
    const dishes = useSelector(selectDishes);

    return(
        <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
            {dishes.map(dish => {
                return <></>
            })}
        </div>
    )
}

export function PlateSaleReport(){
    const dispatch = useDispatch();
    const dishes = useSelector(selectDishes);
    const ingredients = useSelector(selectIngredients);
    const recipes = useSelector(selectRecipes);
    const sucursal = useSelector(selectSucursal);
    const usuario = sessionStorage.getItem('username')
    const [saleInfo, setSaleInfo] = useState(new Map());

    const updateSaleInfo = (data) => {
        const target = data.event.target;
        const value = target.value;
        const {nombre, ingredientes, recetas} = data.info;
    

        if(value === '') {
            if (saleInfo.has(nombre)){
                setSaleInfo(prevState => {
                    let newState = new Map(prevState)
                    newState.delete(nombre);
                    return newState;
                })    
            }
        }
        else{
            ingredientes.forEach((ingrediente,index) => {
                ingredientes[index].cantidad = parseInt(ingrediente.cantidad) * parseInt(value)
            })
            recetas.forEach((receta,index) => {
                recetas[index].cantidad = parseInt(receta.cantidad) * parseInt(value)
            })
            const info = {
                ingredientes,
                recetas
            }  
            setSaleInfo(prevState => {
                let newState = new Map(prevState.set(nombre, info));
                return newState;
            })
        }
    }

    const sendSaleInfo = () => {
        const values = [...saleInfo.values()];
        const ingredientes = new Map ();
        const recetas = new Map();

        values.forEach(value => {
            value.ingredientes.forEach(ingrediente => {
                if(!ingredientes.has(ingrediente.nombre)) ingredientes.set(ingrediente.nombre, ingrediente.cantidad)
                else ingredientes.set(ingrediente.nombre, ingrediente.cantidad + ingredientes.get(ingrediente.nombre))
            })
            value.recetas.forEach(receta => {
                if(!recetas.has(receta.nombre)) recetas.set(receta.nombre, receta.cantidad)
                else recetas.set(receta.nombre, receta.cantidad + recetas.get(receta.nombre))
            })
        })

        ingredients.forEach(ingredient => {
            if(ingredientes.has(ingredient.nombre)) ingredientes.set(ingredient.nombre, parseInt(ingredient.cantidad) - ingredientes.get(ingredient.nombre))
        })
        recipes.forEach(recipe => {
            if(recetas.has(recipe.nombre)) recetas.set(recipe.nombre, parseInt(recipe.cantidad) - recetas.get(recipe.nombre))
        })
    
        const ingredientInfo = {
            usuario,
            sucursal,
            ingredientes: [...ingredientes.keys()],
            cantidades: [...ingredientes.values()]
        }
        const recipeInfo = {
            usuario,
            sucursal,
            recetas: [...recetas.keys()],
            cantidades: [...recetas.values()]
        }
        dispatch(decreaseIngredient(ingredientInfo))
        dispatch(decreaseRecipe(recipeInfo))
    }

    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent mt-10">
                {dishes.map(dish => {
                    return <PlateItem key={dish.id} nombre={dish.nombre} update={updateSaleInfo} ingredientes={dish.ingredientes} recetas={dish.recetas}/>
                })}        
            </div>
            <div className="h-fit w-fit bg-inv-blue rounded-2xl mx-auto mt-10">
                <button className="mx-auto p-2 w-fit cursor-pointer text-2xl text-white font-semibold" onClick={sendSaleInfo}>REPORTAR VENTAS</button>
            </div>
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
            <div className="w-10/12 h-fit mx-auto flex place-content-between mt-6">
                <div className="w-9/12 h-fit pb-2 bg-[#F4F4F4] rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px]">
                    <input className="text-xl font-semibold w-10/12 mt-3 ml-6 bg-inherit outline-none rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] focus:border-r-4 border-inv-blue" placeholder="Nombre Plato" type='text' name='nombre' ref={nameRef}/>
                </div>
                <div className="bg-inv-blue rounded-full ml-2">
                    <img className="mx-auto mt-[6px] w-[80%] cursor-pointer" src={PlusIcon} alt='add icon' onClick={() => setRenderAmount(prevState => prevState+1)}/>
                </div>
            </div> 
            <div className=" h-[380px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {render}
            </div>
            <h1 key='1' className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-8 cursor-pointer" onClick={addNewPlate}> AGREGAR PLATO </h1>
            <DisplayMessage type={'dish'}/>
        </>
    )
}

export function EditablePlateList(){
    const dishes = useSelector(selectDishes);
    const sucursal = useSelector(selectSucursal);
    const dispatch = useDispatch();
    let updatedDishes = []

    const updateDishesEntry = (info) => {
        updatedDishes[info.index].nombre = info.nombre;
        updatedDishes[info.index].ingredientes = info.ingredientes;
        updatedDishes[info.index].recetas = info.recetas;
    }

    // const validateUpdate = () => {
    //     return updatedDishes.some( updatedDish => updatedDish.nombre === '')
    // }

    const sendUpdatedEntries = () => {
        // const isEmpty = validateUpdate();
        // if (isEmpty) return dispatch(recipeMessage('Missing fields'))
        dispatch(UpdateDishes({dishes: updatedDishes, sucursal}))
    }

    return(
        <>
            <div className="h-[460px] w-[97%] mx-auto rounded-lg overflow-auto scrollbar-hide bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                {dishes.map( (dish,index) => {
                    updatedDishes.push({
                        id: dish.id,
                        nombre: dish.nombre,
                        ingredientes: dish.ingredientes,
                        recetas: dish.recetas
                    })
                    return <EditablePlateItem key={dish.id} nombre={dish.nombre} recetas={dish.recetas} ingredientes={dish.ingredientes} index={index} updateFunction={updateDishesEntry}/>
                })}
            </div>
            <div className="h-fit w-fit p-2 rounded-xl bg-inv-blue text-2xl font-medium text-white mx-auto mt-4 cursor-pointer">
                <button onClick={sendUpdatedEntries}> ACTUALIZAR PLATOS </button>
            </div>
            <DisplayMessage type={'dish'}/>
        </>
    )
}