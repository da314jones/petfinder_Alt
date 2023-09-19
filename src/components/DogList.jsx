import React, { useEffect, useState } from 'react';
import DogProfile from './DogProfile';

export default function DogList() {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/animals')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setDogs(data);
      })
      .catch((error) => {
        console.error('Error fetching animals:', error);
        setError('Error fetching animals. Please try again later.'); 
      });
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

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
