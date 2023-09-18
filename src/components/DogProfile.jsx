import React from 'react';

export default function DogProfile({ name, breed, size, age, image }) {
  return (
    <div className="profile-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>Breed: {breed}</p>
      <p>Size: {size}</p>
      <p>Age: {age}</p>
    </div>
  );
};

