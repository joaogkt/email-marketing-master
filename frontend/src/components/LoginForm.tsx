import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/login.css'
import {FiLogIn} from 'react-icons/fi'
import {Link } from 'react-router-dom'

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
  <div className="logon-container">
    <section className="form">
      <img src={'/'} alt="The Email Image"/>
      <form onSubmit={ handleLogin }>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

          <h1>Faça seu logon</h1>
          <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Digite seu email"
        required
      />

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

          <Link className="back-link" to="/register">
              <FiLogIn size={16} color="#e02041" />
              Não tenho cadastro
          </Link>
      </form>

</section>
<img src={ '/' } alt="Email Marketing" />
</div>
  );
}

export default LoginForm;
