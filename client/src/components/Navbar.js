import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Box from '@mui/material/Box';

function Navbar({ transparent }) {
  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0}
      sx={{
        backgroundColor: 'transparent !important',
        boxShadow: 'none',
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
            color: 'white',
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
          
        </Link>
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '20px', // Adjust for desired roundness
            display: 'flex',
            padding: '4px 8px', // Adjust padding as needed
            '&:hover': {
              backgroundColor: '#f5f5f5', // Light grey on hover
            },
          }}
        >
          
          <IconButton
            size="small"
            aria-label="menu"
            sx={{ color: '#080808', padding: '4px' }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            size="small"
            aria-label="profile"
            sx={{ color: '#080808', padding: '4px' }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;