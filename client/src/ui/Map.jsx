import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import GetPlace from './getPlace';

function Map() {
  const [initialized, setInitialized] = useState(false);
  const [map, setMap] = useState(null);
  const [query, setQuery] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const initializeMap = () => {
    const leafletMap = L.map('map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(leafletMap);
    setMap(leafletMap);
    setInitialized(true);
  };

  const handleSearch = async () => {
    if (!initialized) {
      initializeMap();
    }
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${query}&format=json`,
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLatitude(lat);
        setLongitude(lon);
        map.setView([lat, lon], 13);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          map.setView(
            [position.coords.latitude, position.coords.longitude],
            13,
          );
        },
        (error) => {
          console.error('Error getting current location:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={getCurrentLocation}>Get Current Location</button>
      <div id="map" style={{ width: '100%', height: '200px', zoom: 2 }} />
      {latitude && longitude && (
        <p>
          Latitude: {latitude}, Longitude: {longitude}
        </p>
      )}
      <div>
        <GetPlace latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
}

export default Map;
