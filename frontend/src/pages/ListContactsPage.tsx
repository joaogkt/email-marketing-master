import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';


interface ContactList {
    id: number;
    nome: string;
    company_id: string;
  }
  

function ListContactsPage() {
  const navigate = useNavigate();
  const [listName, setListName] = useState('');
  const [contactLists, setContactLists] = useState<ContactList[]>([]); 
  const [companyId] = useState('2');

  useEffect(() => {
    const fetchContactLists = async () => {
      try {
        const response = await fetch(`/api/contact-lists?company_id=${companyId}`);
        const data = await response.json();
        setContactLists(data);
      } catch (error) {
        console.error('Error fetching contact lists:', error);
      }
    };
    fetchContactLists();
  }, [companyId]);

  const handleCreateContactList = async () => {
    if (!listName.trim()) return;

    try {
      const response = await fetch('/api/contact-list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: listName,
          company_id: companyId,
        }),
      });

      if (response.ok) {
        const newList = await response.json();
        setContactLists(prevLists => [...prevLists, newList]);
        setListName('');
      } else {
        alert('Erro ao criar lista de contatos');
      }
    } catch (error) {
      console.error('Error creating contact list:', error);
    }
  };

  return (
    <>
      <div className="home-page">
        <AppNavbar />
      </div>
      <div className="modules-container">
        <div className="module">
          <h2>Gerenciar Lista de Contatos</h2>
          <p>Crie e gerencie suas listas de contatos.</p>
          <div className="create-list">
            <input
              type="text"
              placeholder="Nome da nova lista"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
            <button className="module-button" onClick={handleCreateContactList}>
              Criar Lista
            </button>
          </div>
        </div>

        <div className="module">
          <h2>Listas de Contatos</h2>
          <p>Veja suas listas de contatos criadas.</p>
          {contactLists.length === 0 ? (
            <p>Você ainda não criou nenhuma lista de contatos.</p>
          ) : (
            <ul>
              {contactLists.map((list) => (
                <li key={list.id}>
                  {list.nome} - <button onClick={() => navigate(`/contact-list/${list.id}`)}>Ver Lista</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default ListContactsPage;
