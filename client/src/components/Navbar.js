import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { InputBase, Paper, useTheme, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [searchValue, setSearchValue] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim()) {
      navigate(`/clinics?search=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const showSearchBar = !isHomePage && (!isMobile || (isMobile && location.pathname === '/clinics'));

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0}
      sx={{
        backgroundColor: isHomePage ? 'transparent !important' : 'white',
        boxShadow: isHomePage 
          ? 'none' 
          : '0 2px 4px -1px rgba(0,0,0,0.06), 0 4px 6px -1px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar 
        sx={{ 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          py: isMobile ? 1 : 0,
        }}
      >
        <Box 
          sx={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: isMobile ? 1 : 0,
          }}
        >
          <RouterLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <img 
              src="/medclinx-logo.svg" 
              alt="MedClinx Logo" 
              style={{ 
                maxHeight: '30px', 
                width: 'auto'
              }}
            />
          </RouterLink>

          {showSearchBar && (
            <Paper
              component="form"
              sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: '100%',
                maxWidth: 400,
                borderRadius: '24px',
                boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)'
              }}
              onSubmit={handleSearchSubmit}
            >
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <StyledInputBase
                placeholder="Search clinics..."
                inputProps={{ 'aria-label': 'search clinics' }}
                value={searchValue}
                onChange={handleSearchChange}
                fullWidth
              />
            </Paper>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Link
              href="https://example.com/for-clinics"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: isHomePage ? 'white' : 'black',
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
                borderRadius: '20px',
                display: 'flex',
                padding: '4px 8px',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
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
          </Box>
        </Box>
        
        {!isHomePage && isMobile && (
          <Paper
            component="form"
            sx={{ 
              p: '2px 4px', 
              display: 'flex', 
              alignItems: 'center', 
              width: '100%',
              maxWidth: 400,
              borderRadius: '24px',
              boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)'
            }}
            onSubmit={handleSearchSubmit}
          >
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <StyledInputBase
              placeholder="Search clinics..."
              inputProps={{ 'aria-label': 'search clinics' }}
              value={searchValue}
              onChange={handleSearchChange}
              fullWidth
            />
          </Paper>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;