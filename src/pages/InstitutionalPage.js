import React, { useState, useEffect } from 'react';

function InstitutionalPage() {
    const [dispositivosRobados, setDispositivosRobados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('Cargando...');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRobados = async () => {
            if (!token) {
                setLoading(false);
                setMensaje('Debes iniciar sesión con una cuenta institucional.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/institucional/dispositivos-robados', {
                    headers: { 'x-auth-token': token }
                });

                const data = await response.json();

                if (response.status === 403) {
                    setMensaje('Acceso denegado. Tu cuenta no es una entidad institucional.');
                } else if (response.ok) {
                    setDispositivosRobados(data.dispositivos);
                    setMensaje(data.msg);
                } else {
                    setMensaje('Error al obtener datos institucionales.');
                }

            } catch (err) {
                setMensaje('Error de conexión al servidor.');
            }
            setLoading(false);
        };

        fetchRobados();
    }, [token]);

    return (
        <div style={{ padding: '20px', width: '90%', maxWidth: '1000px' }}>
            <h2>👮 Panel de Control Institucional</h2>
            <h3>(Fuerzas de Seguridad y Aseguradoras)</h3>
            
            {loading ? (
                <p>Cargando lista global...</p>
            ) : (
                <>
                    <p style={{ color: dispositivosRobados.length > 0 ? 'red' : 'green' }}>{mensaje}</p>

                    <div style={{ textAlign: 'left' }}>
                        {dispositivosRobados.length > 0 ? (
                            dispositivosRobados.map((dispo, index) => (
                                <div key={dispo._id} style={{ border: '1px solid red', padding: '15px', margin: '10px 0', borderRadius: '8px', backgroundColor: '#fff0f0' }}>
                                    <strong>{index + 1}. {dispo.nombreDispositivo} ({dispo.marca} {dispo.modelo})</strong>
                                    <p>Estado: {dispo.estado}</p>
                                    <p>IMEI: {dispo.imei}</p>
                                    <p>Propietario: {dispo.propietario.nombre} ({dispo.propietario.email})</p>
                                </div>
                            ))
                        ) : (
                            <p>✅ No hay dispositivos reportados como robados o perdidos actualmente.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default InstitutionalPage;