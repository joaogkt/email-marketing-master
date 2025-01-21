import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/styles/navbar.css'; 
import React, { useState } from 'react'
import {
  CButton,
  CCollapse,
  CContainer,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarToggler,
  CNavItem,
  CNavLink,
} from '@coreui/react'

const AppNavbar = () => {
  const [visible, setVisible] = useState(false)
  return (
    <CNavbar expand="lg" className="bg-body-tertiary">
      <CContainer fluid>
        <CNavbarBrand href="/home">
          <img
            src="/assets/mail.png"
            alt="Logo email"
            width="36"
            height="36"
          /></CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="me-auto">
            <CNavItem>
              <CNavLink href="/home" active>
                Home
              </CNavLink>
            </CNavItem>
            {/* <CNavItem>
              <CNavLink href="#">Email</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Campanhas</CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">Lista de contatos</CNavLink>
            </CNavItem> */}
            <CDropdown variant="nav-item" popper={false}>
              <CDropdownToggle color="secondary">Administração</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Conta</CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem href="#">Something else here</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CNavItem>
              <CNavLink href="#">
                Logout
              </CNavLink>
            </CNavItem>
          </CNavbarNav>
          <CForm className="d-flex">
            <CFormInput type="search" className="me-2" placeholder="Pesquisar" />
            <CButton type="submit" color="success" variant="outline">
              Pesquisar
            </CButton>
          </CForm>
        </CCollapse>
      </CContainer>
    </CNavbar>
    )
};

export default AppNavbar;
