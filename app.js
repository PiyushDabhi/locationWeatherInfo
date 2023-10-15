const axios = require('axios');

async function getLocationAndWeatherInfo(latitude, longitude) {
  const response = {
    status: 'success',
    message: '',
    code: 200, // Default to a success response code
    data: {
      location: {},
      weather: {},
    },
  };

  try {
    // Retrieve location information
    const locationApiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    const locationResponse = await axios.get(locationApiUrl);
    response.data.location = locationResponse.data.address;

    // Retrieve weather information
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,windspeed_10m&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`;
    const weatherResponse = await axios.get(weatherApiUrl);
    response.data.weather = {
      temperature: weatherResponse.data.current.temperature_2m + '°C',
      windspeed: weatherResponse.data.current.windspeed_10m + 'm/s',
    };

  } catch (error) {
    response.status = 'failed';
    response.code = 500; // Set an appropriate error response code
    response.message = 'An error occurred';
    response.error = error.message;
  }

  console.log(response);
}

const latitude = 37.7749;
const longitude = -122.4194;

getLocationAndWeatherInfo(latitude, longitude);
