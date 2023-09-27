import React, { useState } from 'react';
import { getAnimals } from '../../api/petfinder_api';

export default function SearchBar({ setPets }) {
  const [query, setQuery] = useState({
    type: '',
    breed: '',
    size: '',
    gender: '',
    age: '',
  });

  const handleSearch = async () => {
    try {
      const result = await getAnimals(query);
      setPets(result.animals);
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  };

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={query.type}
        onChange={handleChange}
      />
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={query.breed}
        onChange={handleChange}
      />
      {/* Add more input fields for other parameters here */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
