import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { idleStatus, selectUser } from './slices/userSlice';

import Home from './pages/Home/Home';
import Inventario from './pages/Inventario/Inventario';
// import ReporteDeVentas from './pages/Reporte_de_ventas/ReporteVentas';
import SuplirIngredientes from './pages/Suplir_ingredientes/SuplirIngredientes';
import Calculator from './pages/Calculadora/Calculadora';
import ConfigIngredients from './pages/Configurar_ingredientes/ConfigurarIngredientes';
import { fetchSucursales, selectSucursal } from './slices/sucursalesSlice';
import { fetchIngredients } from './slices/ingredientSlice';
import { fetchRecipes } from './slices/recipeSlice';
import { fetchDishes } from './slices/platosSlice';
import Platos from './pages/Platos/Platos';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const usuario = sessionStorage.getItem("username");
  const sucursal = useSelector(selectSucursal);   
  const version  = '1.0.7';

  useEffect( () => {
    if (userData.status === 'completed') {
      sessionStorage.setItem("username",`${userData.info.username}`)
      navigate("/inventario");
      dispatch(idleStatus());
    }
  },[dispatch,navigate,userData])

  useEffect( () => {
    if(sucursal){
      dispatch(fetchIngredients({usuario,sucursal}))        
      dispatch(fetchRecipes({usuario,sucursal}));
      dispatch(fetchDishes({usuario,sucursal}))
    }
  }, [dispatch, usuario, sucursal]) 

  useEffect( () => {
      dispatch(fetchSucursales(usuario))
  }, [dispatch, usuario])

  useEffect( () => {
    console.log(`Curent Version ${version}`)
  },[])

    return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        {/* <Route path="/reporte_de_ventas" element={<ReporteDeVentas/>}/> */}
        <Route path="/suplir_ingredientes" element={<SuplirIngredientes/>}/>
        <Route path="/configurar_ingredientes" element={<ConfigIngredients/>}/>
        <Route path="/calculadora" element={<Calculator/>}/>
        <Route path="/platos" element={<Platos/>}/>
        {/* <Route path="/manual" element={<Manual/>}/> */}
        {/* <Route path="/servicios" element={<Servicios/>}/> */}
        <Route path="/download"/>
      </Routes>      
    </>
  );
}

export default App;