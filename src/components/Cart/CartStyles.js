import { Box, CardMedia, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

export const CartContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(6),
  marginBottom: theme.spacing(6),
}));

export const CustomCardMedia = styled(CardMedia)(({ theme }) => ({
  width: "220px",
  objectFit: "contain",
  transition: "transform 0.3s ease",
  ":hover": {
    transform: "scale(1.05)",
    opacity: 0.8,
  },
  "@media (max-width: 900px)": {
    width: "320px",
    objectFit: "cover",
    objectPosition: "center",
    display: "flex",
    flexDirection: "row",
    fontSize: "6px",
  },
}));

export const QuantityControlBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.breakpoints.down("xs") ? theme.spacing(1) : 0,
}));

export const QuantityTypography = styled(Typography)(({ theme }) => ({
  border: "1px solid #ccc",
  borderLeft: "none",
  borderRight: "none",
  width: "80px",
  height: "37px",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const OrderDetailsBox = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: 0,
  padding: theme.spacing(2),
  backgroundColor: "#F1F3F4",
  border: "1px solid #ccc",
  borderRadius: theme.shape.borderRadius,
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: "white",
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));