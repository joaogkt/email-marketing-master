import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmailPage from './pages/EmailPage';
import './App.css';
import './assets/styles/global.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ListContactsPage from './pages/ListContactsPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path="/send-email" element={<EmailPage />} />
        <Route path="/lista-contatos" element={<ListContactsPage />} />

      </Routes>
    </Router>
  );
}

export default App;
