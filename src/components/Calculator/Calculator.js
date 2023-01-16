import React, { useEffect, useState }  from "react";
import { useSelector } from "react-redux";
import { selectDishes } from "../../slices/platosSlice";
import { CalcultorItem, ResultDisplay } from "../Item/Item";
// import { DisplayMessage } from "../DisplayMessage/DisplayMessage";

export const Calculator = (props) => {
    const {title} = props
    const dishes = useSelector(selectDishes);
    const [filteredDishes, setFilteredDishes] = useState([]);
    const [calculatorInfo, setCalculatorInfo] = useState(new Map());
    const [resultInfo, setResultInfo] = useState([]);
    const [display, setDisplay] = useState('calculator')

    useEffect(() => {
        setFilteredDishes(dishes)
    },[dishes])

    const updateFilteredDishes = (event) => {
        const filtered = dishes.filter(dish => dish.nombre.toLowerCase().includes(event.target.value.toLowerCase()))
        setFilteredDishes(filtered)
    }
    
    const updateCalculatorInfo = (data) => {
        const target = data.event.target;
        const value = target.value;
        const {nombre, ingredientes, recetas} = data.info;
    

        if(value === '') {
            if (calculatorInfo.has(nombre)){
                setCalculatorInfo(prevState => {
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
            setCalculatorInfo(prevState => {
                let newState = new Map(prevState.set(nombre, info));
                return newState;
            })
        } 
    }   

    const calculateValues = () => { 
        if(display === 'result') {
            setCalculatorInfo(new Map());
            setDisplay('calculator');
            return
        }

        const values = [...calculatorInfo.values()];
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
        setResultInfo([ingredientes,recetas])
        setDisplay('result')
    }

    return(
        <>
            <div className="z-0 row-start-2 flex items-center place-content-center">
                <div className="w-[90%] h-[700px] bg-white rounded-[50px] shadow-[15px_-10px_0px_0px_#000692]">
                    <div className="h-[600px]">
                        <h1 className="text-3xl text-center font-bold mt-5 underline"> {title} </h1>
                        <input className={`${display === 'calculator' ? '' : 'hidden'} ml-32 mt-6 mb-1 bg-inherit outline-none text-xl font-medium border-b-2 border-r-2 border-inv-blue rounded-br-xl`} type='text' placeholder="Search Dishes..." onChange={updateFilteredDishes}/>
                        <div className="h-[500px] bg-gradient-to-b from-transparent via-inv-blue to-transparent">
                            {
                                display === 'calculator' 
                                ?   <div className="max-h-[500px] h-fit w-11/12 mx-auto py-4 overflow-auto scrollbar-hide">
                                    {filteredDishes.map(dish => <CalcultorItem key={dish.id} nombre={dish.nombre} ingredientes={dish.ingredientes} recetas={dish.recetas} update={updateCalculatorInfo}/>)}
                                    </div>
                                : <ResultDisplay ingredientes={resultInfo[0]} recetas={resultInfo[1]}/>
                            }
                        </div>
                    </div>
                    <button className="text-white font-semibold text-2xl w-fit h-fit bg-inv-blue rounded-2xl p-2 mx-auto block" onClick={calculateValues}> {display === 'calculator' ? 'CALCULAR' : 'REGRESAR'} </button>
                </div>
            </div>
            {/* <DisplayMessage type={'ingredient'}/> */}
        </>
    )
}