import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../redux/slices/categoriesSlice';
import { Typography, Grid, Card, CardMedia, Box, Divider, Button, Breadcrumbs, Link } from '@mui/material';
import { styled } from "@mui/system";

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

const Categories = ({ home = false }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    return (
        <>
            {!home && (
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                    <Link underline="hover" color="inherit" component={RouterLink} to="/">
                        Main page
                    </Link>
                    <Link underline="hover" color="inherit" component={RouterLink} to="/categories">
                        All categories
                    </Link>
                </Breadcrumbs>
            )}
            <HeaderBox>
                 
                 
               
                <Typography variant="h4" component="h4" sx={{ fontWeight: 'bold' }}>
                    Categories
                </Typography>
                <DividerBox>
                    <Divider orientation="horizontal" flexItem sx={{ mx: 2 }} />
                </DividerBox>
                <Button variant="outlined" component={RouterLink} to="/categories">All categories</Button>

            </HeaderBox>
            <Box sx={{ mt: 6 }}>
                <Grid container spacing={4}>
                    {categories?.map(category => (
                        <Grid item key={category.id} xs={12} sm={6} md={3}>
                            <Card sx={{ background: 'none', boxShadow: 'none', textAlign: 'center' }}>
                                <RouterLink to={`/categories/${category.id}`} style={{ textDecoration: 'none' }}>
                                    <CardMedia
                                        component="img"
                                        height="280"
                                        sx={{
                                            objectFit: 'contain',
                                            opacity: 1,
                                            cursor: 'pointer',
                                            '&:hover': { opacity: 0.9 }
                                        }}
                                        image={category.image ? `http://localhost:3333/${category.image}` : 'product pets image'}
                                        alt={category.title}
                                    />
                                </RouterLink>
                                <Box sx={{ textAlign: 'center', mt: 1 }}>
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