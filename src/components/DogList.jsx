import React, { useEffect, useState } from 'react';
import DogProfile from './DogProfile';

export default function DogList({ animals}) {
  const [dogs, setDogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/animals')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); 
      })
      .then((data) => {
        console.log(data);
        try {
          const jsonData = JSON.parse(data);
          setDogs(jsonData);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          setError('Error parsing JSON. Please check the response format.');
        }
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
      {animals.map((animal) => (
        <DogProfile
          key={animal.id}
          name={animal.name}
          breed={animal.breed}
          size={animal.size}
          age={animal.age}
          image={animal.image}
        />
      ))}
    </div>
  );
}
