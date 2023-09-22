import React from 'react';
import  Card  from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup  from 'react-bootstrap/ListGroup';

export default function PetProfile({ pet, isSelected, onPetSelect }) {
  const imageSrc = pet.primary_photo_cropped?.small || '';

  const handleSelectClick = () => {
    onPetSelect(pet);
  };

  return (
    <Card className={`profile-card ${isSelected ? 'selected' : ''}`}>
      <Card.Title>{pet.name}</Card.Title>
      {Card.Img && <img src={imageSrc} alt={pet.name} />}
      <Card.Body>
      <ListGroup>
      <ListGroup.Item>
        <strong>Status:</strong> {pet.status}
      </ListGroup.Item>
      <ListGroup.Item>Type: {pet.species}</ListGroup.Item>
      <ListGroup.Item>Breed: {pet.breed}</ListGroup.Item>
      <ListGroup.Item>Size: {pet.size}</ListGroup.Item>
      <ListGroup.Item>Age: {pet.age}</ListGroup.Item>
      <ListGroup.Item>Description: {pet.description}</ListGroup.Item>
      <ListGroup.Item>
  <Card.Link
    href={pet.url}
    onClick={(e) => {
      if (!window.confirm("You are now leaving the current website. Click OK to continue or Cancel to stay.")) {
        e.preventDefault();
      }
    }}
  >
     Sponsor this pet
  </Card.Link>
</ListGroup.Item>
      <ListGroup.Item>Attributes: {pet.attributes ? JSON.stringify(pet.attributes) : 'N/A'}</ListGroup.Item>
      <ListGroup.Item>Environment: {pet.environment ? JSON.stringify(pet.environment) : 'N/A'}</ListGroup.Item>
      </ListGroup>
      <Button onClick={handleSelectClick}>
        {isSelected ? 'Deselect' : 'Select'}
      </Button>
      </Card.Body>
    </Card>
  );
}
