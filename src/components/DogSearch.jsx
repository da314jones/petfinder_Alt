import React, { useState } from 'react';

export default function DogSearch({ onSearch }) {
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');

  const handleSearch = () => {
    onSearch({ breed, size, age });
  };

  return (
    <div>
      <h2>Find Your Perfect Dog</h2>
      <label>
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </label>
      <label>
        Size:
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </label>
      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

