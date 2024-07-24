import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, CircularProgress, Box, Button, Breadcrumbs, Link, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import CardComponent from "../components/CardComponent.jsx";
import FilterDefinition from "../components/FilterDefinition.jsx";
import { fetchAllProducts } from '../redux/slices/productsSlice';
import { styled } from '@mui/system';

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(4),
}));

const DividerBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: theme.spacing(0, 2),
}));

const Sales = ({ home = false }) => {
  const dispatch = useDispatch();
  const { products = [], isLoading, isError, message } = useSelector((state) => state.products); // Initialize products as an empty array
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (home) {
      setFilteredProducts(products.slice(0, 4));
    } else {
      setFilteredProducts(products);
    }
  }, [products, home]);

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
          {message || 'Error loading products.'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 6 }}>
      {!home && (
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Main page
          </Link>
          <Link underline="hover" color="inherit" component={RouterLink} to="/sales/all">
            All Sales
          </Link>
        </Breadcrumbs>
      )}

      <HeaderBox>
        <Typography variant="h4" component="h2" sx={{ whiteSpace: 'nowrap', mt: 5, fontWeight: 'bold' }}>
          {home ? 'Sales' : 'Discounted Item'}
        </Typography>
        <DividerBox>
          <Divider orientation="horizontal" flexItem sx={{ width: '100%', mt: 5 }} />
        </DividerBox>
        {home && (
          <Button
            sx={{
              textTransform: 'none',
              width: 'auto',
              height: '36px',
              textAlign: 'center',
              padding: '0 16px',
              whiteSpace: 'nowrap',
              mt: 5,

              
            }}
            variant="outlined"
            component={RouterLink}
            to="/sales/all"
          >
            All sales
          </Button>
        )}
      </HeaderBox>

      {!home && (
        <FilterDefinition products={products} setFilteredProducts={setFilteredProducts} onSale />
      )}

      <Grid container spacing={4}>
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <CardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sales;