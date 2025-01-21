import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from 'react-bootstrap';
import Select from 'react-select';

// Definição do tipo das listas de contato
interface ContactList {
  id: number;
  nome: string;
}

function CampanhasForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [contactLists, setContactLists] = useState<string[]>([]); // Array de strings
  const [availableContactLists, setAvailableContactLists] = useState<ContactList[]>([]); // Array tipado
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const response = await fetch('http://localhost:3000/contact-list');
        if (response.ok) {
          const data: ContactList[] = await response.json();
          setAvailableContactLists(data);
        } else {
          console.error('Erro ao buscar listas de contato.');
        }
      } catch (error) {
        console.error('Erro na requisição para listas de contato:', error);
      }
    };

    fetchContactLists();
  }, []);

  const handleContactListChange = (selectedOptions: any) => {
    setContactLists(selectedOptions.map((option: any) => option.value));
  };

  const handleCampaigns = async (e: React.FormEvent) => {
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
        body: JSON.stringify({
          name,
          description,
          contactLists: contactLists.map(Number), 
        }),
      });

      if (response.ok) {
        alert('Campanha criada com sucesso!');
        setName('');
        setDescription('');
        setContactLists([]);
      } else {
        alert('Falha ao criar a campanha.');
      }
    } catch (error) {
      console.error('Erro ao criar a campanha:', error);
    }
  };

  const contactOptions = availableContactLists.map((list) => ({
    value: list.id.toString(), 
    label: list.nome,
  }));

  return (
    <Container className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh' }}>
      <div className="email-card p-4 rounded shadow">
        <h2 className="text-center mb-4">Criar uma nova campanha</h2>
        <Form onSubmit={handleCampaigns}>
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
            <Select
              isMulti
              options={contactOptions}
              value={contactLists.map(id => contactOptions.find(option => option.value === id))}
              onChange={handleContactListChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Enviar
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CampanhasForm;
