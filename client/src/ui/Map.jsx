import { useState } from 'react';
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

function Map() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]); // Default map position
  const [markers, setMarkers] = useState([]);
  const [s, serS] = useState([]);

  const updateMapPosition = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapPosition([latitude, longitude]);
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

  const AddMarkerToClickLocation = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkers([{ id: new Date().getTime(), lat, lng }]);
        setSelectedLocation({ latitude: lat, longitude: lng });
        setMapPosition([lat, lng]);
      },
    });

    return null;
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
          <>
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup>
                Marker at ({marker.lat}, {marker.lng})
              </Popup>
            </Marker>
            <ChangeCenter position={[marker.lat, marker.lng]} />
          </>
        ))}
      </MapContainer>
      <Button onClick={updateMapPosition}>Current Location</Button>
      <div>
        {selectedLocation && (
          <DetailsContainer>
            <p>Latitude: {selectedLocation.latitude}</p>
            <p>Longitude: {selectedLocation.longitude}</p>
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
