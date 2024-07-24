// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   return (
//     <Container sx={{ mt: 6 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Shopping Cart
//       </Typography>
//       {cartItems.length === 0 ? (
//         <Typography variant="h6" component="div">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {cartItems.map((item) => (
//             <Grid item key={item.id} xs={12} sm={6} md={4}>
//               <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   sx={{ objectFit: 'contain' }}
//                   image={item.image ? `http://localhost:3333/${item.image}` : 'https://via.placeholder.com/200'}
//                   alt={item.title}
//                 />
//                 <CardContent>
//                   <Typography variant="h6" component="div">
//                     {item.title}
//                   </Typography>
//                   <Typography variant="body1" color="textSecondary" component="div">
//                     Quantity: {item.quantity}
//                   </Typography>
//                   <Typography variant="body1" color="textSecondary" component="div">
//                     Price: ${item.price}
//                   </Typography>
//                   <Typography variant="body1" color="textSecondary" component="div">
//                     Total: ${item.totalPrice}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     color="secondary"
//                     onClick={() => handleRemoveFromCart(item.id)}
//                     sx={{ mt: 2 }}
//                   >
//                     Remove
//                   </Button>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//       {cartItems.length > 0 && (
//         <Box mt={4}>
//           <Typography variant="h5" component="div">
//             Total Amount: ${totalAmount}
//           </Typography>
//           <Button variant="contained" color="primary" onClick={handleClearCart} sx={{ mt: 2 }}>
//             Clear Cart
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             component={RouterLink}
//             to="/order"
//             sx={{ mt: 2, ml: 2 }}
//           >
//             Proceed to Order
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Cart;




// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '../redux/slices/cartSlice';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <Container sx={{ mt: 6 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Shopping Cart
//       </Typography>
//       {cartItems.length === 0 ? (
//         <Typography variant="h6" component="div">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             {cartItems.map((item) => (
//               <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 151 }}
//                   image={item.image ? `http://localhost:3333/${item.image}` : 'https://via.placeholder.com/200'}
//                   alt={item.title}
//                 />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="h6">{item.title}</Typography>
//                     <Button variant="text" color="error" onClick={() => handleRemoveFromCart(item.id)}>x</Button>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Button variant="outlined">-</Button>
//                     <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
//                     <Button variant="outlined">+</Button>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Typography variant="h6">${item.price}</Typography>
//                     {item.originalPrice && (
//                       <Typography variant="body2" color="textSecondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
//                         ${item.originalPrice}
//                       </Typography>
//                     )}
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
//               <Typography variant="h5" gutterBottom>
//                 Order details
//               </Typography>
//               <Typography variant="body1">{totalItems} items</Typography>
//               <Typography variant="h4" gutterBottom>
//                 ${totalAmount.toFixed(2)}
//               </Typography>
//               <TextField fullWidth label="Name" margin="normal" />
//               <TextField fullWidth label="Phone number" margin="normal" />
//               <TextField fullWidth label="Email" margin="normal" />
//               <Button variant="contained" color="primary" fullWidth>
//                 Order
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleClearCart}
//                 sx={{ mt: 2 }}
//                 fullWidth
//               >
//                 Clear Cart
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//       <Button
//         variant="contained"
//         component={RouterLink}
//         to="/"
//         sx={{ mt: 2 }}
//       >
//         Back to the store
//       </Button>
//     </Container>
//   );
// };

// export default Cart;




// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const handleIncrementQuantity = (id) => {
//     dispatch(incrementQuantity(id));
//   };

//   const handleDecrementQuantity = (id) => {
//     dispatch(decrementQuantity(id));
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <Container sx={{ mt: 6 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Shopping Cart
//       </Typography>
//       {cartItems.length === 0 ? (
//         <Typography variant="h6" component="div">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             {cartItems.map((item) => (
//               <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
//                 <CardMedia
//                   component="img"
//                   sx={{ width: 151 }}
//                   image={item.image ? `http://localhost:3333/${item.image}` : 'https://via.placeholder.com/200'}
//                   alt={item.title}
//                 />
//                 <CardContent sx={{ flex: 1 }}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <Typography variant="h6">{item.title}</Typography>
//                     <Button variant="text" color="error" onClick={() => handleRemoveFromCart(item.id)}>x</Button>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Button variant="outlined" onClick={() => handleDecrementQuantity(item.id)}>-</Button>
//                     <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
//                     <Button variant="outlined" onClick={() => handleIncrementQuantity(item.id)}>+</Button>
//                   </Box>
//                   <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                     <Typography variant="h6">${item.price}</Typography>
//                     {item.originalPrice && (
//                       <Typography variant="body2" color="textSecondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
//                         ${item.originalPrice}
//                       </Typography>
//                     )}
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))}
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
//               <Typography variant="h5" gutterBottom>
//                 Order details
//               </Typography>
//               <Typography variant="body1">{totalItems} items</Typography>
//               <Typography variant="h4" gutterBottom>
//                 ${totalAmount.toFixed(2)}
//               </Typography>
//               <TextField fullWidth label="Name" margin="normal" />
//               <TextField fullWidth label="Phone number" margin="normal" />
//               <TextField fullWidth label="Email" margin="normal" />
//               <Button variant="contained" color="primary" fullWidth>
//                 Order
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleClearCart}
//                 sx={{ mt: 2 }}
//                 fullWidth
//               >
//                 Clear Cart
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//       <Button
//         variant="contained"
//         component={RouterLink}
//         to="/"
//         sx={{ mt: 2 }}
//       >
//         Back to the store
//       </Button>
//     </Container>
//   );
// };

// export default Cart;










// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';

// const calculateDiscount = (originalPrice, discountPrice) => {
//   if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
//   return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
// };

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   const handleIncrementQuantity = (id) => {
//     dispatch(incrementQuantity(id));
//   };

//   const handleDecrementQuantity = (id) => {
//     dispatch(decrementQuantity(id));
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <Container sx={{ mt: 6 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Shopping Cart
//       </Typography>
//       {cartItems.length === 0 ? (
//         <Typography variant="h6" component="div">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={8}>
//             {cartItems.map((item) => {
//               const itemTotalPrice = item.price * item.quantity;
//               const itemOriginalTotalPrice = item.originalPrice ? item.originalPrice * item.quantity : null;

//               return (
//                 <Card key={item.id} sx={{ display: 'flex', mb: 2 }}>
//                   <CardMedia
//                     component="img"
//                     sx={{ width: 151 }}
//                     image={item.image ? `http://localhost:3333/${item.image}` : 'https://via.placeholder.com/200'}
//                     alt={item.title}
//                   />
//                   <CardContent sx={{ flex: 1 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                       <Typography variant="h6">{item.title}</Typography>
//                       <Button variant="text" color="error" onClick={() => handleRemoveFromCart(item.id)}>x</Button>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                       <Button variant="outlined" onClick={() => handleDecrementQuantity(item.id)}>-</Button>
//                       <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
//                       <Button variant="outlined" onClick={() => handleIncrementQuantity(item.id)}>+</Button>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, alignItems: 'center' }}>
//                       {item.originalPrice && item.price < item.originalPrice ? (
//                         <>
//                           <Typography variant="h6" sx={{ color: 'red', fontWeight: 'bold' }}>
//                             ${itemTotalPrice.toFixed(2)}
//                           </Typography>
//                           <Typography variant="body2" color="textSecondary" sx={{ ml: 1, textDecoration: 'line-through' }}>
//                             ${itemOriginalTotalPrice.toFixed(2)}
//                           </Typography>
//                           <Typography variant="body2" sx={{ ml: 1, color: 'green' }}>
//                             -{calculateDiscount(item.originalPrice, item.price)}%
//                           </Typography>
//                         </>
//                       ) : (
//                         <Typography variant="h6">${itemTotalPrice.toFixed(2)}</Typography>
//                       )}
//                     </Box>
//                   </CardContent>
//                 </Card>
//               );
//             })}
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
//               <Typography variant="h5" gutterBottom>
//                 Order details
//               </Typography>
//               <Typography variant="body1">{totalItems} items</Typography>
//               <Typography variant="h4" gutterBottom>
//                 ${totalAmount.toFixed(2)}
//               </Typography>
//               <TextField fullWidth label="Name" margin="normal" />
//               <TextField fullWidth label="Phone number" margin="normal" />
//               <TextField fullWidth label="Email" margin="normal" />
//               <Button variant="contained" color="primary" fullWidth>
//                 Order
//               </Button>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleClearCart}
//                 sx={{ mt: 2 }}
//                 fullWidth
//               >
//                 Clear Cart
//               </Button>
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//       <Button
//         variant="contained"
//         component={RouterLink}
//         to="/"
//         sx={{ mt: 2 }}
//       >
//         Back to the store
//       </Button>
//     </Container>
//   );
// };

// export default Cart;    100%













import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
import { saleRequestSend } from '../redux/slices/saleRequestSlice';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  CircularProgress,
  Alert,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from '@mui/material/styles/styled';
import { Divider } from '@mui/material';
import VerticalTitle from "../components/VerticalTitle.jsx";
import TitleDivider from "../components/TitleDivider.jsx";
import theme from "../theme.js";

const calculateDiscount = (originalPrice, discountPrice) => {
  if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

const DividerBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.saleRequest);

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const orderDetails = {
      customerDetails,
      items: cartItems,
      totalAmount,
    };
    dispatch(saleRequestSend(orderDetails));
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  console.log(isSmallScreen)

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
                <Card key={item.id} sx={{ display: 'flex', mb: 2, p: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, transition: 'transform 0.3s ease', ":hover": { transform: 'scale(1.05)', opacity: 0.8 } }}
                    image={item.image ? `http://localhost:3333/${item.image}` : 'shopping cart placeholder'}
                    alt={item.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'Montserrat',
                          fontSize: '18px',
                          textAlign: 'left',
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Button variant="text" sx={{ fontFamily: 'Montserrat', fontSize: '16px', color: '#ccc', borderRadius: '2px', fontWeight: 'bold', ":hover": { color: 'red' } }} onClick={() => handleRemoveFromCart(item.id)}>X</Button>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', p: 1 }}>
                        <Button variant="outlined" sx={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', minWidth: { xs: '20px', md: '64px' }}} onClick={() => handleDecrementQuantity(item.id)}>-</Button>
                        <Typography variant="body1" sx={{ mx: 3, fontWeight: 'bold' }}>{item.quantity}</Typography>
                        <Button variant="outlined" sx={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', minWidth: { xs: '20px', md: '64px' } }} onClick={() => handleIncrementQuantity(item.id)}>+</Button>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {item.originalPrice && item.price < item.originalPrice ? (
                          <>
                            <Typography
                                variant={isSmallScreen ? "body2" : "h4"}
                                sx={{ fontWeight: 'bold', textAlign: 'left' }}>
                              ${itemTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography
                                variant={isSmallScreen ? "body2" : "h4"}
                                color="textSecondary" sx={{ textDecoration: 'line-through', textAlign: 'left' }}>
                              ${itemOriginalTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'green', textAlign: 'left' }}>
                              -{calculateDiscount(item.originalPrice, item.price)}%
                            </Typography>
                          </>
                        ) : (
                          <Typography
                              variant={isSmallScreen ? "h6" : "h4"}
                              sx={{ fontWeight: 'bold', textAlign: 'left' }}>
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
            <Box sx={{ p: 3, backgroundColor: '#F1F3F4', borderRadius: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order details
              </Typography>
              <Typography variant="h5" color={'textSecondary'}>{totalItems} items</Typography>
              <Typography variant="h5" color={'textSecondary'} sx={{ marginTop: 2 }}>Total</Typography>
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'right', position: 'relative' }}>
                ${totalAmount.toFixed(2)}
              </Typography>
              <TextField fullWidth label="Name" name="name" margin="normal" sx={{ backgroundColor: 'white' }} onChange={handleChange} />
              <TextField fullWidth label="Phone number" name="phoneNumber" margin="normal" sx={{ backgroundColor: 'white' }} onChange={handleChange} />
              <TextField fullWidth label="Email" name="email" margin="normal" sx={{ backgroundColor: 'white' }} onChange={handleChange} />
              <Button variant="contained" color="primary" fullWidth onClick={handleOrder} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Order'}
              </Button>
              {isError && <Alert severity="error">{message}</Alert>}
              {isSuccess && <Alert severity="success">Order placed successfully!</Alert>}
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

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/slices/cartSlice';
// import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
// import { Link as RouterLink } from 'react-router-dom';
// import { styled } from '@mui/material/styles';
// import { Divider } from '@mui/material';

// const calculateDiscount = (originalPrice, discountPrice) => {
//   if (!originalPrice || !discountPrice || originalPrice <= discountPrice) return 0;
//   return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
// };

// const DividerBox = styled(Box)(({ theme }) => ({
//   flexGrow: 1,
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const Cart = () => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector((state) => state.cart.totalAmount);

//   const handleRemoveFromCart = (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const handleIncrementQuantity = (id) => {
//     dispatch(incrementQuantity(id));
//   };

//   const handleDecrementQuantity = (id) => {
//     dispatch(decrementQuantity(id));
//   };

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <Container sx={{ mt: 6, p: { xs: 1, sm: 2, md: 3 } }}>
//       <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
//         <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', flex: '1 1 auto', minWidth: '200px' }}>
//           Shopping Cart
//         </Typography>
//         <Box sx={{ flex: '1 1 100%', display: 'flex', justifyContent: 'center', mx: 2 }}>
//           <Divider orientation="horizontal" flexItem sx={{ width: '100%' }} />
//         </Box>
//         <Button
//           variant="outlined"
//           component={RouterLink}
//           to="/sales/all"
//           sx={{ color: '#8B8B8B', fontSize: { xs: '12px', sm: '14px' }, flex: '1 1 auto', minWidth: '150px' }}
//         >
//           Back to the store
//         </Button>
//       </Box>
//       {cartItems.length === 0 ? (
//         <Typography variant="h6" component="div">
//           Your cart is empty.
//         </Typography>
//       ) : (
//         <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
//           {cartItems.map((item) => {
//             const itemTotalPrice = item.price * item.quantity;
//             const itemOriginalTotalPrice = item.originalPrice ? item.originalPrice * item.quantity : null;

//             return (
//               <Grid item key={item.id} sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
//                 <Card sx={{ display: 'flex', mb: 2, p: { xs: 1, sm: 2 }, flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
//                   <CardMedia
//                     component="img"
//                     sx={{ width: { xs: '100%', sm: 150 }, height: 'auto', transition: 'transform 0.3s ease', ":hover" : { transform: 'scale(1.05)', opacity: 0.8 } }}
//                     image={item.image ? `http://localhost:3333/${item.image}` : 'https://via.placeholder.com/200'}
//                     alt={item.title}
//                   />
//                   <CardContent sx={{ flex: 1 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontFamily: 'Montserrat',
//                           fontSize: { xs: '16px', sm: '18px' },
//                           textAlign: 'left',
//                           flex: '1 1 auto',
//                         }}
//                       >
//                         {item.title}
//                       </Typography>
//                       <Button variant="text" sx={{ fontFamily: 'Montserrat', fontSize: '16px', color: '#ccc', borderRadius: '2px', fontWeight: 'bold', ":hover" : {color: 'red'} }} onClick={() => handleRemoveFromCart(item.id)}>X</Button>
//                     </Box>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, flexWrap: 'wrap' }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '4px', p: 1 }}>
//                         <Button variant="outlined" sx={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }} onClick={() => handleDecrementQuantity(item.id)}>-</Button>
//                         <Typography variant="body1" sx={{ mx: 3, fontWeight: 'bold' }}>{item.quantity}</Typography>
//                         <Button variant="outlined" sx={{ borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc' }} onClick={() => handleIncrementQuantity(item.id)}>+</Button>
//                       </Box>
//                       <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', sm: 'flex-end' }, mt: { xs: 2, sm: 0 } }}>
//                         {item.originalPrice && item.price < item.originalPrice ? (
//                           <>
//                             <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: { xs: 'left', sm: 'right' } }}>
//                               ${itemTotalPrice.toFixed(0)}
//                             </Typography>
//                             <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through', textAlign: { xs: 'left', sm: 'right' } }}>
//                               ${itemOriginalTotalPrice.toFixed(2)}
//                             </Typography>
//                             <Typography variant="body2" sx={{ color: 'green', textAlign: { xs: 'left', sm: 'right' } }}>
//                               -{calculateDiscount(item.originalPrice, item.price)}%
//                             </Typography>
//                           </>
//                         ) : (
//                           <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: { xs: 'left', sm: 'right' } }}>
//                             ${itemTotalPrice.toFixed(0)}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//           <Grid item sx={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '500px' }}>
//             <Box sx={{ mt: 4, p: { xs: 2, sm: 3 }, backgroundColor: '#F1F3F4', borderRadius: 1, width: '100%' }}>
//               <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
//                 Order details
//               </Typography>
//               <Typography variant="h5" color={'textSecondary'}>{totalItems} items</Typography> 
//               <Typography variant="h5" color={'textSecondary'} sx={{ marginTop: 2 }}>Total</Typography> 
//               <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'right' }}>
//                 ${totalAmount.toFixed(2)}
//               </Typography>
//               <TextField fullWidth label="Name" margin="normal" sx={{ backgroundColor: 'white' }} />
//               <TextField fullWidth label="Phone number" margin="normal" sx={{ backgroundColor: 'white' }} />
//               <TextField fullWidth label="Email" margin="normal" sx={{ backgroundColor: 'white' }} />
//               <Button variant="contained" color="primary" fullWidth>
//                 Order
//               </Button>
//               {/* <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleClearCart}
//                 sx={{ mt: 2 }}
//                 fullWidth
//               >
//                 Clear Cart
//               </Button> */}
//             </Box>
//           </Grid>
//         </Grid>
//       )}
//       <Button
//         variant="contained"
//         component={RouterLink}
//         to="/"
//         sx={{ mt: 2 }}
//       >
//         Back to the store
//       </Button>
//     </Container>
//   );
// };

// export default Cart;