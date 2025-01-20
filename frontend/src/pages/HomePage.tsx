import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import emailIcon from '/assets/marketing-de-email.png';
import contactsIcon from '/assets/contato.png';
import campaignsIcon from '/assets/campanha.png';

function HomePage() {
  return (
    <>
      <div className="home-page">
        <AppNavbar />
      </div>
      <div className="modules-container">

        <div className="module">
          <img src={emailIcon} alt="Email Icon" className="module-icon" />
          <h2>Email</h2>
          <p>Gerencie e envie emails personalizados para seus clientes.</p>
          <button className="module-button">Acessar</button>
        </div>

        <div className="module">
          <img src={campaignsIcon} alt="Campaigns Icon" className="module-icon" />
          <h2>Campanhas</h2>
          <p>Planeje e execute campanhas de marketing com eficiência.</p>
          <button className="module-button">Acessar</button>
        </div>

        <div className="module">
          <img src={contactsIcon} alt="Contacts Icon" className="module-icon" />
          <h2>Lista de Contatos</h2>
          <p>Organize sua base de contatos e mantenha tudo em um só lugar.</p>
          <button className="module-button">Acessar</button>
        </div>

      </div>
    </>
  );
}

export default HomePage;
