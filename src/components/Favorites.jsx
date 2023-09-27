import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import PetAdoptionApplication from './PetAdoptionApplication';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedPets, setSelectedPets] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState({});

  useEffect(() => {
    console.log('Favorites useEffect for loading data from Local Storage.');
    const loadFromLocalStorage = () => {
      try {
        const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
        const applicationsFromStorage = JSON.parse(localStorage.getItem('applications')) || {};
        setFavorites(favoritesFromStorage);
        setApplications(applicationsFromStorage);
        console.log('Successfully loaded data from Local Storage.');
      } catch (error) {
        console.error('Error retrieving data from local storage:', error);
      }
    };

    loadFromLocalStorage();
  }, []);

  useEffect(() => {
    console.log('Favorites useEffect for saving data to Local Storage.');
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('applications', JSON.stringify(applications));
    console.log('Successfully saved data to Local Storage.');
  }, [favorites, applications]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const removeFavorite = (petId) => {
    console.log(`Removing favorite pet with ID: ${petId}`);
    const updatedFavorites = favorites.filter((pet) => pet.id !== petId);
    setFavorites(updatedFavorites);
  };

  const removeSelectedFavorites = () => {
    console.log('Removing selected favorite pets.');
    const updatedFavorites = favorites.filter(
      (pet) => !selectedPets.has(pet.id)
    );
    setFavorites(updatedFavorites);
  };

  const handleSubmitApplication = (petId, applicationData) => {
    console.log(`Handling adoption application submission for pet ID: ${petId}`);
    setApplications({
      ...applications,
      [petId]: applicationData,
    });
  };

  console.log('Rendering Favorites component.');

  return (
    <div>
      <h2>Favorites</h2>
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {favorites.length === 0 ? (
        <p>No favorite pets yet.</p>
      ) : (
        <div className="pet-list">
          {favorites.map((pet) => (
            <div key={pet.id}>
              <input
                type="checkbox"
                checked={selectedPets.has(pet.id)}
                onChange={() => {
                  const newSet = new Set(selectedPets);
                  if (selectedPets.has(pet.id)) {
                    newSet.delete(pet.id);
                  } else {
                    newSet.add(pet.id);
                  }
                  setSelectedPets(newSet);
                }}
              />
              <PetCard pet={pet} />
              <button className='remove' onClick={() => removeFavorite(pet.id)}>Remove</button>
              <PetAdoptionApplication
                petId={pet.id}
                existingApplication={applications[pet.id]}
                onSubmit={(applicationData) =>
                  handleSubmitApplication(pet.id, applicationData)
                }
              />
            </div>
          ))}
        </div>
      )}
      <button className="group-removal" onClick={removeSelectedFavorites}>Group Removal</button>
    </div>
  );
}
