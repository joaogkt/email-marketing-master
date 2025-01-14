import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmailPage from './pages/EmailPage';
import './App.css';
import './assets/styles/global.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/send-email" element={<EmailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
