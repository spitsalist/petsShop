import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField } from '@mui/material';
import axios from 'axios';
import { clearCart } from '../redux/slices/cartSlice';

const OrderDetails = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleOrder = async () => {
    const orderData = {
      name,
      phoneNumber,
      email,
      items: cartItems,
      totalAmount,
    };

    try {
      const response = await axios.post('http://localhost:5173/products/order', orderData);
      console.log('Order response:', response.data);
      dispatch(clearCart());
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
      <Typography variant="h5" mb={2}>Order Details</Typography>
      <Typography variant="body1">Total Items: {totalItems}</Typography>
      <Typography variant="h6" mt={2} mb={2}>Total Amount: ${totalAmount.toFixed(2)}</Typography>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Phone number"
        fullWidth
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleOrder}
      >
        Order
      </Button>
    </Box>
  );
};

export default OrderDetails;