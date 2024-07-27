import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  Grid, CardMedia, Box, Typography, Button, IconButton, CircularProgress,  } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { fetchProductById } from '../redux/slices/productsSlice';
import { addToCart } from '../redux/slices/cartSlice';
import BreadcrumbsComponent from "../components/BreadcrumbsComponent.jsx";

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
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h6" color="error">
          {message || 'Error loading product data.'}
        </Typography>
      </Box>
    );
  }

  if (!productData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Typography variant="h6" color="error">
          Product data is empty.
        </Typography>
      </Box>
    );
  }

  const breadcrumbs = [
    { path: '/', title: 'Main page' },
    { path: '/categories', title: 'Categories' },
    { path: `/categories/${productData.categoryId}`, title: 'Discounted item' },
    { path: `/product/${productId}`, title: productData.title },
  ];

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />

      <Grid container spacing={2} sx={{ mt: 2 }}>
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
              <Button variant="contained" color="primary" sx={{ height: '40px', width: '230px', backgroundColor: '#0D50FF', fontWeight: 'bold', marginLeft: 'auto', fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '20px' } }} onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Box>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxHeight: readMore ? 'none' : '100px', whiteSpace: readMore ? 'normal' : 'nowrap' }}>
              {productData.discont_description || productData.description}
            </Typography>
            <Typography onClick={() => setReadMore(!readMore)} sx={{ mt: 2, textAlign: 'right', cursor: 'pointer', ":hover": { textDecoration: 'underline', color: '#0D50FF' } }}>
              {readMore ? 'Show Less' : 'Read More'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductPage;