import { useState } from 'react';
import '../assets/styles/email.css';

function EmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Token de autenticação não encontrado. Por favor, faça login novamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ to, subject, message }),
      });

      if (response.ok) {
        alert('Email enviado com sucesso!');
      } else {
        alert('Falha ao enviar o email.');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  return (
    <form onSubmit={handleSendEmail} className="email-form">
      <div className="email-container">
        <h1>Enviar Email</h1>
        
        <label>
          Para:
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            placeholder="Digite o e-mail do destinatário"
          />
        </label>
        
        <label>
          Assunto:
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            placeholder="Assunto do e-mail"
          />
        </label>
        
        <label>
          Mensagem:
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            placeholder="Digite a sua mensagem"
          />
        </label>
        
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </div>
    </form>
  );
}

export default EmailForm;
