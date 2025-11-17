import React, { useState } from 'react';

function RegistrarDispositivo() {
    const [formData, setFormData] = useState({
        imei: '',
        nombreDispositivo: '',
        marca: '',
        modelo: ''
    });
    const [mensaje, setMensaje] = useState('');

    const { imei, nombreDispositivo, marca, modelo } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('Registrando...');

        const token = localStorage.getItem('token'); // Coge el token del login

        if (!token) {
            setMensaje("Error: Necesitas iniciar sesión para registrar un dispositivo.");
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/registrar-dispositivo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token // Envía el token al "guardián"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setMensaje(`¡Dispositivo ${data.dispositivo.nombreDispositivo} registrado!`);
                setFormData({ imei: '', nombreDispositivo: '', marca: '', modelo: '' });
            } else {
                setMensaje(`Error: ${data.msg}`);
            }
        } catch (err) {
            setMensaje("Error al conectar con el servidor.");
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px' }}>
            <h2>Registra Tu Dispositivo</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="imei" value={imei} onChange={onChange} placeholder="IMEI / Número de Serie" required />
                <input type="text" name="nombreDispositivo" value={nombreDispositivo} onChange={onChange} placeholder="Nombre (Ej: Móvil de trabajo)" required />
                <input type="text" name="marca" value={marca} onChange={onChange} placeholder="Marca (Ej: Apple)" />
                <input type="text" name="modelo" value={modelo} onChange={onChange} placeholder="Modelo (Ej: iPhone 15)" />
                <button type="submit">Registrar Dispositivo</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
}

export default RegistrarDispositivo;