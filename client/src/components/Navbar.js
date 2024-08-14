import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';

function Navbar() {
  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      elevation={1}
      sx={{
        backgroundColor: '#FAFAFA',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <img 
            src="/medclinx-logo.svg" 
            alt="MedClinx Logo" 
            style={{ 
              maxHeight: '30px', 
              width: 'auto'
            }}
          />
        </Box>
        <Link
          href="https://example.com/for-clinics"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#080808',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            marginRight: 2,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          For Clinics
          <OpenInNewIcon sx={{ fontSize: 16, marginLeft: 0.5 }} />
        </Link>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ color: '#080808' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;