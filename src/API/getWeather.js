// const API_KEY = '4da2db5ce3e60434a49aee283ced5ec1'; // openweather
const API_KEY = 'c677e93ae29544259e1120004212110'; //weather api

// const CITY_NAME = 'Zhytomyr';

const getWeather = async (city,startDate, endDate) => {
  // const currentWeatherAPI = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
  // const forecastWeatherAPI = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=2021-10-22&end_dt=2021-10-27`
  // const date = new Date();

  // const formatDate = (date) => {
  //
  //   const day = date.getDate();
  //   const month = date.getMonth() + 1;
  //   const year = date.getFullYear();
  //   return `${year}-${month}-${day}`
  // }
  //
  // const startDate = date.getDate() - 2
  // const endDate = date.getDate() + 2

  console.log(startDate, endDate)
  const URL = `http://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${city}&dt=2021-10-22&end_dt=2021-10-27`
  return await fetch(URL, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data)
        return data;
      });
};

export default getWeather;
