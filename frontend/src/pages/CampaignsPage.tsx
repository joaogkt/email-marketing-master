import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import { useNavigate } from 'react-router-dom';
import emailIcon from '/assets/marketing-de-email.png';
import digitalMarketing from '/assets/digital-marketing.png';

function CampaignsPage() {

  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
  };


  return (
    <>
    <AppNavbar />
    <div className='titulo'>
        <h1>Campanhas Marketing</h1>
    </div>

      <div className="modules-container">

        <div className="module">
          <img src={emailIcon} alt="Email Icon" className="module-icon" />
          <h2>Criar uma nova campanha</h2>
          <p>Crie uma nova campanha para seus envios de email.</p>
          <button className="module-button"  onClick={() => handleRedirect('/campanhas/create')}>Acessar</button>
        </div>

        <div className="module">
          <img src={digitalMarketing} alt="Email Icon" className="module-icon" />
          <h2>Listar Campanhas</h2>
          <p>Listar campanhas ja criadas.</p>
          <button className="module-button"  onClick={() => handleRedirect('/campanhas/list')}>Acessar</button>
        </div>

    </div>
    </>

  )
}

export default CampaignsPage;