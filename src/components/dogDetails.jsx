import React from 'react';

export default function PetDetails({ pet }) {
    

    

  return (
    <div className="pet-details">
      <h2>Pet Details</h2>
      <img src={pet.photos[0]?.large} alt={pet.name} />
      <h3>{pet.name}</h3>
      <h3>Tags:</h3>
      <p>{pet.tags[tagIndex]}</p>
          <p>Species: {pet.species}</p>
      <p>Age: {pet.age}</p>
      <p>Breed: {pet.breeds.primary}</p>
      <p>Description: {pet.description}</p>
      {pet.videos.length > 0 && (
        <div>
          <h3>Videos</h3>
          <ul>
            {pet.videos.map((video, index) => (
              <li key={index}>
                <a href={video}>{`Video ${index + 1}`}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <h3>Contact</h3>
      <p>Email: {pet.contact.email}</p>
      <h3>Organization</h3>
      <p>Organization ID: {pet.organization_id}</p>
      </div>
  );
}