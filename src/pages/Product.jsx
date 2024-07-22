import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Grid, Card, CardMedia, CardContent, CardActions, Button, Typography, Box } from '@mui/material';
import { addToCart } from '../redux/slices/cartSlice';

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    axios.get('http://localhost:3333/products/all')
      .then(response => {
        setProducts(response.data.slice(0, 12));
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.discont_price || product.price,
      totalPrice: product.discont_price || product.price,
      quantity: 1, // Ensure quantity is initialized
    }));
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
              },
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
                {product.discont_price ? (
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '14px' }}>
                    <Box component="span" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                      ${product.discont_price}
                    </Box> 
                    <Box component="span" sx={{ fontSize: '18px', textDecoration: 'line-through', marginLeft: 1 }}>
                      ${product.price}
                    </Box>
                  </Typography>
                ) : (
                  <Typography variant="h6" color="textSecondary" sx={{ fontSize: '14px' }}>
                    <Box component="span" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
                      ${product.price}
                    </Box>
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <Button size="small" component={RouterLink} to={`/products/${product.id}`} sx={{ marginLeft: 'auto' }}>
                  View Product
                </Button>
                <Button
                  size="small"
                  onClick={() => handleAddToCart(product)}
                  sx={{ marginLeft: 'auto' }}
                  variant={isInCart(product.id) ? 'outlined' : 'contained'}
                >
                  {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Products;