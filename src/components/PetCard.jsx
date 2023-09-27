import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default function PetCard({ pet }) {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <div>Type: {pet.type}</div>
            <div>Species: {pet.species}</div>
            <div>Status: {pet.status}</div>
            <div>Age: {pet.age}</div>
            <div>Gender: {pet.gender}</div> 
            <div>Size: {pet.size}</div>
            <div>Main Breed: {pet.breeds?.primary}</div>
            <div>Coat: {pet.coat || 'Unknown'}</div>
          </Card.Text>
          <Button variant="primary" onClick={toggleShowMore}>
            {showMore ? 'Hide' : 'Show Details'}
          </Button>
        </Card.Body>
      </Card>

      {showMore && (
        <Card style={{ width: '18rem', marginTop: '1rem' }}>
          <Card.Body>
            <Card.Title>Additional Information</Card.Title>
            <Card.Text>
              <a href={pet.url} target="_blank" rel="noopener noreferrer">Sponsor Me</a>
              <h3>Pet care essentials</h3>
              <ul>
                <li>Spayed/Neutered: {String(pet.attributes?.spayed_neutered)}</li>
                <li>House Trained: {String(pet.attributes?.house_trained)}</li>
                <li>Declawed: {String(pet.attributes?.declawed)}</li>
                <li>Special Needs: {String(pet.attributes?.special_needs)}</li>
                <li>Shots Current: {String(pet.attributes?.shots_current)}</li>
              </ul>
              <h3>Good in a home with</h3>
              <ul>
                <li>Children: {String(pet.environment?.children) || 'Unknown'}</li>
                <li>Dogs: {String(pet.environment?.dogs) || 'Unknown'}</li>
                <li>Cats: {String(pet.environment?.cats) || 'Unknown'}</li>
              </ul>
              <Link to={`/apply/${pet.id}`}>
                <Button variant="primary">Apply for Adoption</Button>
              </Link>
              <h3>Contact Information</h3>
              <ul>
                <li>Email: {pet.contact?.email}</li>
                <li>Phone: {pet.contact?.phone}</li>
                <li>Address: {`${pet.contact?.address?.city}, ${pet.contact?.address?.state}, ${pet.contact?.address?.postcode}, ${pet.contact?.address?.country}`}</li>
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
