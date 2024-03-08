import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const BASE_URL = 'https://nominatim.openstreetmap.org/search';
const DEBOUNCE_DELAY = 300; // milliseconds

function Map() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(
        `${BASE_URL}?q=${query}&format=json&limit=5`,
      );
      setSearchResults(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Error fetching cities. Please try again later.');
      setSearchResults([]);
    }
  };

  const debouncedSearch = debounce(handleSearch, DEBOUNCE_DELAY);

  useEffect(() => {
    if (query.trim() !== '') {
      debouncedSearch(query);
    } else {
      setSearchResults([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  console.log(searchResults);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        value={query}
        onChange={(e, value) => setQuery(value)}
        disableClearable
        options={searchResults.map((option) => option.display_name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            onChange={handleChange}
          />
        )}
      />
    </Stack>
  );
}

export default Map;
