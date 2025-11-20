import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // <--- 1. IMPORTAMOS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. ENVOLVEMOS LA APP */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);