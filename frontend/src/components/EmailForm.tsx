import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import '../assets/styles/email.css'; 

function EmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e: React.ChangeEvent<any>) => {
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
    <Container className="my-5" style={{ maxWidth: '600px' }}>
      <div className="email-container">
        <h1 className="text-center mb-4 text-white">Enviar Email</h1>
        <Form onSubmit={handleSendEmail} className="email-form">
          <Form.Group controlId="formEmail">
            <Form.Label className="text-white">Para:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email do destinatário"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>

          <Form.Group controlId="formSubject">
            <Form.Label className="text-white">Assunto:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o assunto"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>

          <Form.Group controlId="formMessage">
            <Form.Label className="text-white">Mensagem:</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="custom-input"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 custom-button">
            Enviar
          </Button>
        </Form>
      </div>
    </Container>

  );
}

export default EmailForm;
