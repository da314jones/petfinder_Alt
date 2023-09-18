import React, { useState } from 'react';

export default function LocationServices()  {
  const [isLocationEnabled, setLocationEnabled] = useState(true);

  const toggleLocation = () => {
    setLocationEnabled(!isLocationEnabled);
  };

  return (
    <div className="location-services">
      <h2>Location Services</h2>
      <p>Enable or disable location services as needed.</p>
      <label>
        <input
          type="checkbox"
          checked={isLocationEnabled}
          onChange={toggleLocation}
        />{' '}
        Enable Location Services
      </label>
    </div>
  );
};

