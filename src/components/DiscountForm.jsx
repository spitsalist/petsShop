import { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { saleRequestSend } from "./../redux/slices/saleRequestSlice";
import PetImage from "./../assets/images/pets.png";
import DialogWindow from "./DialogWindow";

const DiscountSection = styled(Box)(({ theme }) => ({
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

const FormBox = styled(Box)(({ theme }) => ({
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

const ContentBox = styled(Box)(({ theme }) => ({
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

const PetImageBox = styled(Box)(({ theme }) => ({
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

const DiscountForm = () => {
  const { control, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);

  const onSubmit = (data) => {
    dispatch(saleRequestSend(data));
    setDialogOpen(true);
    reset();
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box>
      <DiscountSection>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "Montserrat",
            fontWeight: 700,
            mb: 6,
            color: "white",
            width: "100%",
            textAlign: "center",
            fontSize: "54px",
            marginTop: "20px",
            "@media (max-width:600px)": {
              fontSize: "26px",
            },
          }}
        >
          5% off on the first order
        </Typography>
        <ContentBox>
          <PetImageBox>
            <Box
              component="img"
              src={PetImage}
              alt="Pets"
              sx={{ width: "100%", height: "auto" }}
            />
          </PetImageBox>
          <FormBox component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "MuiOutlinedInput-notchedOutline",
                    },
                  }}
                  sx={{
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
                    "@media (max-width:600px)": {
                      fontSize: "14px",
                      width: "80%",
                    },
                  }}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone number"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{
                    pattern: "^\\d{10}$",
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "MuiOutlinedInput-notchedOutline",
                    },
                  }}
                  sx={{
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
                    "@media (max-width:600px)": {
                      fontSize: "14px",
                      width: "80%",
                    },
                  }}
                  error={!/^\d{10}$/.test(field.value) && field.value !== ""}
                  helperText={
                    !/^\d{10}$/.test(field.value) && field.value !== ""
                      ? "Please enter a valid 10-digit phone number"
                      : ""
                  }
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{ style: { color: "white" } }}
                  InputProps={{
                    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                    style: { color: "white" },
                    classes: {
                      notchedOutline: "MuiOutlinedInput-notchedOutline",
                    },
                  }}
                  sx={{
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
                    "@media (max-width:600px)": {
                      fontSize: "14px",
                      width: "80%",
                    },
                  }}
                  error={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) &&
                    field.value !== ""
                  }
                  helperText={
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value) &&
                    field.value !== ""
                      ? "Please enter a valid email address"
                      : ""
                  }
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#282828",
                padding: "12px 40px",
                width: "100%",
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#fff",
                },
                "@media (max-width:600px)": {
                  padding: "8px 20px",
                  fontSize: "14px",
                  width: "80%",
                },
              }}
            >
              Get a discount
            </Button>
          </FormBox>
        </ContentBox>
      </DiscountSection>
      <DialogWindow open={dialogOpen} handleClose={handleClose} />
    </Box>
  );
};

export default DiscountForm;
