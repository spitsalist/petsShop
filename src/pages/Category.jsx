import React, { useEffect, useState } from 'react';
import {NavLink, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryById } from "../redux/slices/categoriesSlice";
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  Breadcrumbs
} from '@mui/material';
import CardComponent from "../components/CardComponent.jsx";
import FilterDefinition from "../components/FilterDefinition.jsx";

const Category = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    dispatch(fetchCategoryById(categoryId));
  }, [categoryId, dispatch]);

  const { categoryData, isLoading: categoryLoading, isError: categoryError, message } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (categoryData?.data) {
      setFilteredProducts(categoryData.data);
      setIsLoading(false);
    }
  }, [categoryData]);



  if (isLoading || categoryLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || categoryError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {message}
        </Typography>
      </Box>
    );
  }

  return (
      <>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink underline="hover" color="inherit" to="/">
            Main page
          </NavLink>
          <NavLink underline="hover" color="inherit" to="/categories">
            Categories
          </NavLink>
          <NavLink to={`/categories/${categoryData?.category?.id}`} underline="hover" color="inherit">
            {categoryData?.category?.title}
          </NavLink>
        </Breadcrumbs>
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {categoryData?.category?.title}
      </Typography>
      <FilterDefinition products={categoryData} setFilteredProducts={setFilteredProducts}  />
      <Grid container spacing={4}>
        {filteredProducts && filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <CardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
        </>
  );
};

export default Category;