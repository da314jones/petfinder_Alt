import React, { useEffect, useState } from 'react';
import PetCard from './PetCard';
import PetAdoptionApplication from './PetAdoptionApplication';
import LocationServices from './LocationServices';
import './UserDashboard.css'

export default function Dashboard() {
  const [favorites, setFavorites] = useState([]);
  const [applications, setApplications] = useState({});
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedApplications = localStorage.getItem('applications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    }
  }, []);

  const handleSubmitApplication = (petId, applicationData) => {
    setApplications({
      ...applications,
      [petId]: applicationData,
    });
  };

  const handleRemoveFavorite = (petId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== petId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="dashboard">
     <div className='title'> <h1>Dashboard</h1></div>

     <div className='secondary-title'>       <h2>Favorites with Application</h2>
</div>
      {favorites.length === 0 ? (
        <p>No favorite pets yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((fav) => (
            <div key={fav.id}>
              <PetCard pet={fav} />
              <PetAdoptionApplication
                petId={fav.id}
                existingApplication={applications[fav.id]}
                onSubmit={(applicationData) =>
                  handleSubmitApplication(fav.id, applicationData)
                }
              />
              <button className="remove-fav" onClick={() => handleRemoveFavorite(fav.id)} >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
