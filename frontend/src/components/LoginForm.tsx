import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import '../assets/styles/login.css';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.accessToken);
        navigate('/home');
        window.location.reload();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Credenciais inválidas. Tente novamente.');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar ao servidor. Tente novamente mais tarde.');
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <section className="form-section">
          <h1>Login</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <Link to="/register" className="register-link">
            <FiLogIn size={16} />
            Não tem uma conta? Registre-se
          </Link>
        </section>
        <img
          src="/assets/celular.jpg"
          alt="Login Visual"
          className="login-image"
        />
      </div>
    </div>
  );
};

export default LoginForm;
