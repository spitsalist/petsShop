import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById } from "../redux/slices/categoriesSlice";
import { Card, CardMedia, CardContent, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';
import SortAndFilter from '../components/SortAndFilter';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [categoryId, dispatch]);

  const { categoryData, isLoading: categoryLoading, isError: categoryError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (categoryData?.data) {
      setFilteredProducts(categoryData.data);
      setIsLoading(false);
    }
  }, [categoryData]);

  const handleFilterChange = ({ priceFrom, priceTo, discounted, sortOrder }) => {
    let filtered = [...categoryData.data];

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

  if (isLoading || categoryLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || categoryError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {categoryData?.category?.title}
      </Typography>
      <SortAndFilter onFilterChange={handleFilterChange} />
      <Grid container spacing={4}>
        {filteredProducts && filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
            }}>
              <Box sx={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderTopLeftRadius: 8, 
                borderTopRightRadius: 8, 
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.8 },
                  }}
                  image={product.image ? `http://localhost:3333/${product.image}` : 'https://via.placeholder.com/200'}
                  alt={product.title}
                />
              </Box>
              <CardContent sx={{
                flex: '1 0 auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ fontSize: '14px' }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Category;