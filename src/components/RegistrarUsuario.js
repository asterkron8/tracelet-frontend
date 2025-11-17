import React, { useState } from 'react';

function RegistrarUsuario() {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
    });
    const [mensaje, setMensaje] = useState('');

    const { nombre, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('Registrando...');

        try {
            // Llama a la ruta /api/auth/register de tu backend
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje(data.msg); // "Usuario registrado con éxito"
            } else {
                setMensaje(`Error: ${data.msg}`); // "El usuario ya existe"
            }
        } catch (err) {
            setMensaje("Error al conectar con el servidor.");
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px' }}>
            <h2>Crear Cuenta</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={nombre} onChange={onChange} placeholder="Nombre" required />
                <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" required />
                <button type="submit">Registrarse</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default RegistrarUsuario;