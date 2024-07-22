import { Container, Box, Typography, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';
import bannerImage from './../assets/pets.png';
import Categories from './Categories';
import DiscountForm from './../components/DiscountForm';
import Sales from './../pages/Sales';

const Banner = styled(Box)(({ theme }) => ({
  backgroundImage: `url(${bannerImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '100vw',
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: 'white',
  padding: 0,
  [theme.breakpoints.down('md')]: {
    height: '300px',
  },
}));

const BannerText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '96px',
  fontWeight: 700,
  lineHeight: '105.6px',
  textAlign: 'left',
  marginBottom: 0,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  [theme.breakpoints.down('md')]: {
    fontSize: '48px',
    lineHeight: '52.8px',
    textAlign: 'center',
    width: '100%',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    lineHeight: '28px',
    textAlign: 'center',
    width: '100%',
  },
}));

const BannerButton = styled(Button)(({ theme }) => ({
  fontSize: '20px',
  padding: '16px 56px',
  gap: '10px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#0D50FF',
  color: 'white',
  textTransform: 'none',
  opacity: 1,
  marginTop: '20px',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
    width: 'auto',
    height: 'auto',
    padding: '10px 20px',
    alignSelf: 'center',
  },
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const DividerBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const Home = () => {
  return (
    <Box>
      <Banner>
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' }, justifyContent: 'center', height: '100%' }}>
          <BannerText variant="h1">
            Amazing Discounts
          </BannerText>
          <BannerText variant="h1">
            on Pets Products!
          </BannerText>
          <BannerButton variant="contained">
            Check out
          </BannerButton>
        </Container>
      </Banner>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <HeaderBox>
          <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
            Categories
          </Typography>
          <DividerBox>
            <Divider orientation="horizontal" flexItem sx={{ mx: 2, width: '100%' }} />
          </DividerBox>
          <Button variant="outlined">All categories</Button>
        </HeaderBox>
        <Categories displayedCategories={4} />
      </Container>
      <Box my={4}>
        <DiscountForm />
        <Box my={4}>
          <Sales sliceSales />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;