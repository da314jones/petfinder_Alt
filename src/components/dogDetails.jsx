import React from 'react';

export default function DogDetails({ dog }) {
  return (
    <div className="dog-details">
      <h2>{dog.name}</h2>
      <img src={dog.image} alt={dog.name} />
      <p>Breed: {dog.breed}</p>
      <p>Size: {dog.size}</p>
      <p>Age: {dog.age}</p>
      <p>Temperament: {dog.temperament}</p>
      <p>Medical History: {dog.medicalHistory}</p>
      <p>Special Needs: {dog.specialNeeds}</p>
      <p>Adoption Fee: ${dog.adoptionFee}</p>
      
    </div>
  );
};

