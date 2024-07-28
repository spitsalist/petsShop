import { Box,  TextField, Button } from "@mui/material";
import { styled } from "@mui/system";

export const DiscountSection = styled(Box)(({ theme }) => ({
  gap: "16px",
  borderRadius: "16px",
  background: "linear-gradient(261.47deg, #2451C6 32.63%, #0D50FF 98.96%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  position: "relative",
  opacity: 1,
  padding: 0,
  width: "90%",
  "@media (max-width: 870px)": {
    width: "100%",
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "50%",
  borderRadius: "16px",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: theme.spacing(3),
  "@media (max-width: 900px) and (min-width: 320px)": {
    width: "90%",
  },
}));

export const ContentBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const PetImageBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "783px",
  height: "100%",
  gap: "0px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  "@media (max-width: 600px)": {
    fontSize: "14px",
    width: "80%",
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: "#282828",
  padding: "12px 40px",
  width: "100%",
  borderRadius: "8px",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#fff",
  },
  "@media (max-width: 600px)": {
    padding: "8px 20px",
    fontSize: "14px",
    width: "80%",
  },
}));