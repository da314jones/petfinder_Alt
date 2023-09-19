import React, { useEffect, useState } from 'react';
import { getAnimals } from '../api/petfinder_api';

function App() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    // Function to fetch animals and handle token expiration
    async function fetchAnimalsWithToken() {
      try {
        const data = await getAnimals();
        setAnimals(data.animals);
      } catch (error) {
        console.error('Error:', error);

        // If the error is due to an expired token, fetch a new token and try again
        if (error.response && error.response.status === 401) {
          await getAnimals(); // Fetch a new token
          fetchAnimalsWithToken(); // Retry fetching animals
        }
      }
    }

    fetchAnimalsWithToken();
  }, []);

  return (
    <div>
      <h1>Animals</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>{animal.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
