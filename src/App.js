import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { selectUser } from './slices/userSlice';

import Home from './pages/Home/Home';
import Inventario from './pages/Inventario/Inventario';
import ReporteDeVentas from './pages/Reporte_de_ventas/ReporteVentas';
import SuplirIngredientes from './pages/Suplir_ingredientes/SuplirIngredientes';
import ConfigIngredients from './pages/Configurar_ingredientes/ConfigurarIngredientes';

function App() {
  const userData = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect( () => {
    if (userData.status === 'completed') {
      sessionStorage.setItem("username",`${userData.info.username}`)
      navigate("/inventario");
    }
  },[userData, navigate])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inventario/" element={<Inventario/>}/>
        <Route path="/reporte_de_ventas" element={<ReporteDeVentas/>}/>
        <Route path="/suplir_ingredientes" element={<SuplirIngredientes/>}/>
        <Route path="/configurar_ingredientes" element={<ConfigIngredients/>}/>
        {/* <Route path="/contactos" element={<Inventario/>}/> */}
        {/* <Route path="/precios" element={<Inventario/>}/> */}
        {/* <Route path="/manual" element={<Inventario/>}/> */}
        {/* <Route path="/servicios" element={<Inventario/>}/> */}
      </Routes>      
    </>
  );
}

export default App;