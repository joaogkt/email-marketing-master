import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';



const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('')
        setLoading(true);
    
    try {
        const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
          });

          if (response.ok) {
            setSuccessMessage('Usuário registrado com sucesso! Redirecionando para o login...');
            const data = await response.json();
            setTimeout(() => {
              navigate('/login');
            }, 3000);
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message || 'Não foi possivel criar seu registro. Tente novamente. ');
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
              <h1>Registre-se</h1>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              {successMessage && <p className="success-message">{successMessage}</p>}
              <form onSubmit={handleLogin} className="login-form">
              <input
                  type="name"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input-field"
                />
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
                 {loading ? 'Registrando...' : 'Registrar'}                
                 </button>
              </form>
              <Link to="/login" className="register-link">
                <FiLogIn size={16} />
                Já tem uma conta? Faça login
              </Link>
            </section>
            <img
              src="/assets/celular.jpg"
              alt="Login Visual"
              className="login-image"
            />
          </div>
        </div>
)
}

export default RegisterForm