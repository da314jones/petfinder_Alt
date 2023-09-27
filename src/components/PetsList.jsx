import React from 'react';
import PetCard from './PetCard';
import { Link } from 'react-router-dom';
import './PetsList.css';

export default function PetList({ pets }) {
  console.log("Received pets:", pets);

  return (
    <div className="pet-list-container">
      <h1>Pets</h1>
      <div className="pet">
      {pets.map((pet) => (
        <Link to={`/pet/${pet.id}`} key={pet.id}>
          <PetCard pet={pet} id={pet.id} />
        </Link>
      ))}
    </div>
    </div>
  );
};
