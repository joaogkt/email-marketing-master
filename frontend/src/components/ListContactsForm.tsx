import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';


function ListContactsForm() {
    const [nome, setNome] = useState('');
    const [company_id, setCompany_id] = useState('');
    const navigate = useNavigate(); 
  


    const handleCampaings = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        if (!token) {
          alert('Token de autenticação não encontrado. Por favor, faça login novamente.');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:3000/contact-list', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ nome, company_id }),
          });

    
          if (response.ok) {
            alert('Lista de contatos criada com sucesso!');
            setNome('');
            setCompany_id('');
          } else {
            alert('Falha ao criar lista de contatos.');
          }
        } catch (error) {
          console.error('Erro ao criar lista de contatos:', error);
        }
      };
  
  
    return (
        <>
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
          <div className="email-card p-4 rounded shadow">
            <h2 className="text-center mb-4">Criar uma nova lista de contato</h2>
            <Form onSubmit={handleCampaings}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da lista de contato"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Form.Group controlId="formSubject" className="mb-3">
                <Form.Label>ID da empresa:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o id da empresa"
                  value={company_id}
                  onChange={(e) => setCompany_id(e.target.value)}
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

    )

}

export default ListContactsForm;