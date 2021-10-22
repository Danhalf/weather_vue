// const API_KEY = '4da2db5ce3e60434a49aee283ced5ec1'; // openweather
const API_KEY = 'c677e93ae29544259e1120004212110'; //weather api

const CITY_NAME = 'Zhytomyr';

const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY_NAME}&aqi=no`;

const getWeather = async () => {
  const weather = await fetch(URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });

  return weather;
};

export default getWeather;
