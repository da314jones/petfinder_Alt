import React, { useState } from 'react';
import { getTokenUrl, getApiUrl } from '../../api/fetch';
import { getApiKey, getApiSecret } from '../../api/api';
import './DogSearch.css'

export default function DogSearch() {
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    getAccessToken()
      .then((accessToken) => getAnimals(accessToken))
      .then((response) => setAnimals(response))
      .catch((error) => console.error('Error fetching animals:', error))
      .finally(() => setLoading(false));
  };

  const getAccessToken = async () => {
    const apiKey = getApiKey();
    const apiSecret = getApiSecret();

    const tokenUrl = getTokenUrl();
    const requestBody = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`;

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    });
    const data = await response.json();
    return data.access_token;
  };

  const getAnimals = async (accessToken) => {
    const apiUrlValue = getApiUrl();
    const apiUrlWithParameters = `${apiUrlValue}?type=dog&page=1&limit=20&breed=${breed}&size=${size}&age=${age}`;

    const response = await fetch(apiUrlWithParameters, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.animals;
  };

  return (
    <div className='search'>
      <h2>Find Your Perfect Dog</h2>
      <label>
        Breed:
        <input type='text' value={breed} onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Size:
        <input type='text' value={size} onChange={(e) => setSize(e.target.value)} />
      </label>
      <label>
        Age:
        <input type='text' value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>

    
      {animals.length > 0 && (
        <div>
          <h3>Fetched Animals:</h3>
          <ul>
            {animals.map((animal) => (
              <li key={animal.id}>
                <strong>Name:</strong> {animal.name}<br />
                <strong>Species:</strong> {animal.species}<br />
                <strong>Breed:</strong> {animal.breeds.primary}<br />
                <strong>Age:</strong> {animal.age}<br />
                <strong>Gender:</strong> {animal.gender}<br />
              
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
