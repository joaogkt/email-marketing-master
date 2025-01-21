import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import emailIcon from '/assets/marketing-de-email.png';
import digitalMarketing from '/assets/digital-marketing.png';
import relatorioIcon from '/assets/relatorio.png'
import { useNavigate } from 'react-router-dom';

function EmailPage() {

  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <>
    <AppNavbar />
    <div className='titulo'>
          <h1>Email Marketing</h1>
      </div>
      <div className="modules-container">

        <div className="module">
          <img src={emailIcon} alt="Email Icon" className="module-icon" />
          <h2>Envio individual de email</h2>
          <p>Envie emails personalizados para seus clientes.</p>
          <button className="module-button"  onClick={() => handleRedirect('/send-email')}>Acessar</button>
        </div>

        <div className="module">
          <img src={digitalMarketing} alt="Email Icon" className="module-icon" />
          <h2>Envio de email para lista de contatos</h2>
          <p>Planeje e execute campanhas de marketing com eficiência.</p>
          <button className="module-button"  onClick={() => handleRedirect('/campanhas')}>Acessar</button>
        </div>

        <div className="module">
          <img src={relatorioIcon} alt="Relatorio Icon" className="module-icon" />
          <h2>Relatorios</h2>
          <p>Visualize os relatorios dos envios e falhas de email.</p>
          <button className="module-button"  onClick={() => handleRedirect('/lista-contatos')}>Acessar</button>
        </div>
    </div>
    </>
  );
}

export default EmailPage;
