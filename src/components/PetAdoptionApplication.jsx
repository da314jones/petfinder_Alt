import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './PetAdoptionApplication.css'

export default function PetAdoptionApplication() {
  const { id } = useParams();
  const initialState = {
    name: '',
    email: '',
    address: '',
    phone: '',
    reason: '',
    familyMembers: []
  };

  const [formData, setFormData] = useState(() => {
    const existingApplication = localStorage.getItem(`pending-${id}`);
    return existingApplication ? JSON.parse(existingApplication) : initialState;
  });

  useEffect(() => {
    const existingApplication = localStorage.getItem(`pending-${id}`);
    if (existingApplication) {
      setFormData(JSON.parse(existingApplication));
    }
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem(`pending-${id}`, JSON.stringify(formData));
    console.log(`Adoption Application saved for pet ID: ${id}`, formData);
    setFormData(initialState); 
  };
  return (
    <div className='form-text'>
      <h1>Adoption Application for Pet ID: {id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Home Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="reason">
          <Form.Label>Why do you want to adopt this pet?</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <button className="submit" type="submit">Submit Application</button>
      </Form>
    </div>
  );
}
