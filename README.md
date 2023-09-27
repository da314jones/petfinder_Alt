# PetPal - Your Ultimate Furry Companion Finder 🐾

Welcome to PetPal, the app that's paws-itively perfect for finding your next furry friend. Whether you're a cat person, a dog lover, or even a hedgehog enthusiast (we don't judge), PetPal has got you covered. Let's embark on this pet-tastic journey together!

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [How to Use](#how-to-use)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- A heart full of love for our four-legged (or no-legged) companions.
- An internet connection (because we're not sending pets by snail mail).
- A device with a web browser.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/PetPal.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd PetPal
   ```

3. **Install Dependencies**

   ```bash
   npm install
   ```

4. **Start the App**

   ```bash
   npm start
   ```

5. **Open Your Browser**

   - Go to [http://localhost:3000](http://localhost:3000)
   - Get ready to meet some adorable pets!

## Features

### 1. Pet Profile Selector 🐶🐱

   - Click on a pet's profile to select it.
   - But beware of duplicates; even pets can't stand copycats!

### 2. Favorites List ❤️

   - Add your chosen furballs to your favorites list.
   - It's like creating a dating profile, but for your future pet.

### 3. Pending Adoption 🏠

   - Keep track of the pets you're considering adopting.
   - It's the virtual equivalent of sleeping on it.

### 4. Adoption Form 📋

   - Fill out an adoption form with your details.
   - Because pets need to know where their forever home is!

## How to Use

1. **Browse the Pets**

   - Start by browsing the available pets.
   - Click on their profiles to get to know them better.

2. **Select Your Favorites**

   - Select your favorite pets.
   - Just remember, pets are not Pokémon; you can't catch 'em all!

3. **Save to Favorites**

   - Click the "Save to Favorites" button to keep track of your top picks.
   - It's like creating a wish list for your future cuddle buddies.

4. **Adoption Form**

   - Ready to take the plunge?
   - Fill out the adoption form and get one step closer to pet parenthood.

## Contributing

We welcome contributions from fellow animal lovers! If you have any ideas for improving PetPal or want to report issues, feel free to:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Create a pull request.

We promise not to bite! 🐕🐈

## License



Thanks for choosing PetPal! We hope you find your perfect pet companion and make a lifetime of memories together. If you have any questions or need assistance, don't hesitate to reach out. Happy pet hunting! 🐶🐾🐱












import React, { useState, useEffect } from "react";
import { getAnimals } from "../../api/petfinder_api";
import PetProfile from "./PetProfile";
import Notification from "./Notifications";
import PetDetails from "./PetDetails";

export default function PetList() {
  const [animals, setAnimals] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleProfileClick = (profile) => {
    const isProfileSelected = selectedProfiles.some(
      (selected) => selected.id === profile.id
    );

    if (!isProfileSelected) {
      setSelectedProfiles((prevSelected) => [
        ...prevSelected,
        { ...profile, petID: profile.id },
      ]);
    }
  };

  const saveFavorites = () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([...selectedProfiles])
    );
    setSelectedProfiles([]);

    if (selectedProfiles.length > 0) {
      const petNames = selectedProfiles
        .map((profile) => profile.name)
        .join(", ");
      const newNotificationMessage = `${petNames} have been added to favorites.`;
      setNotificationMessage(newNotificationMessage);
      setShowNotification(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call using getAnimals function
        const response = await getAnimals();

        // Check if the response contains animals data
        if (response && response.animals) {
          setAnimals(response.animals);
        } else {
          console.error("API response does not contain animals data.");
        }
      } catch (error) {
        console.error("Error fetching animals:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showNotification) {
      const timeoutId = setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [showNotification]);

  return (
    <div className="pet-list">
      <button onClick={saveFavorites}>Save Selected as Favorites</button>
      {animals.length === 0 ? (
        <p>No pets available.</p>
      ) : (
        animals.map((animal) => (
          <div key={animal.id}>
            <PetProfile
              pet={animal}
              isSelected={selectedProfiles.some((selected) => selected.id === animal.id)}
              onPetSelect={() => handleProfileClick(animal)}
            />
            <PetDetails
              details={animal}
              isSelected={selectedProfiles.some((selected) => selected.id === animal.id)}
              onPetSelect={() => handleProfileClick(animal)}
            />
          </div>
        ))
      )}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}








