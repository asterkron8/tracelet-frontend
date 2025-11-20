import React, { useState } from 'react';

function LoginUsuario() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [mensaje, setMensaje] = useState('');
    const [needsBiometric, setNeedsBiometric] = useState(false); // Estado para la simulación biométrica
    const [jwtToken, setJwtToken] = useState(null); // Guardamos el token temporalmente
    
    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- PASO 1: VALIDACIÓN DE CREDENCIALES ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('Iniciando sesión...');
        
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Credenciales OK: Pasamos al segundo factor
                setJwtToken(data.token);
                setNeedsBiometric(true); 
                setMensaje("Credenciales correctas. Iniciando Verificación Facial...");
            } else {
                setMensaje(`Error: ${data.msg}`); 
                setJwtToken(null);
            }
        } catch (err) {
            setMensaje("Error al conectar con el servidor.");
        }
    };
    
    // --- PASO 2: SIMULACIÓN BIOMÉTRICA ---
    const handleBiometricScan = () => {
        setMensaje('Analizando rostro...');
        setTimeout(() => {
            // Simulamos que el escaneo es exitoso
            localStorage.setItem('token', jwtToken); // Guardamos el token SÓLO después del 2FA
            setMensaje("¡Sesión iniciada! Ya puedes registrar y gestionar tus dispositivos.");
            setNeedsBiometric(false);
            setJwtToken(null);
        }, 1500);
    };

    // ------------------------------------

    // Si ya estamos en el paso de biometría, mostramos ese componente
    if (needsBiometric) {
        return (
            <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '12px', margin: '20px', backgroundColor: '#fff0f0' }}>
                <h2>Verificación Facial (2FA)</h2>
                <p>⚠️ {mensaje}</p>
                <div style={{ fontSize: '4em', margin: '20px' }}>👁️</div>
                <button 
                    onClick={handleBiometricScan} 
                    style={{backgroundColor: '#00cc66'}}
                >
                    Simular Escaneo Facial
                </button>
            </div>
        );
    }
    
    // Si no, mostramos el formulario de login normal
    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '12px', margin: '20px' }}>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" required />
                <button type="submit">Entrar</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default LoginUsuario;