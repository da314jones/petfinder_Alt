import React, { useState, useEffect } from 'react';

export default function LocationServices() {
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
    <div className="location-services">
      <p>Enable or disable geolocation services.</p>
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
    </div>
  );
}
