import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Grid, CardMedia, Box, Typography, Button, IconButton, CircularProgress, Breadcrumbs, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { productData, isLoading, isError, message } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleAddToCart = () => {
    if (productData) {
      dispatch(addToCart({ ...productData, quantity }));
    }
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
          {message || 'Error loading product data.'}
        </Typography>
      </Box>
    );
  }

  if (!productData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          Product data is empty.
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Main page
        </Link>
        <Link underline="hover" color="inherit" href="/categories/">
          Categories
        </Link>
        <Link underline="hover" color="inherit" href={`/categories/${productData.categoryId}`}>
          Discounted item
        </Link>
        <Typography color="text.primary">{productData.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid item xs={12} md={5}>
          <Box>
            <CardMedia
              component="img"
              image={`http://localhost:3333${productData.image}`}
              alt="Product Image"
              sx={{ height: 'auto', maxWidth: '100%' }}
            />
            {productData.additionalImages && productData.additionalImages.map((img, index) => (
              <img key={index} src={`http://localhost:3333/product_img/${img}`} alt={`product-${index}`} width="100%" style={{ marginBottom: '10px' }} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={7}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
              {productData.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ mr: 2, fontWeight: 'bold' }}>
                ${productData.discont_price || productData.price}
              </Typography>
              {productData.discont_price && (
                <>
                  <Typography variant="h5" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 2 }}>
                    ${productData.price}
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#fff', backgroundColor: '#0D50FF', padding: '0 8px', borderRadius: '4px' }}>
                    -{Math.round((1 - productData.discont_price / productData.price) * 100)}%
                  </Typography>
                </>
              )}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '65px', height: '35px' }} onClick={handleDecrease} size="small">
                <Remove />
              </IconButton>
              <Typography variant="h6" sx={{ border: '1px solid #ccc', borderRight: 'none', borderLeft: 'none', width: '65px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {quantity}
              </Typography>
              <IconButton sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '65px', height: '35px' }} onClick={handleIncrease} size="small">
                <Add />
              </IconButton>
              <Button variant="contained" color="primary" sx={{ height: '40px', width: '270px', backgroundColor: '#0D50FF', fontWeight: 'bold', marginLeft: 'auto' }} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: '100px' }}>
              {productData.discont_description || productData.description}
            </Typography>
            <Typography onClick={() => setReadMore(true)} sx={{ mt: 2, textAlign: 'right', cursor: 'pointer', ":hover": { textDecoration: 'underline', color: '#0D50FF' } }}>
              Read More
            </Typography>
            <Dialog open={readMore} onClose={() => setReadMore(false)} aria-labelledby="read-more-dialog-title" aria-describedby="read-more-dialog-description">
              <DialogTitle id="read-more-dialog-title">Description</DialogTitle>
              <DialogContent dividers>
                <DialogContentText id="read-more-dialog-description" tabIndex={-1}>
                  {productData.discont_description || productData.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setReadMore(false)} color="primary">
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