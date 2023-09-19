import React from "react";
import "./charity.css"

const CharityDonations = () => {
  const shelters = [
    /*fill with shelter list*/
  ];

  return (
    <div className="charity-donations">
      <h2>Support Local Shelters</h2>
      <p>Choose a shelter to donate or volunteer:</p>
      <ul>
        {shelters.map((shelter) => (
          <li key={shelter.id}>
            <a
              href={shelter.donationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shelter.name}
            </a>
            - {shelter.location}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharityDonations;
