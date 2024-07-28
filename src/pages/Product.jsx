import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import CardComponent from '../components/CardComponent/CardComponent.jsx';
import FilterDefinition from '../components/FilterDefinition/FilterDefinition.jsx';
import { fetchAllProducts } from "../redux/slices/productsSlice";
import VerticalTitle from  '../components/VerticalTitle.jsx';
import BreadcrumbsComponent from '../components/Breadcrumbs/BreadcrumbsComponent.jsx';

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          {message || "Error loading products."}
        </Typography>
      </Box>
    );
  }

  const breadcrumbs = [
    { path: "/", title: "Main page" },
    { path: "/products", title: "All products" },
  ];

  return (
    <Box sx={{ mt: 6 }}>
      <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
      <VerticalTitle title="All Products" />
      <FilterDefinition
        products={products}
        setFilteredProducts={setFilteredProducts}
      />
      <Grid container spacing={2}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <CardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
