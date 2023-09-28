import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PetList from './components/PetsList';
import Home from './components/Home';
import NavBar from './components/AppNavbar';
import PetProfile from './components/PetProfile';
import ErrorBoundary from './components/ErrorBoundary';
import UserDashboard from './components/UserDashboard';
import PetAdoptionApplication from './components/PetAdoptionApplication';
import LocationServices from './components/LocationServices'; 
import PetSearchBar from './components/PetSearchBar';
import "./App.css"
import './components/Header.css'

export default function App() {
  const [pets, setPets] = useState([]);
  const [location, setLocation] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleLocationRequest = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    }
  };

  useEffect(() => {
    if (location) {
      console.log("New location set:", location);
    }
  }, [location]);

  useEffect(() => {
    const loadFavoritesFromLocalStorage = () => {
      try {
        const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(favoritesFromStorage);
        console.log('Successfully loaded favorites from Local Storage:', favoritesFromStorage);
      } catch (error) {
        console.error('Error retrieving favorites from local storage:', error);
      }
    };

    loadFavoritesFromLocalStorage();
  }, []);

  const removeFavorite = (petId) => {
    const updatedFavorites = favorites.filter((pet) => pet.id !== petId);
    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  console.log('Favorites:', favorites);


  return (
    <ErrorBoundary>
        <header>
        <AppNavBar />
        <PetSearchBar setPets={setPets} /> 
        <LocationServices location={location} /> 
        </header>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/pet/:id" element={<PetProfile pet={pets} />} />
  <Route path="/userDashboard/:id" element={<UserDashboard favorites={favorites} removeFavorite={removeFavorite} />} />
  <Route path="/petlist" element={<PetList pets={pets} />} />
  <Route path="/adoption" element={<PetAdoptionApplication />} />
</Routes>
    </ErrorBoundary>
  );
}
