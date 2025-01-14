import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css'

function LoginForm() {
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
        console.log(data)
        console.log(data.accessToken)
        localStorage.setItem('token', data.accessToken);
        navigate('/send-email'); 
    } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login falhou! Verifique suas credenciais.');
      }
    } catch (error) {
      setErrorMessage('Erro ao conectar com o servidor. Tente novamente mais tarde.');
      console.error('Erro ao fazer login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="login-container">
  <form onSubmit={handleLogin} className="login-form">
    <h1>Login</h1>

    {errorMessage && <p className="error-message">{errorMessage}</p>}

    <label htmlFor="email">Email:</label>
    <input
      id="email"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Digite seu email"
      required
    />

    <label htmlFor="password">Senha:</label>
    <input
      id="password"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Digite sua senha"
      required
    />

    <button type="submit" disabled={loading} className="submit-button">
      {loading ? 'Entrando...' : 'Entrar'}
    </button>
  </form>
</div>
  );
}

export default LoginForm;
