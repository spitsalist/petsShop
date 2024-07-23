import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, CircularProgress, Box } from '@mui/material';
import CardComponent from '../components/CardComponent.jsx';
import SortAndFilter from '../components/SortAndFilter';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3333/products/all')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = ({ priceFrom, priceTo, discounted, sortOrder }) => {
    let filtered = [...products];

    if (priceFrom) {
      filtered = filtered.filter(product => (product.discont_price || product.price) >= priceFrom);
    }
    if (priceTo) {
      filtered = filtered.filter(product => (product.discont_price || product.price) <= priceTo);
    }
    if (discounted) {
      filtered = filtered.filter(product => product.discont_price);
    }

    switch (sortOrder) {
      case 'priceAsc':
        filtered = filtered.sort((a, b) => (a.discont_price || a.price) - (b.discont_price || b.price));
        break;
      case 'priceDesc':
        filtered = filtered.sort((a, b) => (b.discont_price || b.price) - (a.discont_price || a.price));
        break;
      case 'newest':
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Error loading products.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        All Products
      </Typography>
      <SortAndFilter onFilterChange={handleFilterChange} />
      <Grid container spacing={4}>
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <CardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;