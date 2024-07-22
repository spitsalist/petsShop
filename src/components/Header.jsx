import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Container, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/system';
import logo from './../assets/logo.svg';
import shoppingCart from './../assets/shopingCard.svg';
import basketFull from './../assets/basketFull.svg';

const NavList = styled('ul')(({ theme }) => ({
  display: 'flex',
  listStyle: 'none',
  padding: 0,
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const NavItem = styled('li')(({ theme }) => ({
  marginRight: '20px',
  [theme.breakpoints.down('md')]: {
    marginRight: 0,
    marginBottom: '10px',
    width: '100%',
  },
}));

const StyledLink = styled(RouterLink)(({ theme }) => ({
  textDecoration: 'none',
  color: '#282828',
  textTransform: 'uppercase',
  position: 'relative',
  display: 'inline-block',
  '&:hover::after': {
    width: '100%',
  },
  '&::after': {
    content: '""',
    display: 'block',
    width: '0',
    height: '2px',
    backgroundColor: '#1976d2',
    transition: 'width 0.3s',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  fontSize: '16px',
  fontWeight: 'bold',
  padding: '10px 0',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    width: '100%',
    '&::after': {
      display: 'none',
    },
  },
}));

const Logo = styled('img')(({ theme }) => ({
  height: '70px',
  // marginLeft: '10px',
  [theme.breakpoints.down('md')]: {
    height: '40px',
  },
}));

const ShoppingCartIcon = styled('img')(({ theme }) => ({
  height: '48px',
  cursor: 'pointer',
  // marginRight: '10px',
  [theme.breakpoints.down('md')]: {
    height: '25px',
    marginRight: '10px',
  },
}));

const BasketFullIcon = styled('img')(({ theme }) => ({
  height: '48px',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    height: '25px',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const isMenuOpen = Boolean(anchorEl);

  const drawer = (
    <Box
      // sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemText primary="Main Page" sx={{ textTransform: 'uppercase' }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/categories">
          <ListItemText primary="Categories" sx={{ textTransform: 'uppercase' }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/products">
          <ListItemText primary="All products" sx={{ textTransform: 'uppercase' }} />
        </ListItem>
        <ListItem button component={RouterLink} to="/sales">
          <ListItemText primary="All sales" sx={{ textTransform: 'uppercase' }} />
        </ListItem>
        <ListItem sx={{ justifyContent: 'flex-end' }}>
          <IconButton edge="end" color="inherit">
            <BasketFullIcon src={basketFull} alt="Basket Full" />
          </IconButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ justifyContent: 'space-between', backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #DDDDDD' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ flexDirection: { xs: 'row', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: { xs: 1, md: 0 }, justifyContent: { xs: 'flex-start', md: 'flex-start' } }}>
            <RouterLink to="/">
              <Logo src={logo} alt="Logo" />
            </RouterLink>
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawer}
            </Drawer>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <NavList>
              <NavItem>
                <StyledLink to="/">Main Page</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/categories">Categories</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/products">All products</StyledLink>
              </NavItem>
              <NavItem>
                <StyledLink to="/sales/all">All sales</StyledLink>
              </NavItem>
            </NavList>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <IconButton edge="end" color="inherit" onClick={handleMenuOpen}>
              <ShoppingCartIcon src={shoppingCart} alt="Shopping cart" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={handleMenuClose}>View Cart</MenuItem>
              <MenuItem onClick={handleMenuClose}>Checkout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;