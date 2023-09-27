import React, { useEffect, useState } from 'react';

export default function PendingApplications() {
  const [pendingApps, setPendingApps] = useState([]);

  useEffect(() => {
    const keys = Object.keys(localStorage).filter((key) => key.startsWith('pending-'));
    const pendingData = keys.map((key) => JSON.parse(localStorage.getItem(key)));
    setPendingApps(pendingData);
  }, []);

  const removeApplication = (petId) => {
    localStorage.removeItem(`pending-${petId}`);
    setPendingApps(pendingApps.filter((app) => app.id !== petId));
  };

  return (
    <div>
      <h2>Pending Applications</h2>
      {pendingApps.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <ul>
          {pendingApps.map((app, index) => (
            <li key={index}>
              Application for {app.name}{' '}
              <button onClick={() => removeApplication(app.id)}>Cancel</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
