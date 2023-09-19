import React, { useEffect, useState } from 'react';
import DogProfile from './DogProfile';
import { getAnimals } from '../../api/petfinder_api';

export default function DogList({ userLocation }) {
  const [dogs, setDogs] = useState([]);
  const [selectedDogIds, setSelectedDogIds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAnimalsWithToken() {
      try {
        let params = {};

        if (userLocation) {
          params = {
            ...params,
            location: `${userLocation.latitude},${userLocation.longitude}`,
          };
        }

        const data = await getAnimals(params);
        setDogs(data.animals);
        setSelectedDogIds([]);
      } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 401) {
          await getAnimals();
          fetchAnimalsWithToken();
        }
      }
    }

    fetchAnimalsWithToken();
  }, [userLocation]);

  const handleDogSelect = (dogId) => {
    if (selectedDogIds.includes(dogId)) {
      setSelectedDogIds((prevSelectedDogIds) =>
        prevSelectedDogIds.filter((id) => id !== dogId)
      );
    } else {
      setSelectedDogIds((prevSelectedDogIds) => [...prevSelectedDogIds, dogId]);
    }
  };

  if (error) {
    return <div className="error">{error}</div>;
  }

  const selectedDogs = dogs.filter((dog) => selectedDogIds.includes(dog.id));

  return (
    <div className="dog-list">
      {selectedDogs.length > 0 && (
        <div>
          <h2>Selected Pets</h2>
          <ul>
            {selectedDogs.map((selectedDog) => (
              <li key={selectedDog.id}>
                <img src={selectedDog.photos[0]?.small} alt={selectedDog.name} />
                {selectedDog.species}: {selectedDog.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2>Pet List</h2>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <DogProfile
              dog={dog}
              isSelected={selectedDogIds.includes(dog.id)}
              onDogSelect={handleDogSelect}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
