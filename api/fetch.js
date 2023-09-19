const fetch = require('node-fetch');
const dotenv = require('dotenv');

if (typeof process !== 'undefined' && process.env) {
  dotenv.config();
  
  const apiKey = process.env.PETFINDER_API_KEY;
  const apiSecret = process.env.PETFINDER_API_SECRET;

  async function getAccessToken() {
    const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
  
    const requestBody = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`;
  
    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      });
  
      const data = await response.json();
      console.log('Access Token:', data.access_token); 
      return data.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      throw error;
    }
  }
  

  async function getAnimals() {
    try {
      const accessToken = await getAccessToken();
      const apiUrl = 'https://api.petfinder.com/v2/animals?type=dog&page=1&limit=20';
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      const data = await response.json();
      console.log('Petfinder API Response:', data); 
      return data.animals;
    } catch (error) {
      console.error('Error fetching animals:', error);
      throw error;
    }
  }
  

  getAnimals()
    .then((animals) => {
      console.log(animals);
    })
    .catch((error) => {
      console.error('Error fetching animals:', error);
    });
}
