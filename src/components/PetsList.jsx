import React from 'react';
import PetCard from './PetCard';
import AppNavbar from './Navbar';

export default function PetList({ pets, onView }) {
  return (
    <div className="pet-list">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onView={onView} />
      ))}
      
     
    </div>
  );
};


