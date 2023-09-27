import React from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';
import LocationServices from './LocationServices';

export default function AppNavbar({ onSearch }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form >          
          <LocationServices />
          </Form>
          <LocationServices />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
