import { Box, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const CardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: 1,
  border: "1px solid #e0e0e0",
  position: "relative",
  cursor: "pointer",
  "&:hover": { boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)" },
}));

export const DiscountBadge = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "0",
  backgroundColor: "#2979ff",
  color: "white",
  padding: "5px 10px",
  fontSize: "14px",
  borderRadius: "4px",
  zIndex: 1,
}));

export const MediaBox = styled(Box)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: "280px",
  objectFit: "contain",
  opacity: 1,
  "&:hover": { opacity: 0.9 },
  "@media (max-width: 600px)": {
    height: "280px",
    objectFit: "contain",
  },
}));

export const HoverBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  padding: "10px",
}));

export const ProductTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#282828",
}));

export const PriceBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

export const DiscountPrice = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
  color: "#ff1744",
}));

export const OriginalPrice = styled(Box)(({ theme }) => ({
  fontSize: "18px",
  textDecoration: "line-through",
  marginLeft: theme.spacing(1),
  color: "#b0bec5",
}));

export const RegularPrice = styled(Box)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: "bold",
}));