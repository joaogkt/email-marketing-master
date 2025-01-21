import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import { describe } from 'node:test';


function CampanhasForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [contactLists, setContactLists] = useState('');
    const navigate = useNavigate(); 
  


    const handleCampaings = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
    
        if (!token) {
          alert('Token de autenticação não encontrado. Por favor, faça login novamente.');
          return;
        }
    
        try {
          const response = await fetch('http://localhost:3000/campaigns', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, description, contactLists }),
          });

    
          if (response.ok) {
            alert('Campanha criada com sucesso!');
            setName('');
            setDescription('');
            setContactLists('');
          } else {
            alert('Falha ao criar a campanha.');
          }
        } catch (error) {
          console.error('Erro ao criar a campanha:', error);
        }
      };
  
  
    return (
        <>
        <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
          <div className="email-card p-4 rounded shadow">
            <h2 className="text-center mb-4">Criar uma nova campanha</h2>
            <Form onSubmit={handleCampaings}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome da campanha"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Form.Group controlId="formSubject" className="mb-3">
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite a descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
    
              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Lista de contato:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Contact list"
                  value={contactLists}
                  onChange={(e) => setContactLists(e.target.value)}
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

export default CampanhasForm;