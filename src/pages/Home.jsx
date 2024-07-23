import {  Box } from '@mui/material';
// import { styled } from '@mui/system';
import Categories from './Categories';
import DiscountForm from './../components/DiscountForm';
import Sales from './../pages/Sales';
import BannerComponent from "../components/BannerComponent.jsx";


const Home = () => {
  return (
  <>
    <BannerComponent />

      <Box sx={{ mt: 4 }}>

        <Categories displayedCategories={4} />
      <Box my={4}>
        <DiscountForm />
        <Box my={4}>
          <Sales home />
        </Box>
      </Box>
    </Box>
</>
  );
};

export default Home;