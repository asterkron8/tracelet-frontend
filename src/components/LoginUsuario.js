import React, { useState } from 'react';

function LoginUsuario() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [mensaje, setMensaje] = useState('');

    const { email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('Iniciando sesión...');

        try {
            // Llama a la ruta /api/auth/login de tu backend
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // ¡ÉXITO! Aquí está la clave
                localStorage.setItem('token', data.token); // Guardamos el token en el navegador
                setMensaje("¡Sesión iniciada! Ya puedes registrar tus dispositivos.");
            } else {
                setMensaje(`Error: ${data.msg}`); // "Credenciales inválidas"
            }
        } catch (err) {
            setMensaje("Error al conectar con el servidor.");
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px' }}>
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