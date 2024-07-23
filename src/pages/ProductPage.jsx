import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Box, Button, IconButton, Breadcrumbs, Link, CircularProgress, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import SortAndFilter from '../components/SortAndFilter';
const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  console.log('Product ID:', productId);

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error('No product ID found'); 
        return;
      }
      try {
        console.log('Fetching product with ID:', productId); // Debugging line
        const response = await axios.get(`http://localhost:3333/products/${productId}`);
        console.log('Product data:', response.data); // Debugging line
        setProduct(response.data[0]); 
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

  const handleReadMoreOpen = () => {
    setReadMore(true);
  };

  const handleReadMoreClose = () => {
    setReadMore(false);
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
      {/* <SortAndFilter  /> */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Main page
        </Link>
        <Link underline="hover" color="inherit" href="/categories/">
          Categories
        </Link>
        <Link underline="hover" color="inherit" href={`/categories/${product.categoryId}`}>
        {/* <SortAndFilter categoryId={product.categoryId} /> */}
          {product.categoryId}
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={5}>
          <Box>
            <CardMedia
              component="img"
              image={`http://localhost:3333${product.image}`}
              alt="Product Image"
              sx={{ height: 'auto', maxWidth: '100%' }}
            />
            <CardContent>
              {product.additionalImages && product.additionalImages.map((img, index) => (
                <img key={index} src={`http://localhost:3333/product_img/${img}`} alt={`product-${index}`} width="100%" style={{ marginBottom: '10px' }} />
              ))}
            </CardContent>
          </Box>
        </Grid>

        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ mr: 2, fontWeight: 'bold' }}>${product.discont_price || product.price}</Typography>
              {product.discont_price && (
                <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 2 }}>
                  ${product.price}
                </Typography>
              )}
              {product.discont_price && (
                <Typography variant="h6" sx={{ color: '#fff', backgroundColor: '#0D50FF', padding: '0 8px', borderRadius: '4px' }}>
                  -{Math.round((1 - product.discont_price / product.price) * 100)}%
                </Typography>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '65px', height: '35px' }} onClick={handleDecrease} size="small">
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{   border: '1px solid #ccc', borderRight: 'none', borderLeft: 'none', width: '65px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {quantity}
              </Typography>
              <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '65px', height: '35px' }} onClick={handleIncrease} size="small">
                <Add />
              </IconButton>
              <Button variant="contained" color="primary" sx={{  height: '40px', width: '270px', backgroundColor: '#0D50FF', fontWeight: 'bold', marginLeft: 'auto' }} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>
              {product.discont_description || product.description}
            </Typography>
            <Typography onClick={handleReadMoreOpen} sx={{ mt: 2, textAlign: 'right', cursor: 'pointer', ":hover": { textDecoration: 'underline', color: '#0D50FF' } }}>
              Read More
            </Typography>
            <Dialog
              open={readMore}
              onClose={handleReadMoreClose}
              aria-labelledby="read-more-dialog-title"
              aria-describedby="read-more-dialog-description"
            >
              <DialogTitle id="read-more-dialog-title">Description</DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="read-more-dialog-description" tabIndex={-1}>
                  {product.discont_description || product.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleReadMoreClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductPage;