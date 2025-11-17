import React from 'react';
import './App.css';

// Importamos TODOS los componentes
import RegistrarUsuario from './components/RegistrarUsuario';
import LoginUsuario from './components/LoginUsuario';
import VerificarDispositivo from './components/VerificarDispositivo';
import RegistrarDispositivo from './components/RegistrarDispositivo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Bienvenido a Tracelet</h1>

        {/* Mostramos los componentes de usuario */}
        <RegistrarUsuario />
        <LoginUsuario />

        <hr style={{width: '80%'}} />

        {/* Mostramos los componentes de dispositivo */}
        <VerificarDispositivo />

        <hr style={{width: '80%'}} />

        <RegistrarDispositivo />

      </header>
    </div>
  );
}

export default App;