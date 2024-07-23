import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, FormControl, MenuItem, Select, Typography } from '@mui/material';

const SortAndFilter = ({ onFilterChange }) => {
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [discounted, setDiscounted] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const handlePriceFromChange = (event) => {
    setPriceFrom(event.target.value);
    onFilterChange({ priceFrom: event.target.value, priceTo, discounted, sortOrder });
  };

  const handlePriceToChange = (event) => {
    setPriceTo(event.target.value);
    onFilterChange({ priceFrom, priceTo: event.target.value, discounted, sortOrder });
  };

  const handleDiscountedChange = (event) => {
    setDiscounted(event.target.checked);
    onFilterChange({ priceFrom, priceTo, discounted: event.target.checked, sortOrder });
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    onFilterChange({ priceFrom, priceTo, discounted, sortOrder: event.target.value });
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
      <Typography variant="body1" sx={{ mr: 2 }}>Price</Typography>
      <TextField
        label="from"
        variant="outlined"
        size="small"
        value={priceFrom}
        onChange={handlePriceFromChange}
        sx={{ mr: 2 }}
      />
      <TextField
        label="to"
        variant="outlined"
        size="small"
        value={priceTo}
        onChange={handlePriceToChange}
        sx={{ mr: 4 }}
      />
      <FormControlLabel
        control={<Checkbox checked={discounted} onChange={handleDiscountedChange} />}
        label="Discounted items"
        sx={{ mr: 4 }}
      />
      <Typography variant="body1" sx={{ mr: 2 }}>Sorted</Typography>
      <FormControl variant="outlined" size="small">
        <Select
          value={sortOrder}
          onChange={handleSortOrderChange}
          displayEmpty
        >
          <MenuItem value="default">by default</MenuItem>
          <MenuItem value="priceAsc">Price: Low to High</MenuItem>
          <MenuItem value="priceDesc">Price: High to Low</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortAndFilter;