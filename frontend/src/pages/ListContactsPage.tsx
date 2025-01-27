import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import ListContactsForm from '../components/ListContactsForm';


function ListContactsPage() {
  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
  };
  
  return (
    <>
    <AppNavbar />
    <ListContactsForm />
    </>

  );
}

export default ListContactsPage;
