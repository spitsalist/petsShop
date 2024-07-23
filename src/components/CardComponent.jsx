import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const CardComponent = ({ product }) => {
    const dispatch = useDispatch();
    const [isHovered, setIsHovered] = useState(false);
    const handleAddToCart = (product) => {
        dispatch(addToCart({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.discont_price || product.price,
            totalPrice: product.discont_price || product.price,
            quantity: 1,
        }));
    };
    const cartItems = useSelector((state) => state.cart.items);

    const isInCart = (productId) => {
        return cartItems.some(item => item.id === productId);
    };

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                
                // width: '260px',
                // transition: 'transform 0.3s, box-shadow 0.3s',
                // '&:hover': {
                //     transform: 'scale(1.05)',
                //     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                // },
                borderRadius: 1,
                border: '1px solid #e0e0e0',
                position: 'relative',
            }}


            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {product.discont_price && (
                <Box sx={{
                    position: 'absolute',
                    top: '20px',
                    right: '0',
                    backgroundColor: '#2979ff',
                    color: 'white',
                    padding: '5px 10px',
                    fontSize: '14px',
                    borderRadius: '4px',
                    zIndex: 1,
                }}>
                    -{Math.round((1 - product.discont_price / product.price) * 100)}%
                </Box>
            )}
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                <CardMedia
                    component="img"
                    sx={{
                        objectFit: 'contain',
                        opacity: 1,
                        cursor: 'pointer',
                        '&:hover': { opacity: 0.9 }
                    }}
                    image={product.image ? `http://localhost:3333/${product.image}` : 'https://via.placeholder.com/200'}
                    alt={product.title}
                />
                {isHovered && (
                    <Box sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        
                        padding: '10px',
                    }}>
                        <Button
                        component={RouterLink}
                        to={`/products/${product.id}`}
                            size="md"
                            onClick={() => handleAddToCart(product)}
                            variant={isInCart(product.id) ? 'outlined' : 'contained'}
                            sx={{ 
                                width: '100%', 
                                color: 'white',
                                backgroundColor: isInCart(product.id) ? 'black' : 'primary.main',
                                '&:hover': {
                                    backgroundColor: '#ccc',
                                    borderColor: '#ccc',
                                }
                            }}
                        >
                            {isInCart(product.id) ? 'Added' : 'Add to Cart'}
                        </Button>
                    </Box>
                )}
            </Box>
            <CardContent sx={{
                flex: '1 0 auto',
                padding: 2,
                gap: 1,
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
                        color: '#282828',
                    }}>
                    {product.title}
                </Typography>
                <Typography variant="h6" sx={{ fontSize: '14px' }}>
                    {product.discont_price ? (
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box component="span" sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff1744' }}>
                                ${product.discont_price}
                            </Box>
                            <Box component="span" sx={{ fontSize: '18px', textDecoration: 'line-through', marginLeft: 1, color: '#b0bec5' }}>
                                ${product.price}
                            </Box>
                        </Box>
                    ) : (
                        <Box component="span" sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                            ${product.price}
                        </Box>
                    )}
                </Typography>
            </CardContent>
            <CardActions sx={{ padding: '16px', justifyContent: 'center' }}>

            </CardActions>
        </Box>
    );
};

export default CardComponent;







