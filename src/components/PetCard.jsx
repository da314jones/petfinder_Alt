import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import './PetCard.css'

export default function PetCard({ pet, id }) {
  const [showMore, setShowMore] = useState(false);

  const addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(pet);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <>
      <Card className="container">
        <Card.Img src={pet.photos.small} />
        <Card.Body>
          <Card.Title>{pet.name}</Card.Title>
          <Card.Text>
            <div>Type: {pet.type}</div>
            <div>Status: {pet.status}</div>
            <div>Age: {pet.age}</div>
            <div>Gender: {pet.gender}</div>
            <div>Size: {pet.age}</div>
            <div>Main Breed: {pet.breeds?.primary}</div>
          </Card.Text>
          <Button variant="success" style={{ backgroundColor: '#007bff' }}className="pet-card-Button" onClick={addToFavorites}>Add</Button>
        </Card.Body>
      </Card>
    </>
  );
}
