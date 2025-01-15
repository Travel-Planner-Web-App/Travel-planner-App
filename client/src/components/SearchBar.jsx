import React from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mb={4}
      sx={{
        gap: 2,
        padding: 2,
        backgroundColor: 'background.paper',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Search for your destination"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default SearchBar;