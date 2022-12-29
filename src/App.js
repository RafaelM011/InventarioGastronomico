import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { idleStatus, selectUser } from './slices/userSlice';

import Home from './pages/Home/Home';
import Inventario from './pages/Inventario/Inventario';
import ReporteDeVentas from './pages/Reporte_de_ventas/ReporteVentas';
import SuplirIngredientes from './pages/Suplir_ingredientes/SuplirIngredientes';
import Calculator from './pages/Calculadora/Calculadora';
import ConfigIngredients from './pages/Configurar_ingredientes/ConfigurarIngredientes';
import { fetchSucursales, selectSucursal } from './slices/sucursalesSlice';
import { fetchIngredients } from './slices/ingredientSlice';
import { fetchRecipes } from './slices/recipeSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const username = sessionStorage.getItem("username");
  const sucursal = useSelector(selectSucursal);   
  const version  = '1.0.5';

  useEffect( () => {
    if (userData.status === 'completed') {
      sessionStorage.setItem("username",`${userData.info.username}`)
      navigate("/inventario");
      dispatch(idleStatus());
    }
  },[dispatch,navigate,userData])

  useEffect( () => {
      dispatch(fetchIngredients(sucursal))        
      dispatch(fetchRecipes(sucursal));
  }, [dispatch, username, sucursal]) 

  useEffect( () => {
      dispatch(fetchSucursales(username))
  }, [dispatch, username])

  useEffect( () => {
    console.log(`Curent Version ${version}`)
  },[])

    return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventario" element={<Inventario/>}/>
        <Route path="/reporte_de_ventas" element={<ReporteDeVentas/>}/>
        <Route path="/suplir_ingredientes" element={<SuplirIngredientes/>}/>
        <Route path="/configurar_ingredientes" element={<ConfigIngredients/>}/>
        <Route path="/calculadora" element={<Calculator/>}/>
        {/* <Route path="/precios" element={<Inventario/>}/> */}
        {/* <Route path="/manual" element={<Inventario/>}/> */}
        {/* <Route path="/servicios" element={<Inventario/>}/> */}
        <Route path="/download"/>
      </Routes>      
    </>
  );
}

export default App;