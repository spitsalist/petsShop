import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React, {useEffect, useState} from "react";

const FilterDefinition = ({ setFilteredProducts, products, onSale=false }) => {
    const [sortOption, setSortOption] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [showDiscounted, setShowDiscounted] = useState(onSale);
    useEffect(() => {
        if (!products) {
            return;
        }
        const applyPriceFilter = (products) => {
            return products.filter((product) => {
                const price = product.discont_price || product.price;
                if (minPrice && price < minPrice) return false;
                if (maxPrice && price > maxPrice) return false;
                if (showDiscounted && !product.discont_price) return false;
                return true;
            });
        }

        const sortedAndFilteredProducts = () => {
            let filteredProducts = applyPriceFilter(products);
            if (sortOption === 'newest') {
                return filteredProducts.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (sortOption === 'price-high-low') {
                return filteredProducts.slice().sort((a, b) => {
                    const priceA = a.discont_price ? a.discont_price : a.price;
                    const priceB = b.discont_price ? b.discont_price : b.price;
                    return priceB - priceA;
                });
            } else if (sortOption === 'price-low-high') {
                return filteredProducts.slice().sort((a, b) => {
                    const priceA = a.discont_price ? a.discont_price : a.price;
                    const priceB = b.discont_price ? b.discont_price : b.price;
                    return priceA - priceB;
                });
            } else {
                return filteredProducts;
            }
        };

        setFilteredProducts(sortedAndFilteredProducts());
    }, [products, sortOption, minPrice, maxPrice, showDiscounted]);

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]\d*$/.test(value)) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[1-9]\d*$/.test(value)) {
            setMaxPrice(value);
        }
    };

    const handleDiscountChange = (event) => {
        setShowDiscounted(event.target.checked);
    };
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Price</Typography>
            <TextField
                label="from"
                variant="outlined"
                size="small"
                value={minPrice}
                onChange={handleMinPriceChange}
                sx={{ mr: 2 }}
            />
            <TextField
                label="to"
                variant="outlined"
                size="small"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                sx={{ mr: 4 }}
            />
            {!onSale && (
            <FormControlLabel
                control={<Checkbox checked={showDiscounted} onChange={handleDiscountChange} />}
                label="Discounted items"
                sx={{ mr: 4 }}
            />)}
            <Typography variant="body1" sx={{ mr: 2 }}>Sorted</Typography>
            <FormControl variant="outlined" size="small">
                <Select
                    value={sortOption}
                    onChange={handleSortChange}
                    displayEmpty
                >
                    <MenuItem value="default">by default</MenuItem>
                    <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                    <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                    <MenuItem value="newest">Newest</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterDefinition;