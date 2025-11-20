import React from 'react';
import { Link } from 'react-router-dom'; // 'Link' es como un <a> pero para React Router

function Navbar() {
  
  // --- Estilos para la barra de navegación ---
  const navStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Blanco translúcido
    backdropFilter: 'blur(10px)', // Efecto "blur" como el de Apple
    borderBottom: '1px solid #ddd',
    padding: '0 20px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center', // Centra el contenido
    alignItems: 'center',
    position: 'fixed', // La deja fija arriba
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box' // Para que el padding no la haga más ancha de 100%
  };

  const navContentStyle = {
    display: 'flex',
    justifyContent: 'space-between', // Espacio entre logo, menú e icono
    alignItems: 'center',
    width: '100%',
    maxWidth: '1000px', // Ancho máximo del contenido (como Apple)
  };

  const menuStyle = {
    display: 'flex',
    justifyContent: 'center', // Centra los enlaces del menú
    flexGrow: 1, // Ocupa el espacio central
    gap: '25px', // Espacio entre enlaces
  };

  const linkStyle = {
    color: '#1d1d1f', // Texto oscuro (color de Apple)
    textDecoration: 'none',
    fontSize: '0.9em' // Fuente más pequeña y fina
  };

  const logoStyle = {
    ...linkStyle,
    fontWeight: 'bold',
    fontSize: '1.1em'
  };

  const iconStyle = {
    fontSize: '1.2em',
    textDecoration: 'none',
    color: '#1d1d1f'
  };
  // ----------------------------------------

  return (
    <nav style={navStyle}>
      <div style={navContentStyle}>

        {/* Logo/Home Link (Izquierda) */}
        <Link to="/" style={logoStyle}>
          Tracelet
        </Link>

        {/* 1. Menú Centrado */}
        <div style={menuStyle}>
          <Link to="/marketplace" style={linkStyle}>Compra-Venta</Link>
          <Link to="/verificar" style={linkStyle}>Verificar</Link>
          <Link to="/mi-panel" style={linkStyle}>Mi Panel</Link>
        </div>

        {/* 2. Símbolo de "personita" (Derecha) */}
        <Link to="/auth" style={iconStyle}>
          👤
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;