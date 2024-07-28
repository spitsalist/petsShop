import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bannerImage from './../../assets/pets.png';

export const Banner = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  height: "600px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  color: "white",
  padding: 0,
  [theme.breakpoints.down("md")]: {
    height: "300px",
  },
}));

export const BannerText = styled(Typography)(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
  fontSize: "96px",
  fontWeight: 700,
  lineHeight: "105.6px",
  textAlign: "left",
  marginBottom: 0,
  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
  [theme.breakpoints.down("md")]: {
    fontSize: "48px",
    lineHeight: "52.8px",
    textAlign: "center",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    lineHeight: "28px",
    textAlign: "center",
  },
}));

export const BannerButton = styled(Button)(({ theme }) => ({
  fontSize: "20px",
  padding: "16px 56px",
  gap: "10px",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#0D50FF",
  color: "white",
  textTransform: "none",
  opacity: 1,
  marginTop: "20px",
  fontFamily: "Montserrat, sans-serif",
  fontWeight: 600,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    height: "auto",
    padding: "10px 20px",
    alignSelf: "center",
  },
}));