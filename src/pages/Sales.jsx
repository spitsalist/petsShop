import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import CardComponent from "../components/CardComponent.jsx";
import FilterDefinition from "../components/FilterDefinition.jsx";
import { fetchAllProducts } from "../redux/slices/productsSlice";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent.jsx";
import TitleDivider from "../components/TitleDivider.jsx";
import VerticalTitle from "../components/VerticalTitle.jsx";

const Sales = ({ home = false }) => {
  const dispatch = useDispatch();
  const {
    products = [],
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.products);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (home) {
      setFilteredProducts(products.slice(0, 4));
    } else {
      setFilteredProducts(products);
    }
  }, [products, home]);

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
    { path: "/sales/all", title: "All Sales" },
  ];

  return (
    <Box sx={{ mt: 6, }}>
      {!home && <BreadcrumbsComponent breadcrumbs={breadcrumbs}  />}

      {home ? (
        <TitleDivider
          title="Sales"
          buttonTitle="All Sales"
          buttonPath="/sales/all"
        />
      ) : (
        <VerticalTitle title="Discounted Items" />
      )}

      {!home && (
        <FilterDefinition
          products={products}
          setFilteredProducts={setFilteredProducts}
          onSale
        />
      )}

      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={3}>
            <CardComponent product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Sales;
