import React from 'react';
import RegistrarUsuario from '../components/RegistrarUsuario';
import LoginUsuario from '../components/LoginUsuario';

function AuthPage() {
  return (
    <>
      <RegistrarUsuario />
      <LoginUsuario />
    </>
  );
}
export default AuthPage;