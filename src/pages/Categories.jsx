import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardMedia, Box } from '@mui/material';
// import { addToCart } from '../redux/slices/cartSlice'; // Import the addToCart action

const Categories = ({ displayedCategories }) => {
  const [categories, setCategories] = useState([]);
  // const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    axios.get('http://localhost:3333/categories/all')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  // const handleAddToCart = (category) => {
  //   const product = {
  //     id: category.id,
  //     title: category.title,
  //     price: 0, 
  //     image: category.image,
  //   };
  //   dispatch(addToCart(product));
  // };

  return (
    <Container sx={{ mt: 6 }}>
      <Grid container spacing={4}>
        {categories.slice(0, displayedCategories).map(category => (
          <Grid item key={category.id} xs={12} sm={6} md={3}>
            <Card sx={{ background: 'none', boxShadow: 'none', textAlign: 'center' }}>
              <RouterLink to={`/categories/${category.id}`} style={{ textDecoration: 'none' }}>
                <CardMedia
                  component="img"
                  height="280"
                  sx={{ objectFit: 'contain', opacity: 1, cursor: 'pointer', '&:hover': { opacity: 0.9 } }}
                  image={category.image ? `http://localhost:3333/${category.image}` : 'animals.jpg'}
                  alt={category.title}
                />
              </RouterLink>
              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {category.title}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Categories;