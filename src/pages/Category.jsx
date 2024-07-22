import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById } from "../redux/slices/categoriesSlice";
import { Card, CardMedia, CardContent, Typography, Container, Grid, CircularProgress, Box } from '@mui/material';

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [categoryId, dispatch]);

  const { categoryData, isLoading, isError, message } = useSelector(
    (state) => state.categories
  );

  const categoryTitle = categoryData?.category?.title;
  const categoryProducts = categoryData?.data;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {categoryTitle}
      </Typography>
      <Grid container spacing={4}>
        {categoryProducts && categoryProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <Card sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between', 
              height: '100%', 
              transition: 'transform 0.3s, box-shadow 0.3s', 
              '&:hover': { 
                transform: 'scale(1.05)', 
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', 
              } 
            }}>
              <Box sx={{ 
                position: 'relative', 
                overflow: 'hidden', 
                borderTopLeftRadius: 8, 
                borderTopRightRadius: 8, 
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  sx={{
                    objectFit: 'contain',
                    cursor: 'pointer',
                    transition: 'opacity 0.2s',
                    '&:hover': { opacity: 0.8 },
                  }}
                  image={product.image ? `http://localhost:3333/${product.image}` : 'https://via.placeholder.com/200'}
                  alt={product.title}
                />
              </Box>
              <CardContent sx={{
                flex: '1 0 auto',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
              }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                  {product.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ fontSize: '14px' }}>
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Category;