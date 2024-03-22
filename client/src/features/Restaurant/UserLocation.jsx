import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import { useCity } from './useCity';
import styled from 'styled-components';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { useAvailable } from './useAvailable';

function UserLocation() {
  const [Location, setLocation] = useState('');

  const { getCity, isLoading } = useCity();
  const { isLoading: isAvailable, refetch } = useAvailable();
  useEffect(() => {
    const storedLocation = localStorage.getItem('location');
    if (storedLocation) {
      setLocation(storedLocation);
    } else {
      setLocation('current');
      localStorage.setItem('location', 'current');
    }
  }, []);
  const handleChange = (event) => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
    localStorage.setItem('location', selectedLocation);
    window.location.reload();
    window.location.reload();
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      refetch();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [refetch]);

  if (isLoading) return <P>Loading...</P>;
  return (
    <Box sx={{ minWidth: 120, paddingRight: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Location"
          value={Location}
          style={{ height: 40 }}
          onChange={handleChange}
        >
          <MenuItem value={'current'}>
            <StyledContent>
              <FaLocationCrosshairs />
              Current Location
            </StyledContent>
          </MenuItem>

          {getCity.map((item) => (
            <MenuItem value={item.cityName} key={item.cityName}>
              <StyledContent>
                <FaLocationCrosshairs />
                {item.cityName}
              </StyledContent>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default UserLocation;

const P = styled.p`
  display: flex;
  align-items: center;
`;

const StyledContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 3px;
`;
