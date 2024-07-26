import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import { saleRequestSend} from '../redux/slices/saleRequestSlice';
import {Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField,  CircularProgress, Alert,   Dialog,  DialogTitle,  DialogContent,  DialogActions, useMediaQuery, IconButton} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import TitleDivider from "../components/TitleDivider.jsx";
import theme from "../theme.js";
import { Add, Remove } from '@mui/icons-material';
import DialogWindow from '../components/DialogWindow';


const calculateDiscount = (originalPrice, discountPrice) => {
  if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoading, isError, message } = useSelector((state) => state.saleRequest);

  const { control, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


 

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };


  const onSubmit =  (e, data)=> { 
    e.preventDefault();
    // setOpen(true);
    const orderDetails = {
      customerDetails: data,
      items: cartItems,
      totalAmount: totalAmount 
    };


  dispatch(saleRequestSend(orderDetails))
  setOpen(true)
   

  };

  const handleClose = () => {
    setOpen(false);
  
    }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  
  return (
    <Box sx={{ my: 6 }}>
      <TitleDivider title="Shopping Cart" buttonTitle="Back to the store" buttonPath="/sales/all" />
      {cartItems.length === 0 ? (
        <Typography variant="h6" component="div">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => {
              const itemTotalPrice = item.price * item.quantity;
              const itemOriginalTotalPrice = item.originalPrice ? item.originalPrice * item.quantity : null;

              return (
                <Card key={item.id} sx={{ display: 'flex', mb: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: '200px', height: '200px', objectFit: 'contain', transition: 'transform 0.3s ease',
                      ":hover": { transform: 'scale(1.05)', opacity: 0.8 }
                    }}
                    image={item.image ? `http://localhost:3333/${item.image}` : 'shopping cart placeholder'}
                    alt={item.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        variant="h6"
                        sx={{ fontFamily: 'Montserrat', fontSize: '17px', textAlign: 'left' }}
                      >
                        {item.title}
                      </Typography>
                      <Button
                        variant="text"
                        sx={{ fontFamily: 'Montserrat', fontSize: '16px', color: '#ccc', borderRadius: '2px', fontWeight: 'bold', ":hover": { color: 'red' } }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        X
                      </Button>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: isSmallScreen ? 'column' : 'row',
                      alignItems: isSmallScreen ? 'flex-start' : 'center',
                      justifyContent: 'space-between',
                      mt: 2
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: isSmallScreen ? 1 : 0 }}>
                        <IconButton variant="outlined" sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '60px', height: '40px' }} onClick={() => handleDecrementQuantity(item.id)}>
                          <Remove />
                        </IconButton>
                        <Typography variant="body1" sx={{
                          border: '1px solid #ccc',
                          borderLeft: 'none',
                          borderRight: 'none',
                          width: '80px',
                          height: '37px',
                          textAlign: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {item.quantity}
                        </Typography>
                        <IconButton variant="outlined" sx={{ border: '1px solid #ccc', borderRadius: '4px', width: '60px', height: '40px' }} onClick={() => handleIncrementQuantity(item.id)}>
                          <Add />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isSmallScreen ? 'flex-start' : 'flex-end' }}>
                        {item.originalPrice && item.price < item.originalPrice ? (
                          <>
                            <Typography
                              variant={isSmallScreen ? "body2" : "h6"}
                              sx={{ fontWeight: 'bold' }}
                            >
                              ${itemTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography
                              variant={isSmallScreen ? "body2" : "h6"}
                              color="textSecondary"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              ${itemOriginalTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'green' }}>
                              -{calculateDiscount(item.originalPrice, item.price)}%
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant={isSmallScreen ? "h6" : "h4"}
                            sx={{ fontWeight: 'bold' }}
                          >
                            ${itemTotalPrice.toFixed(2)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, backgroundColor: '#F1F3F4', border: 1, borderColor: '#ccc', borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order details
              </Typography>
              <Typography variant="h5" color={'textSecondary'}>{totalItems} items</Typography>
              <Typography variant="h5" color={'textSecondary'} sx={{ marginTop: 2, position: 'absolute' }}>Total</Typography>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'right', position: 'relative' }}>
                ${totalAmount.toFixed(2)}
              </Typography>
              <form onSubmit={(e) =>  onSubmit( e)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Name is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: 'white' }}
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ''}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Phone number is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone number"
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: 'white' }}
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Invalid email address'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                      sx={{ backgroundColor: 'white' }}
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ''}
                    />
                  )}
                />
                <Button type="submit" variant="contained" color="primary" onClick={() => setOpen(true)} fullWidth disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Order'}
             
                </Button>
              </form>
              {isError && <Alert severity="error">{message}</Alert>}
              <DialogWindow
              onClick={setOpen}
                open={open}
                handleClose={handleClose}
                WindowText={"Your order has been successfully placed on the website. A manager will contact you shortly."}
              />
          
            </Box>
          </Grid>
        </Grid>
      )}
      <Button
        variant="contained"
        component={RouterLink}
        to="/sales/all"
        sx={{ mt: 2 }}
      >
        Back to the store
      </Button>
    </Box>
  );
};


export default Cart;