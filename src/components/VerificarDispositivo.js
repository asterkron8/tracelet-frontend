import React, { useState } from 'react';

function VerificarDispositivo() {
    const [imei, setImei] = useState('');
    const [resultado, setResultado] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResultado(null);

        try {
            // Llama a tu backend en localhost:5000
            const response = await fetch(`http://localhost:5000/api/verificar/${imei}`);
            const data = await response.json();
            setResultado(data);
        } catch (err) {
            setResultado({ mensaje: "Error al conectar con el servidor", estado: "Error" });
        }
        setLoading(false);
    };

    // Función para cambiar el color según el estado
    const getEstadoColor = (estado) => {
        if (estado === 'Robado' || estado === 'Perdido') return '#ffcccc'; // Rojo
        if (estado === 'Activo') return '#ccffcc'; // Verde
        return '#eeeeee'; // Gris para "No registrado"
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px' }}>
            <h2>Verificar Fiabilidad de Dispositivo</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={imei}
                    onChange={(e) => setImei(e.target.value)}
                    placeholder="Introduce el IMEI a verificar"
                    required
                    style={{ padding: '8px', marginRight: '10px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '8px' }}>
                    {loading ? 'Verificando...' : 'Verificar'}
                </button>
            </form>

            {resultado && (
                <div style={{ 
                    marginTop: '20px', 
                    padding: '10px', 
                    backgroundColor: getEstadoColor(resultado.estado)
                }}>
                    <strong>{resultado.mensaje}</strong>
                    {resultado.nombreDispositivo && <p>Nombre: {resultado.nombreDispositivo}</p>}
                    <p>Estado: {resultado.estado}</p>
                </div>
            )}
        </div>
    );
}

export default VerificarDispositivo;