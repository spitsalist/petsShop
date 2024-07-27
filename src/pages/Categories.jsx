import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../redux/slices/categoriesSlice";
import { Typography, Grid, Card, CardMedia, Box } from "@mui/material";
import BreadcrumbsComponent from "../components/BreadcrumbsComponent.jsx";
import TitleDivider from "../components/TitleDivider.jsx";
import VerticalTitle from "../components/VerticalTitle.jsx";

const Categories = ({ home = false }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const breadcrumbs = [
    { path: "/", title: "Main page" },
    { path: "/categories", title: "All categories" },
  ];

  return (
    <>
      {home ? (
        <TitleDivider
          title="Categories"
          buttonTitle="All Categories"
          buttonPath="/categories"
        />
      ) : (
        <>
          <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
          <VerticalTitle title="Categories" />
        </>
      )}

      <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
        <Grid container spacing={2} sx={{ maxWidth: "1200px" }}>
          {categories?.map((category) => (
            <Grid item key={category.id} xs={11} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  background: "none",
                  boxShadow: "none",
                  textAlign: "center",
                }}
              >
                <RouterLink
                  to={`/categories/${category.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "contain",
                      opacity: 1,
                      cursor: "pointer",
                      "&:hover": { opacity: 0.9 },
                    }}
                    image={
                      category.image
                        ? `http://localhost:3333/${category.image}`
                        : "product pets image"
                    }
                    alt={category.title}
                  />
                </RouterLink>
                <Box sx={{ textAlign: "center", mt: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {category.title}
                  </Typography>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Categories;
