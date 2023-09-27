// App.js
import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import PetList from './components/PetsList';
import PetSearchBar from './components/PetSearchBar'; 

export default function App() {
  const [pets, setPets] = useState([]);

  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>PetFinder</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <PetSearchBar setPets={setPets} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1>Pet List</h1>
        <PetList pets={pets} />
      </Container>
    </div>
  );
}


