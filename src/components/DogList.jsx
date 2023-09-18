import React, { useEffect, useState } from 'react';
import DogProfile from './DogProfile';

export default function DogList() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('/animals') 
      .then((response) => response.json())
      .then((data) => {
        setDogs(data); 
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
      });
  }, []);

  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogProfile
          key={dog.id}
          name={dog.name}
          breed={dog.breed}
          size={dog.size}
          age={dog.age}
          image={dog.image}
        />
      ))}
    </div>
  );
}
