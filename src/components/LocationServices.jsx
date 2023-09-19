import React, { useState, useEffect } from 'react';

export default function LocationServices() {
  const [isLocationEnabled, setLocationEnabled] = useState(false);
  const [locationOptions, setLocationOptions] = useState({
    enableHighAccuracy: false,
  });

  // Define the userLocation state and setter function
  const [userLocation, setUserLocation] = useState(null);

  const toggleLocation = () => {
    if (!isLocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      setUserLocation(null);
    }
    setLocationEnabled(!isLocationEnabled);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      setLocationEnabled(true);
    } else {
      setLocationEnabled(false);
    }
  }, []);

  const handleOptionsChange = (event) => {
    const { name, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : event.target.value;

    setLocationOptions({
      ...locationOptions,
      [name]: newValue,
    });
  };

  return (
    <div className="location-services">
      <h2>Location Services</h2>
      <p>Enable or disable geolocation services and configure options.</p>
      <label>
        <input
          type="checkbox"
          name="isLocationEnabled"
          checked={isLocationEnabled}
          onChange={toggleLocation}
        />{' '}
        Enable Geolocation
      </label>

      {isLocationEnabled && (
        <div>
          <h3>Geolocation Options</h3>
          <label>
            <input
              type="checkbox"
              name="enableHighAccuracy"
              checked={locationOptions.enableHighAccuracy}
              onChange={handleOptionsChange}
            />{' '}
            Enable High Accuracy (GPS)
          </label>
        </div>
      )}

      {userLocation && (
        <div>
          <h3>User Location</h3>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
    </div>
  );
}
