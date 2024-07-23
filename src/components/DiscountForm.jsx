import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import PetImage from './../assets/images/pets.png';

const DiscountSection = styled(Box)(({ theme }) => ({
  gap: '16px',
  borderRadius: '16px',
  background: 'linear-gradient(261.47deg, #2451C6 32.63%, #0D50FF 98.96%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  position: 'relative',
  opacity: 1,
  // padding: theme.spacing(3),
}));

const FormBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  maxWidth: '450px',
  borderRadius: '16px',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const PetImageBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '783px',
  height: '100%',
  gap: '0px',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const DiscountForm = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3333/sale/send', data);
      console.log('Success:', response.data);
      reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box>
      <DiscountSection>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'Montserrat',
            fontWeight: 700,
            mb: 6,
            color: 'white',
            width: '100%',
            textAlign: 'center',
            fontSize: '54px',
            marginTop: '20px',
            '@media (max-width:600px)': {
              fontSize: '32px',
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
              sx={{ width: '100%', height: 'auto' }}
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
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      notchedOutline: 'MuiOutlinedInput-notchedOutline',
                    },
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
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
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      notchedOutline: 'MuiOutlinedInput-notchedOutline',
                    },
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
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
                  InputLabelProps={{ style: { color: 'white' } }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      notchedOutline: 'MuiOutlinedInput-notchedOutline',
                    },
                  }}
                  sx={{
                    width: '100%',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                      },
                      '&:hover fieldset': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white',
                      },
                    },
                  }}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#282828',
                padding: '12px 40px',
                width: '100%',
                borderRadius: '8px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#fff',
                },
              }}
            >
              Get a discount
            </Button>
          </FormBox>
        </ContentBox>
      </DiscountSection>
    </Box>
  );
};

export default DiscountForm;