import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectRecipes } from "../../slices/recipeSlice";
// import { DisplayMessage } from "../DisplayMessage/DisplayMessage";

export const Calculator = (props) => {
    const {title} = props
    const [display, setDisplay] = useState('calculator')
    const [toggle, setToggle] = useState(true);
    const recipes = useSelector(selectRecipes);
    const [filteredRecipe, setFilteredRecipe] = useState([]);
    const [renderIngredients, setRenderIngredients] = useState('')
    const [ingredientMap, setIngredientMap] = useState(new Map());
    const [recipeMap, setRecipeMap] = useState(new Map());

    useEffect(() => {
        setFilteredRecipe(recipes)
    },[recipes])

    useEffect(() => {
        if (ingredientMap.size !== 0) {
            setRenderIngredients(
                <div className="text-center">
                    {[...recipeMap.keys()].map(recipe => {
                        return(
                            <div key={recipe} className="my-2">
                                <h1 className="mx-auto text-lg font-semibold border-white border-b-2">{recipe}</h1>
                                <div className="flex place-content-between my-4">
                                    {/* <p className="w-7/12 border-t-2 border-r-2 border-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{ingredient}</p>
                                    <p className="w-2/12 border-t-2 border-r-2 border-white rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center">{ingredientMap.get(ingredient)}</p> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
            setDisplay('result')
        }
    },[ingredientMap, recipeMap])

    const filterRecipes = (event) => {
        const value = event.target.value;
        const filtered = recipes.filter( recipe => recipe.nombre.toLowerCase().includes(value.toLowerCase()))
        setFilteredRecipe(filtered)    
    }

    const setQuantity = (event) => (recipeInfo) => {
        const value = event.target.value;
        const {nombre, ingredientes} = recipeInfo;
        let {cantidades} = recipeInfo;
        cantidades = cantidades.map(cantidad => cantidad*value);

        if(value === '' && recipeMap.has(nombre)) setRecipeMap(prevMap => {
            prevMap.delete(nombre)
            return new Map(prevMap)
        })
        else if (value !== '') setRecipeMap(prevMap => {
            prevMap.set(nombre, {ingredientes, cantidades, value})
            return new Map(prevMap);
        })
    }

    const calculateIngredients = () => {
        recipeMap.forEach( value => {
            value.ingredientes.forEach( (ingrediente,index) => {
                if (!ingredientMap.has(ingrediente)) {
                    setIngredientMap(prevMap => {
                        prevMap.set(ingrediente, value.cantidades[index])
                        return new Map(prevMap)
                    })
                }
                else {
                    setIngredientMap(prevMap => {
                        prevMap.set(ingrediente, ingredientMap.get(ingrediente) + value.cantidades[index])
                        return new Map(prevMap)
                    })
                }
            })
        })
    }

    const toggleDisplay = () => {
        if (toggle) {
            setRenderIngredients(
                <div className="max-h-[500px] h-fit w-11/12 mx-auto py-4 overflow-auto scrollbar-hide">
                    {[...ingredientMap.keys()].map(ingredient => {
                        return(
                            <div key={ingredient} className="flex place-content-between my-4">
                                <p className="w-7/12 border-t-2 border-r-2 border-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{ingredient}</p>
                                <p className="w-2/12 border-t-2 border-r-2 border-white rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center">{ingredientMap.get(ingredient)}</p>
                            </div>
                        )
                    })}
                </div>
            )
        }else{
            setRenderIngredients(
                <div className="text-center">
                    {[...recipeMap.keys()].map(recipe => {
                        return(
                            <div key={recipe} className="flex place-content-between my-4">
                                <h1 className="">{recipe}</h1>
                                {/* <p className="w-7/12 border-t-2 border-r-2 border-inv-blue rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{ingredient}</p>
                                <p className="w-2/12 border-t-2 border-r-2 border-white rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center">{ingredientMap.get(ingredient)}</p> */}
                            </div>
                        )
                    })}
                </div>
            )
        }
        setToggle(toggle => !toggle)
    }

    const resetStates = () => {
        setDisplay('calculator')
        setToggle(false)
        setRecipeMap(new Map())
        setIngredientMap(new Map())
        setRenderIngredients([])
    }

    const renderRecipes = 
    <div className="max-h-[500px] h-fit w-11/12 mx-auto py-4 overflow-auto scrollbar-hide">
        {filteredRecipe.map(recipe => {
            return(
                <div key={recipe.id} className="flex place-content-between mx-20 my-4">
                    <p className="w-8/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-[#F4F4F4] pl-4 py-1 font-semibold text-xl">{recipe.nombre}</p>
                    <input className="w-2/12 rounded-tr-3xl rounded-tl-[50px] rounded-bl-3xl rounded-br-[50px] bg-inv-blue pl-4 py-1 outline-none text-white font-medium text-center" type='number' placeholder="cantidades" onBlur={(event) => setQuantity(event)(recipe)}/>
                </div>
            )
        })}
    </div>

    const calculatorRender = 
    <>
        <input className="ml-32 mt-6 mb-1 bg-inherit outline-none text-xl font-medium border-b-2 border-r-2 border-inv-blue rounded-br-xl" type='text' placeholder="Search Recipe..." onChange={filterRecipes}/>
        <div className="h-[500px] bg-gradient-to-b from-transparent via-inv-blue to-transparent">
            {renderRecipes}
        </div>
        <div className="h-fit w-fit bg-inv-blue rounded-2xl mx-auto mt-2">
            <button className="mx-auto w-fit p-2 cursor-pointer text-2xl text-white font-semibold" onClick={calculateIngredients}> CALCULAR </button>
        </div>
    </>

    const resultRender = 
    <>
        <div className="h-[500px] bg-gradient-to-b from-transparent via-inv-blue to-transparent px-20">
            <div className="w-11/12 flex place-content-between mx-auto mt-4 font-semibold text-2xl">
                <p className="border-b-2 border-inv-blue rounded-br-2xl p-2"> Ingredientes </p>
                <p className="border-b-2 border-inv-blue rounded-br-2xl p-2"> Cantidades </p>
            </div>
            {renderIngredients}
        </div>
        <div className="h-fit w-fit bg-inv-blue rounded-2xl mx-auto mt-10">
            <button className="mx-auto w-fit p-2 cursor-pointer text-2xl text-white font-semibold" onClick={resetStates}> REGRESAR </button>
        </div>
        <div className={`relative left-10 bottom-4 h-[20px] w-[60px] bg-[#F4F4F4] rounded-xl flex place-items-center ${toggle === true ? 'place-content-start' : 'place-content-end'}`}>
            <button className="h-[40px] w-[40px] rounded-full bg-inv-blue" onClick={toggleDisplay}></button>
        </div>
    </>

    //totales y desglose
    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                    {display !== 'calculator'? resultRender : calculatorRender}
                </div>
            </div>
            {/* <DisplayMessage type={'ingredient'}/> */}
        </>
    )
}