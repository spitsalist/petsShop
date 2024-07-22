import { Container, Box, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PetImage from './../assets/images/404.png';

const PageNotFound = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          component="img"
          src={PetImage}
          alt="page not found"
          sx={{ width: '100%', height: 'auto', maxWidth: '400px' }}
        />
      </Box>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontFamily: 'Montserrat',
          fontSize: '64px',
          fontWeight: 700,
          lineHeight: '70.4px',
          textAlign: 'center',
        }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 4,
          fontFamily: 'Montserrat',
          fontSize: '20px',
          fontWeight: 500,
          lineHeight: '26px',
          textAlign: 'center',
          color: '#8B8B8B',
          padding: '10px 20px',
          borderRadius: '4px',
        }}
      >
        We’re sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage.
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to="/"
        sx={{

          padding: '16px 56px',
          gap: '10px',
          borderRadius: '8px', 
          backgroundColor: '#0D50FF',
          textTransform: 'none',
          fontSize: '20px', 
          fontFamily: 'Montserrat',
          fontWeight: 600, 
          lineHeight: '26px', 
          textAlign: 'center', 
          opacity: 1,
          transition: 'transform 0.2s, background-color 0.2s',
          '&:hover': {
            backgroundColor: '#0841d9', 
            transform: 'scale(1.05)', 
          },
        }}
      >
        Go Home
      </Button>
    </Container>
  );
};

export default PageNotFound;