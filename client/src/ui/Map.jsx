import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

function Map({ setLattitude, setLongitude, setAddress, setCountry, setError }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]); // Default map position
  const [markers, setMarkers] = useState([]);
  const [cityName, setCityName] = useState('');
  const [disrictName, setDistrictName] = useState('');
  const [villageName, setVillagetName] = useState('');
  const [stateName, setStateName] = useState('');
  // location
  useEffect(() => {
    async function fetchCityName(lat, lng) {
      try {
        const response = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
        );
        setCityName(response.data.localityInfo.administrative[3].name);
        setDistrictName(response.data.localityInfo.administrative[2].name);
        setVillagetName(response.data.localityInfo.administrative[4].name);
        setStateName(response.data.localityInfo.administrative[1].name);
        setCountry(response.data.countryCode);
        setAddress({
          cityName: response.data.localityInfo.administrative[3].name,
          districtName: response.data.localityInfo.administrative[2].name,
          villageName: response.data.localityInfo.administrative[4].name,
          stateName: response.data.localityInfo.administrative[1].name,
        });
        setError(null);
      } catch (error) {
        setError(error);
      }
    }

    if (selectedLocation) {
      const { latitude, longitude } = selectedLocation;
      fetchCityName(latitude, longitude);
    }
  }, [selectedLocation, setAddress]);
  // map postion in current and address
  const updateMapPosition = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition([latitude, longitude]);
          setLattitude(latitude);
          setLongitude(longitude);
          setSelectedLocation({ latitude, longitude });
          setMarkers([
            { id: new Date().getTime(), lat: latitude, lng: longitude },
          ]); // Move marker to current location
        },
        (error) => {
          console.error('Error getting current position:', error);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };
  // marker can move and get address
  const AddMarkerToClickLocation = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers([{ id: new Date().getTime(), lat, lng }]);
        setSelectedLocation({ latitude: lat, longitude: lng });
        setLattitude(lat);
        setLongitude(lng);
        setMapPosition([lat, lng]);
      },
    });

    return null;
  };
  const onError = (errors) => {
    console.log(errors);
  };
  return (
    <StyledContainer>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '600px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <AddMarkerToClickLocation />
        {markers.map((marker) => (
          <React.Fragment key={marker.id}>
            <Marker position={[marker.lat, marker.lng]}>
              <Popup>
                Marker at ({marker.lat}, {marker.lng})
              </Popup>
            </Marker>
            <ChangeCenter position={[marker.lat, marker.lng]} />
          </React.Fragment>
        ))}
      </MapContainer>
      <Button onClick={updateMapPosition}>Current Location</Button>

      <div>
        {cityName && (
          <DetailsContainer>
            <p>
              Address: {villageName}-{cityName}-{disrictName}-{stateName}
            </p>
          </DetailsContainer>
        )}
      </div>
    </StyledContainer>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Button = styled.button`
  background-color: #09ab00;
  color: #ffffff;
  padding: 10px 15px;
  margin-left: 20px;
  border-radius: 40px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #13900c;
  }
`;

const DetailsContainer = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;

export default Map;
