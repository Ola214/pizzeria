import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <Navbar bg="light" expand="md" className="rounded my-3 shadow-sm">
    <Container>
      <Navbar.Brand as={NavLink} to="/">Pizzeria</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default NavBar;
