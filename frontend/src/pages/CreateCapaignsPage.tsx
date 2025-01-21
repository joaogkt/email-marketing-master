import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import { useNavigate } from 'react-router-dom';
import CampanhasForm from '../components/CampanhasForm';

function CreateCampaignsPage() {

  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
  };


  return (
    <>
    <div className="home-page">
    <AppNavbar />
    </div>
    <CampanhasForm />
    </>

  )
}

export default CreateCampaignsPage;