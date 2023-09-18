const apiKey = '';
const apiSecret = '';

async function getAccessToken() {
  const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
  const requestBody = `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`;

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody,
  });

  const data = await response.json();
  return data.access_token;
}

async function getAnimals() {
  const accessToken = await getAccessToken();
  const apiUrl = 'https://api.petfinder.com/v2/animals?type=dog&page=1&limit=20';

  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.animals;
}

getAnimals()
  .then((animals) => {
    console.log(animals); 
  })
  .catch((error) => {
    console.error('Error fetching animals:', error);
  });
