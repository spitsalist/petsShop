import { useState } from "react";
import { Button, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice.js';
import {
  CardBox,
  DiscountBadge,
  MediaBox,
  StyledCardMedia,
  HoverBox,
  ProductTitle,
  PriceBox,
  DiscountPrice,
  OriginalPrice,
  RegularPrice,
} from "./CardComponentStyles";

const CardComponent = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.discont_price || product.price,
        originalPrice: product.price,
        totalPrice: product.discont_price || product.price,
        quantity: 1,
      })
    );
  };

  const handleRemoveFromCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(removeFromCart(product.id));
  };

  const isInCart = (productId) =>
    cartItems.some((item) => item.id === productId);

  const redirectToProduct = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <CardBox
      onClick={redirectToProduct}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.discont_price && (
        <DiscountBadge>
          -{Math.round((1 - product.discont_price / product.price) * 100)}%
        </DiscountBadge>
      )}
      <MediaBox>
        <StyledCardMedia
          component="img"
          image={
            product.image
              ? `http://localhost:3333/${product.image}`
              : "product pets"
          }
          alt={product.title}
        />
        {isHovered && (
          <HoverBox>
            {isInCart(product.id) ? (
              <Button
                size="medium"
                onClick={(e) => handleRemoveFromCart(product, e)}
                variant="outlined"
                sx={{
                  width: "100%",
                  color: "white",
                  borderColor: "black",
                  backgroundColor: "black",
                  "&:hover": {
                    backgroundColor: "gray",
                    borderColor: "gray",
                  },
                }}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                size="medium"
                onClick={(e) => handleAddToCart(product, e)}
                variant="contained"
                sx={{
                  width: "100%",
                  "&:hover": {},
                }}
              >
                Add to Cart
              </Button>
            )}
          </HoverBox>
        )}
      </MediaBox>
      <CardContent
        sx={{
          flex: "1 0 auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <ProductTitle gutterBottom variant="h6" component="div">
          {product.title}
        </ProductTitle>
        <Typography variant="h6" sx={{ fontSize: "14px" }}>
          {product.discont_price ? (
            <PriceBox>
              <DiscountPrice>${product.discont_price}</DiscountPrice>
              <OriginalPrice>${product.price}</OriginalPrice>
            </PriceBox>
          ) : (
            <RegularPrice>${product.price}</RegularPrice>
          )}
        </Typography>
      </CardContent>
    </CardBox>
  );
};

export default CardComponent;