import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Importamos el Menú
import Navbar from './components/Navbar';

// Importamos todas las PÁGINAS creadas
import AuthPage from './pages/AuthPage';
import MarketplacePage from './pages/MarketplacePage';
import VerificarPage from './pages/VerificarPage';
import MiPanelPage from './pages/MiPanelPage';
import InstitutionalPage from './pages/InstitutionalPage';

function App() {
  return (
    <div className="App">
      {/* 1. El menú de navegación se mostrará siempre arriba */}
      <Navbar />

      {/* 2. El 'header' es el contenedor de la página que cambia según la ruta */}
      <header className="App-header">
        
        {/* 3. Definición de todas las rutas de la aplicación */}
        <Routes>
          {/* RUTA PRINCIPAL (Home) */}
          <Route path="/" element={<h2>Bienvenido a Tracelet</h2>} /> 
          
          {/* RUTA DE AUTENTICACIÓN (Login/Registro) */}
          <Route path="/auth" element={<AuthPage />} />
          
          {/* RUTA DEL MARKETPLACE */}
          <Route path="/marketplace" element={<MarketplacePage />} />
          
          {/* RUTA DE VERIFICACIÓN PÚBLICA */}
          <Route path="/verificar" element={<VerificarPage />} />
          
          {/* RUTA DE GESTIÓN DEL USUARIO */}
          <Route path="/mi-panel" element={<MiPanelPage />} />
          
          {/* RUTA DEL PANEL INSTITUCIONAL (Acceso Restringido) */}
          <Route path="/institucional" element={<InstitutionalPage />} />
        </Routes>

      </header>
    </div>
  );
}

export default App;