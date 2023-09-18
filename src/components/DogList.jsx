import React from 'react';
import DogProfile from './DogProfile';

export default funciton DogList({ dogs }) {
  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogProfile
          key={dog.id} 
          name={dog.name}
          breed={dog.breed}
          size={dog.size}
          age={dog.age}
          image={dog.image}
        />
      ))}
    </div>
  );
};

