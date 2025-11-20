import React, { useState, useEffect } from 'react';

function Marketplace() {
    const [anuncios, setAnuncios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mensajeCompra, setMensajeCompra] = useState('');

    const fetchAnuncios = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/marketplace');
            const data = await response.json();
            
            if (response.ok) {
                setAnuncios(data);
            } else {
                console.error("Error al cargar anuncios");
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Carga los anuncios cuando el componente se monta
        fetchAnuncios();
    }, []);

    const handleComprar = async (anuncioId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setMensajeCompra("Necesitas iniciar sesión para comprar.");
            return;
        }

        setMensajeCompra('Procesando compra...');

        try {
            const response = await fetch('http://localhost:5000/api/marketplace/comprar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ anuncioId: anuncioId })
            });

            const data = await response.json();
            setMensajeCompra(data.msg);

            if (response.ok) {
                fetchAnuncios(); 
            }

        } catch (err) {
            setMensajeCompra("Error de conexión al comprar.");
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #555', borderRadius: '8px', margin: '20px', width: '90%' }}>
            <h2>Marketplace (Compra-Venta)</h2>
            {loading && <p>Cargando anuncios...</p>}
            {mensajeCompra && <p style={{color: 'lightblue'}}>{mensajeCompra}</p>}
            
            {/* --- ¡AQUÍ ESTÁ EL CAMBIO! --- */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
                
                {anuncios.map(anuncio => (
                    
                    <div key={anuncio._id} style={{ border: '1px solid #777', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                        
                        <h4>{anuncio.dispositivo?.nombreDispositivo}</h4>
                        <p>Modelo: {anuncio.dispositivo?.marca} {anuncio.dispositivo?.modelo}</p>
                        <p>Descripción: {anuncio.descripcion}</p>
                        <p>Vendedor: {anuncio.vendedor?.nombre}</p>
                        <p style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Precio: ${anuncio.precio}</p>
                        <p>Fiabilidad (Estado): 
                            <span style={{ color: anuncio.dispositivo?.estado === 'Activo' ? 'lightgreen' : 'red' }}>
                                {anuncio.dispositivo?.estado}
                            </span>
                        </p>
                        
                        <button 
                            onClick={() => handleComprar(anuncio._id)} 
                            style={{backgroundColor: 'green', color: 'white', padding: '8px'}}
                        >
                            Comprar Ahora
                        </button>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Marketplace;