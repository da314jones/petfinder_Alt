import React, { useState } from 'react';
import { getAnimals } from '../../api/petfinder_api';  
import { useNavigate } from 'react-router-dom';
import './PetSearchBar.css'

export default function PetSearchBar({ setPets }) {
  const [query, setQuery] = useState({
    type: '',
    breed: '',
  });


  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const result = await getAnimals(query);
      setPets(result.animals);
      navigate('/petlist')
    } catch (error) {
      console.error('An error occurred while fetching the data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({
      ...query,
      [name]: value,
    });
  };

  function handleKeyDown(e) {
    if (e.key === "Enter") {
handleSearch()      
    }
  }

  return (
    <div className='search-container'>
    <div className='type'>
      <input
        type="text"
        name="type"
        placeholder="Type"
        value={query.type}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      </div>
      <div className='breed'>
      <input
        type="text"
        name="breed"
        placeholder="Breed"
        value={query.breed}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      </div>
      <div className='button'>
      <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
