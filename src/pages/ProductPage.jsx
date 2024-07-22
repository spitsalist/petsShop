import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, Button, IconButton, Breadcrumbs, Link, CircularProgress } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log('Product ID:', productId); // Debugging line

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('No product ID found'); // Debugging line
        return;
      }
      try {
        console.log('Fetching product with ID:', productId); // Debugging line
        const response = await axios.get(`http://localhost:3333/products/${productId}`);
        console.log('Product data:', response.data); // Debugging line
        setProduct(response.data[0]); // Assuming response data is an array
        setTotalPrice(response.data[0].price);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleIncrease = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;
      setTotalPrice(newQuantity * product.price);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1;
        setTotalPrice(newQuantity * product.price);
        return newQuantity;
      });
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product.id, product.title, quantity); // Debugging line
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity,
    }));
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
          Error loading product data.
        </Typography>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Product data is empty.
        </Typography>
      </Box>
    );
  }

  console.log('Rendered product:', product); // Debugging line

  return (
    <Container sx={{ mt: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Main page
        </Link>
        <Link underline="hover" color="inherit" href="/categories">
          Categories
        </Link>
        <Link underline="hover" color="inherit" href={`/categories/${product.categoryId}`}>
          Category
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image={`http://localhost:3333${product.image}`}
              alt="Product Image"
            />
            <CardContent>
              {product.additionalImages && product.additionalImages.map((img, index) => (
                <img key={index} src={`http://localhost:3333/product_img/${img}`} alt={`product-${index}`} width="100%" style={{ marginBottom: '10px' }} />
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ mr: 2 }}>${product.price}</Typography>
              {product.discont_price && (
                <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 2 }}>
                  ${product.discont_price}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton onClick={handleDecrease} size="small">
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ mx: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={handleIncrease} size="small">
                <Add />
              </IconButton>
              <Button variant="contained" color="primary" sx={{ ml: 3 }} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;