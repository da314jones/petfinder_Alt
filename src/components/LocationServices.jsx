import React, { useState, useEffect } from 'react';
import './LocationServices.css'

export default function LocationServices({ setLocation }) {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [locationOptions, setLocationOptions] = useState({
    enableHighAccuracy: false,
    maximumAge: 0,
    timeout: Infinity,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      setLocationEnabled(true);
    } else {
      setLocationEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (isLocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error(error);
        },
        locationOptions
      );
    }
  }, [isLocationEnabled, locationOptions, setLocation]);

  const toggleLocation = () => {
    setLocationEnabled(!isLocationEnabled);
  };

  const handleOptionsChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    setLocationOptions({
      ...locationOptions,
      [name]: newValue,
    });
  };

  return (
    <div className="geo-container">
      <p>Geolocation services.</p>
      <label>
        <input
          type="checkbox"
          name="isLocationEnabled"
          checked={isLocationEnabled}
          onChange={toggleLocation}
        />{' '}
        Enable
      </label>
    </div>
  );
}
