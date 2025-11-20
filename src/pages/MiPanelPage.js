import React, { useState } from 'react';
import MisDispositivos from '../components/MisDispositivos';
import RegistrarDispositivo from '../components/RegistrarDispositivo';
import PonerEnVenta from '../components/PonerEnVenta';

function MiPanelPage() {
  const [dispositivoParaVender, setDispositivoParaVender] = useState(null);
  const handlePonerAVenta = (id) => {
    setDispositivoParaVender(id);
  };

  return (
    <>
      <h2>Mi Panel de Usuario</h2>
      <RegistrarDispositivo />
      <MisDispositivos onPonerAVenta={handlePonerAVenta} />
      <PonerEnVenta dispositivoId={dispositivoParaVender} />
    </>
  );
}
export default MiPanelPage;