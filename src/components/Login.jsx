import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css'; // Importar estilos

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { correo, contraseña: password };

    try {
      const response = await fetch('https://video-back.vercel.app/v1/tubeyet/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      // Verificar si la respuesta es válida JSON
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        throw new Error('Respuesta no válida del servidor.');
      }

      if (response.ok) {
        // Si el login es exitoso, mostramos el mensaje del backend
        alert(data.message);

        // Guardar datos relevantes en localStorage
        localStorage.setItem('user', JSON.stringify({ name: data.name, email: correo }));

        // Redirigir a DashboardMain
        navigate('/dashboard-main');
      } else {
        // Manejo de errores del backend
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al hacer login:', error);
      alert('Hubo un error al intentar iniciar sesión.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Bienvenido a Reply</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
          <button type="submit" className="login-button">
            Ingresar
          </button>
        </form>
        <p className="login-footer">
          ¿No tienes cuenta?{' '}
          <span
            onClick={() => navigate('/register')}
            className="login-link"
          >
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
