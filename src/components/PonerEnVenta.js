import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  
  return (
    // Reemplazamos style={navStyle} por className="navbar"
    <nav className="navbar">
        
        {/* Logo Link (Usamos la clase del logo) */}
        <Link to="/" className="navbar-logo">
          Tracelet
        </Link>

        {/* 1. Menú Centrado (Usamos la clase de links) */}
        <div className="navbar-links">
          <Link to="/marketplace">Compra-Venta</Link>
          <Link to="/verificar">Verificar</Link>
          <Link to="/mi-panel">Mi Panel</Link>
          <Link to="/institucional">Panel Policía</Link>
        </div>

        {/* 2. Símbolo de "personita" (Derecha) */}
        <Link to="/auth" style={{fontSize: '1.2em', textDecoration: 'none', color: '#1d1d1f'}}>
          👤
        </Link>

    </nav>
  );
}

export default Navbar;