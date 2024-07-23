import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {Grid, Button, Typography, Box, Divider, Link, Breadcrumbs} from '@mui/material';
import { styled } from '@mui/system';
import CardComponent from "../components/CardComponent.jsx";
import FilterDefinition from "../components/FilterDefinition.jsx";

const HeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
}));

const DividerBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  margin: theme.spacing(0, 2),
}));

const Sales = ({home = false}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3333/products/all')
      .then(response => setProducts(home ? response.data.slice(0, 4) : response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [ home ]);

  console.log(products);

  const resultProducts = home ? products : filteredProducts

  return (
    <Box  sx={{ mt: 6 }}>

        {!home && (
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Main page
                </Link>
                <Link underline="hover" color="inherit" href="/sales/all">
                    All Sales
                </Link>
            </Breadcrumbs>
        )}

        {home ? (

      <HeaderBox>
        <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', paddingRight: 2 }}>
          Sales
        </Typography>
        <DividerBox>
          <Divider orientation="horizontal" flexItem sx={{ width: '100%' }} />
        </DividerBox>
        <Button
          sx={{
            textTransform: 'none',
            width: 'auto',
            height: '36px',
            textAlign: 'center',
            padding: '0 16px',
            whiteSpace: 'nowrap'
          }}
          variant="outlined"
          component={RouterLink}
          to="/sales/all"
        >
          All sales
        </Button>
      </HeaderBox>) : (
          <Typography>Discounted items</Typography>
        )}

      {!home && (
        <FilterDefinition products={products} setFilteredProducts={setFilteredProducts} onSale />)}
      <Grid container spacing={4}>
        {resultProducts.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
              <CardComponent product={product} />

          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sales;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Container, Grid, Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

// const DiscountedSales = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3333/products/all')
//       .then(response => {
//         const discountedProducts = response.data.filter(product => product.discont_price < product.price);
//         setProducts(discountedProducts);
//       })
//       .catch(error => console.error('Error fetching products:', error));
//   }, []);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold', paddingRight: 2, marginBottom: 4 }}>
//         All Discounted Sales
//       </Typography>
//       <Grid container spacing={4}>
//         {products.map(product => (
//           <Grid item key={product.id} xs={12} sm={6} md={3}>
//             <Card sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'space-between',
//               height: '100%',
//               transition: 'transform 0.3s, box-shadow 0.3s',
//               '&:hover': {
//                 transform: 'scale(1.05)',
//                 boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
//               },
//             }}>
//               <Box sx={{
//                 position: 'relative',
//                 overflow: 'hidden',
//                 borderTopLeftRadius: 8,
//                 borderTopRightRadius: 8,
//               }}>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   sx={{
//                     objectFit: 'contain',
//                     cursor: 'pointer',
//                     transition: 'opacity 0.2s',
//                     '&:hover': { opacity: 0.8 },
//                   }}
//                   image={product.image ? `http://localhost:3333/${product.image}` : 'https://via.placeholder.com/200'}
//                   alt={product.title}
//                 />
//               </Box>
//               <CardContent sx={{
//                 flex: '1 0 auto',
//                 padding: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'flex-start',
//               }}>
//                 <Typography 
//                   gutterBottom 
//                   variant="h6" 
//                   component="div" 
//                   sx={{ 
//                     fontSize: '16px', 
//                     whiteSpace: 'nowrap', 
//                     overflow: 'hidden', 
//                     textOverflow: 'ellipsis',
//                   }}>
//                   {product.title}
//                 </Typography>
//                 <Typography variant="h6" color="textSecondary" sx={{ fontSize: '14px' }}>
//                   <Box component="span" sx={{ fontSize: '30px', fontWeight: 'bold' }}>
//                     ${product.discont_price}
//                   </Box> 
//                   <Box component="span" sx={{ fontSize: '18px', textDecoration: 'line-through', marginLeft: 1 }}>
//                     ${product.price}
//                   </Box>
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default DiscountedSales;














