import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPetById } from "../../api/petfinder_api";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./PetProfile.css";

export default function PetProfile() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const fetchedPet = await getPetById(id);
        console.log("Fetched pet:", fetchedPet); // Debugging line

        setPet(fetchedPet.animal);
      } catch (error) {
        console.error("Error fetching the pet:", error);
      }
    };

    console.log("Pet ID from useParams:", id); // Debugging line
    fetchPet();
  }, [id]);

 

  if (pet && !pet.name) {
    return <div>Something went wrong. Pet data is incomplete.</div>;
  }

  const confirmExit = () => {
    const userConfirmed = window.confirm(
      "You're about to leave the app. Are you sure?"
    );
    return userConfirmed;
  };

  return pet ? (
    <div className="profile-container">
      {/* <h1>{pet.name}</h1> */}

      <Card className="card-container">
        <Card.Body>
          <Card.Title className="title" >{pet.name}</Card.Title>
          <Card.Text>
            <div className="first-set">
              <a
                href={pet.url}
                className="link text-4xl"
                target="_blank"
                rel="noopener noreferrer"
                onClick={confirmExit}
              >
                Sponsor Me Here:
              </a>

              <h3>Pet care essentials</h3>
              <ul>
                <li>
                  Spayed/Neutered: {String(pet.attributes?.spayed_neutered)}
                </li>
                <li>House Trained: {String(pet.attributes?.house_trained)}</li>
                <li>Declawed: {String(pet.attributes?.declawed)}</li>
                <li>Special Needs: {String(pet.attributes?.special_needs)}</li>
                <li>Shots Current: {String(pet.attributes?.shots_current)}</li>
                <li>Type: {pet.type}</li>
                <li>Species: {pet.species}</li>
                <li className="status" >Status: {pet.status}</li>
                <li>Age: {pet.age}</li>
                <li>Gender: {pet.gender}</li>
                <li>Size: {pet.size}</li>
                <li>Main Breed: {pet.breeds?.primary}</li>
                <li>Coat: {pet.coat || "Unknown"}</li>
              </ul>
            </div>
            <div className="third-set">
              <h3>Good in a home with</h3>
              <ul>
                <li>
                  Children: {String(pet.environment?.children) || "Unknown"}
                </li>
                <li>Dogs: {String(pet.environment?.dogs) || "Unknown"}</li>
                <li>Cats: {String(pet.environment?.cats) || "Unknown"}</li>
              </ul>

              <h3>Contact Information</h3>
              <ul>
                <li>Email: {pet.contact?.email}</li>
                <li>Phone: {pet.contact?.phone}</li>
                <li>
                  Address:{" "}
                  {`${pet.contact?.address?.city}, ${pet.contact?.address?.state}, ${pet.contact?.address?.postcode}, ${pet.contact?.address?.country}`}
                </li>
              </ul>
            </div>
          </Card.Text>
        </Card.Body>
        <Link to={`/userDashboard/${pet.id}`}>
          <Button variant="success" style={{ backgroundColor: '#007bff' }} >Apply for Adoption</Button>
        </Link>
      </Card>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
