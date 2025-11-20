import React, { useState, useEffect } from 'react';

function MisDispositivos({ onPonerAVenta }) {
    const [dispositivos, setDispositivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const token = localStorage.getItem('token');

    // Función para cargar los dispositivos
    const fetchMisDispositivos = async () => {
        if (!token) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/mis-dispositivos', {
                headers: { 'x-auth-token': token }
            });
            const data = await response.json();
            if (response.ok) {
                setDispositivos(data);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMisDispositivos();
    }, [token]);

    // Función para reportar (Perdido/Robado)
    const handleReportar = async (dispositivoId, nuevoEstado) => {
        setMensaje('Actualizando estado...');
        try {
            const response = await fetch('http://localhost:5000/api/dispositivo/reportar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ dispositivoId, nuevoEstado })
            });
            const data = await response.json();
            setMensaje(data.msg);
            // Refrescamos la lista para ver el cambio
            fetchMisDispositivos();
        } catch (err) {
            setMensaje('Error de conexión');
        }
    };

    if (!token) {
        return <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px' }}>
            <h2>Mis Dispositivos</h2>
            <p>Inicia sesión para ver tus dispositivos registrados.</p>
        </div>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px', width: '90%' }}>
            <h2>Mis Dispositivos</h2>
            {loading && <p>Cargando...</p>}
            {mensaje && <p>{mensaje}</p>}

            {dispositivos.length === 0 && !loading && <p>No tienes dispositivos registrados.</p>}

            {dispositivos.map(dispo => (
                <div key={dispo._id} style={{ border: '1px solid #777', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
                    <h4>{dispo.nombreDispositivo} ({dispo.marca} {dispo.modelo})</h4>
                    <p>IMEI: {dispo.imei}</p>
                    <p>ID (para vender): {dispo._id}</p>
                    <p>Estado Actual: <strong style={{color: dispo.estado === 'Activo' ? 'lightgreen' : 'red'}}>{dispo.estado}</strong></p>

                    {/* Acciones */}
                    <div>
                        <button onClick={() => onPonerAVenta(dispo._id)} style={{backgroundColor: 'blue', color: 'white'}}>
                            Poner a la Venta
                        </button>
                        <button onClick={() => handleReportar(dispo._id, 'Perdido')} style={{backgroundColor: 'orange', marginLeft: '10px'}}>
                            Reportar Perdido
                        </button>
                        <button onClick={() => handleReportar(dispo._id, 'Robado')} style={{backgroundColor: 'red', marginLeft: '10px'}}>
                            Reportar Robado
                        </button>
                        {/* Botón para reactivar */}
                        {dispo.estado !== 'Activo' && (
                            <button onClick={() => handleReportar(dispo._id, 'Activo')} style={{backgroundColor: 'green', marginLeft: '10px'}}>
                                Marcar como Encontrado (Activo)
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MisDispositivos;