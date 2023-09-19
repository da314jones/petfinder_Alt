import React from 'react';
import { useState, useEffect } from 'react';

export default function DogProfile({ dog, isSelected, onDogSelect }) {
    const [tagIndex, setTagIndex] = useState(0);
    const [attributeIndex, setAttributeIndex] = useState(0);
    const [environmentIndex, setEnvironmentIndex] = useState(0);

    useEffect(() => {
        const tagIntervalId = setInterval(() => {
          setTagIndex((prevIndex) =>
            prevIndex === dog.tags.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
    
        const environmentIntervalId = setInterval(() => {
          setEnvironmentIndex((prevIndex) =>
            prevIndex === dog.environment.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
    
        const attributeIntervalId = setInterval(() => {
          setAttributeIndex((prevIndex) =>
            prevIndex === dog.attributes.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
    
        return () => {
          clearInterval(tagIntervalId);
          clearInterval(environmentIntervalId);
          clearInterval(attributeIntervalId);
        };
      }, [dog.tags, dog.environment, dog.attributes]);

  const handleSelectClick = () => {
    onDogSelect(dog.id);
  };

  return (
    <div className={`profile-card ${isSelected ? 'selected' : ''}`}>
      <img src={dog.photos[0]?.small} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>Species: {dog.species}</p>
      <p>Age: {dog.age}</p>
      <p>Breed: {dog.breeds.primary}</p>
      <p>Description: {dog.description}</p>
      <h3>Attributes:</h3>
      <p>{dog.attributes[attributeIndex]}</p>
      <h3>Environment:</h3>
      <p>{dog.environment[environmentIndex]}</p>
    <button onClick={handleSelectClick}>
        {isSelected ? 'Deselect' : 'Select'}
      </button>
    </div>
  );
}