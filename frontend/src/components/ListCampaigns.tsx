import React, { useState, useEffect } from 'react';
import { Container, Card, Button, ListGroup, Badge, Row, Col } from 'react-bootstrap';
import '../assets/styles/listCampaigns.css'; // Arquivo CSS separado

interface ContactList {
  id: number;
  nome: string;
  data_cadastro: string;
}

interface Campaign {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  contactLists: ContactList[];
}

function ListCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3000/campaigns');
        const data = await response.json();
        setCampaigns(data);
      } catch (error) {
        console.error('Erro ao buscar campanhas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Carregando campanhas...</div>;
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Lista de Campanhas</h2>
      {campaigns.length === 0 ? (
        <p className="text-center">Nenhuma campanha cadastrada.</p>
      ) : (
        <Row xs={1} sm={2} md={3} className="g-4">
          {campaigns.map((campaign) => (
            <Col key={campaign.id}>
              <Card className="h-100 card-hover">
                <Card.Body className="d-flex flex-column justify-content-between">
                  <div>
                    <Card.Title className="d-flex justify-content-between align-items-center">
                      <span>{campaign.name}</span>
                      <Badge bg="secondary">ID: {campaign.id}</Badge>
                    </Card.Title>
                    <Card.Text>
                      <strong>Descrição:</strong> {campaign.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Criada em:</strong>{' '}
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">
                      Listas de Contato
                    </Card.Subtitle>
                    {campaign.contactLists.length > 0 ? (
                      <ListGroup className="mb-3">
                        {campaign.contactLists.map((list) => (
                          <ListGroup.Item key={list.id}>
                            <div className="d-flex justify-content-between align-items-center">
                              <span>{list.nome}</span>
                              <small>
                                <em>
                                  Cadastrada em:{' '}
                                  {new Date(list.data_cadastro).toLocaleDateString()}
                                </em>
                              </small>
                            </div>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    ) : (
                      <p>Não há listas de contato associadas.</p>
                    )}
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" className="me-2">
                      Editar
                    </Button>
                    <Button variant="danger">Excluir</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default ListCampaigns;
