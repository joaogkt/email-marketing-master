import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import '../assets/styles/email.css'; 

function EmailForm() {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = async (e: React.FormEvent) => {
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
        setTo('');
        setSubject('');
        setMessage('');
      } else {
        alert('Falha ao enviar o email.');
      }
    } catch (error) {
      console.error('Erro ao enviar email:', error);
    }
  };

  return (
    <>
    <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
      <div className="email-card p-4 rounded shadow">
        <h2 className="text-center mb-4">Enviar Email</h2>
        <Form onSubmit={handleSendEmail}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Para:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite o email do destinatário"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formSubject" className="mb-3">
            <Form.Label>Assunto:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o assunto"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formMessage" className="mb-3">
            <Form.Label>Mensagem:</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Digite sua mensagem"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      </div>
    </Container>
    </>
  );
}

export default EmailForm;