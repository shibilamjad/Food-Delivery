import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function GetPlace({ latitude, longitude }) {
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');

  useEffect(
    function () {
      if (!latitude && !longitude) return;

      async function fetchCityData() {
        try {
          const res = await fetch(
            `${BASE_URL}?latitude=${latitude}&longitude=${longitude}`,
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a city. Click somewhere else 😉",
            );

          setCityName(data.city || data.locality || '');
          setCountry(data.countryName);
        } catch (err) {
          console.error(err.message);
        }
      }
      fetchCityData();
    },
    [latitude, longitude],
  );

  return (
    <>
      <div>City:{cityName}</div>
      <div>Country:{country}</div>
    </>
  );
}

export default GetPlace;
