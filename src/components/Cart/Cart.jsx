import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../redux/slices/cartSlice.js";
import { saleRequestSend } from "../../redux/slices/saleRequestSlice.js";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  Alert,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import TitleDivider from "../TitleDivider.jsx";
import theme from "../../theme.js";
import { Add, Remove } from "@mui/icons-material";
import DialogWindow from "../DialogWindow/DialogWindow.jsx";
import {
  CartContainer,
  CustomCardMedia,
  QuantityControlBox,
  QuantityTypography,
  OrderDetailsBox,
  CustomTextField,
  CustomButton,
} from "./CartStyles";

const calculateDiscount = (originalPrice, discountPrice) => {
  if (!originalPrice || !discountPrice || originalPrice <= discountPrice)
    return 0;
  return Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
};

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoading, isError, message } = useSelector(
    (state) => state.saleRequest
  );
  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrementQuantity = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrementQuantity = (id) => {
    dispatch(decrementQuantity(id));
  };

  const onSubmit = (data) => {
    setFormSubmitted(true);
    if (isValid) {
      const orderDetails = {
        customerDetails: data,
        items: cartItems,
        totalAmount: totalAmount,
      };

      dispatch(saleRequestSend(orderDetails));
      setOpen(true);
      localStorage.clear();
      reset();
    }
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.clear();
    reset();
    window.location.reload();
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContainer>
      <TitleDivider
        title="Shopping Cart"
        buttonTitle="Back to the store"
        buttonPath="/sales/all"
      />
      {cartItems.length === 0 ? (
        <Typography variant="h6" component="div">
          Your cart is empty.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={8}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {cartItems.map((item) => {
              const itemTotalPrice = item.price * item.quantity;
              const itemOriginalTotalPrice = item.originalPrice
                ? item.originalPrice * item.quantity
                : null;

              return (
                <Card
                  key={item.id}
                  sx={{
                    display: "flex",
                    mb: 2,
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <CustomCardMedia
                    component="img"
                    image={
                      item.image
                        ? `http://localhost:3333/${item.image}`
                        : "shopping cart placeholder"
                    }
                    alt={item.title}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Montserrat",
                          textAlign: "left",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Button
                        variant="text"
                        sx={{
                          fontFamily: "Montserrat",
                          fontSize: "16px",
                          color: "#ccc",
                          borderRadius: "2px",
                          fontWeight: "bold",
                          ":hover": { color: "red" },
                        }}
                        onClick={() => handleRemoveFromCart(item.id)}
                      >
                        X
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: isSmallScreen ? "column" : "row",
                        alignItems: isSmallScreen ? "flex-start" : "center",
                        justifyContent: "space-between",
                        mt: 2,
                      }}
                    >
                      <QuantityControlBox>
                        <IconButton
                          variant="outlined"
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "60px",
                            height: "40px",
                          }}
                          onClick={() => handleDecrementQuantity(item.id)}
                        >
                          <Remove />
                        </IconButton>
                        <QuantityTypography variant="body1">
                          {item.quantity}
                        </QuantityTypography>
                        <IconButton
                          variant="outlined"
                          sx={{
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            width: "60px",
                            height: "40px",
                          }}
                          onClick={() => handleIncrementQuantity(item.id)}
                        >
                          <Add />
                        </IconButton>
                      </QuantityControlBox>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isSmallScreen ? "flex-start" : "flex-end",
                        }}
                      >
                        {item.originalPrice &&
                        item.price < item.originalPrice ? (
                          <>
                            <Typography
                              variant={isSmallScreen ? "body2" : "h6"}
                              sx={{ fontWeight: "bold" }}
                            >
                              ${itemTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography
                              variant={isSmallScreen ? "body2" : "h6"}
                              color="textSecondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              ${itemOriginalTotalPrice.toFixed(2)}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "green" }}>
                              -
                              {calculateDiscount(
                                item.originalPrice,
                                item.price
                              )}
                              %
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            variant={isSmallScreen ? "h6" : "h4"}
                            sx={{ fontWeight: "bold" }}
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
            <OrderDetailsBox>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
                Order details
              </Typography>
              <Typography variant="h5" color={"textSecondary"}>
                {totalItems} items
              </Typography>
              <Typography
                variant="h5"
                color={"textSecondary"}
                sx={{ marginTop: 2, position: "absolute" }}
              >
                Total
              </Typography>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  textAlign: "right",
                  position: "relative",
                }}
              >
                ${totalAmount.toFixed(2)}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Name"
                      fullWidth
                      margin="normal"
                      error={!!errors.name}
                      helperText={errors.name ? errors.name.message : ""}
                    />
                  )}
                />
                <Controller
                  name="phoneNumber"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Phone number must contain only numbers",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Phone number"
                      fullWidth
                      margin="normal"
                      error={!!errors.phoneNumber}
                      helperText={
                        errors.phoneNumber ? errors.phoneNumber.message : ""
                      }
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      label="Email"
                      fullWidth
                      margin="normal"
                      error={!!errors.email}
                      helperText={errors.email ? errors.email.message : ""}
                    />
                  )}
                />
                <CustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Order"}
                </CustomButton>
                {!isValid && formSubmitted && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ textAlign: "center", marginTop: 2 }}
                  >
                    {/* Please fill in all the fields correctly to proceed */}
                  </Typography>
                )}
              </form>
              {isError && <Alert severity="error">{message}</Alert>}
              <DialogWindow open={open} handleClose={handleClose} />
            </OrderDetailsBox>
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
    </CartContainer>
  );
};

export default Cart;
