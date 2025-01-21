import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import '../assets/styles/global.css';
import ListContactsForm from '../components/ListContactsForm';
import ListCampaigns from '../components/ListCampaigns';


function ListCampaignsPage() {
  const navigate = useNavigate(); 

  const handleRedirect = (path: string) => {
    navigate(path);
  };
  
  return (
    <>
    <AppNavbar />
    <ListCampaigns />
    </>

  );
}

export default ListCampaignsPage;
