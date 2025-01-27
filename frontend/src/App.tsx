import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmailPage from './pages/EmailPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ListContactsPage from './pages/ListContactsPage';
import SendEmailPage from './pages/SendEmailPage';
import CampaignsPage from './pages/CampaignsPage';
import ListCampaignsPage from './pages/ListCampaignsPage';
import CreateCampaignsPage from './pages/CreateCapaignsPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  const isAuthenticated = Boolean(localStorage.getItem('token'));
  
  return (
    <Router>
      <Routes>
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/home" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <HomePage />
          </ProtectedRoute>
        } />

        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route path="/email" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <EmailPage />
          </ProtectedRoute>
        } />
        <Route path="/lista-contatos" element={<ListContactsPage />} />
        <Route path="/send-email" element={<SendEmailPage />} />
        <Route path="/campanhas" element={<CampaignsPage />} />
        <Route path='/campanhas/list' element={<ListCampaignsPage />} />
        <Route path="/campanhas/create" element={<CreateCampaignsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
