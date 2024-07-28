import { Box, Typography, TextField, FormControlLabel,  FormControl } from "@mui/material";
import { styled } from "@mui/system";

export const FilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

export const PriceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: theme.spacing({ xs: 2, sm: 0 }),
}));

export const PriceTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing({ xs: 1, sm: 0 }),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing({ xs: 1, sm: 0 }),
  width: { xs: "100%", sm: "auto" },
}));

export const DiscountCheckbox = styled(FormControlLabel)(({ theme }) => ({
  marginRight: theme.spacing(4),
  marginBottom: theme.spacing({ xs: 1, sm: 0 }),
}));

export const SortContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: theme.spacing({ xs: 2, sm: 0 }),
}));

export const SortTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(2),
  marginBottom: theme.spacing({ xs: 1, sm: 0 }),
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: { xs: "100%", sm: 200 },
}));