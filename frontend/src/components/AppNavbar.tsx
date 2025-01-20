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
        <CNavbarBrand href="#">
          <img
            src="/assets/image.png"
            alt="CoreUI Signet"
            width="22"
            height="24"
          /></CNavbarBrand>
        <CNavbarToggler onClick={() => setVisible(!visible)} />
        <CCollapse className="navbar-collapse" visible={visible}>
          <CNavbarNav className="me-auto">
            <CNavItem>
              <CNavLink href="/" active>
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
            <CFormInput type="search" className="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
        </CCollapse>
      </CContainer>
    </CNavbar>
    )
};

export default AppNavbar;
