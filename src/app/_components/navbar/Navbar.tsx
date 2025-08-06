'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // logic to logout
    console.log("Logging out...");
    handleCloseMenu();
  };

  return (
    <AppBar position="static" color="primary" sx={{bgcolor: '#029f9a', textAlign:'center'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* اسم الموقع */}
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Twasul
        </Typography>

        {/* Mobile Menu Button */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton color="inherit" onClick={handleOpenMenu}>
            <MenuIcon />
          </IconButton>

         <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleCloseMenu}
  PaperProps={{
    sx: {
      mt: 2,
      backgroundColor: '#029f9a',
      borderRadius: 2,
      boxShadow: 4,
      minWidth: 150,
      border: '1px solid white',
      color: 'white',             
    },
  }}
>
  <MenuItem
    component={Link}
    href="/login"
    onClick={handleCloseMenu}
    sx={{
      '&:hover': {
        backgroundColor: 'white',
        color: '#029f9a',
      },
    }}
  >
    Login
  </MenuItem>

  <MenuItem
    component={Link}
    href="/register"
    onClick={handleCloseMenu}
    sx={{
       border: '1px solid white',
      color: 'white',
      '&:hover': {
        backgroundColor: 'white',
        color: '#029f9a',
      },
    }}
  >
    Register
  </MenuItem>

  <MenuItem
    onClick={handleLogout}
    sx={{
      '&:hover': {
        backgroundColor: 'white',
        color: '#d32f2f',
      },
    }}
  >
    SignOut
  </MenuItem>
</Menu>


        </Box>

        {/* Desktop Buttons */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
          <Button variant="outlined" color="inherit" component={Link} href="/login">
            Login
          </Button>
          <Button variant="outlined" color="inherit" component={Link} href="/register">
            Register
          </Button>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            SignOut
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
