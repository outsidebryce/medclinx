import React, { useState } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { InputBase, useTheme, useMediaQuery, Select, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { styled, alpha } from '@mui/material/styles';
import usePreventBodyScroll from '../hooks/usePreventBodyScroll';
import Menu from './Menu';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '24px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  height: '40px', // Reduced height
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
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    height: '24px', // Reduced height
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Divider = styled('div')(({ theme }) => ({
  height: 24, // Reduced height
  margin: 4,
  width: 1,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiSelect-select': {
    paddingTop: 0,
    paddingBottom: 0,
    height: '24px',
    lineHeight: '24px',
  },
  '&:before': {
    border: 'none',
  },
  '&:after': {
    border: 'none',
  },
  '&:hover:not(.Mui-disabled):before': {
    border: 'none',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-icon': {
    top: 'calc(50% - 12px)',
  },
}));

function Navbar() {
  usePreventBodyScroll();

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const [searchValue, setSearchValue] = useState('');
  const [cityValue, setCityValue] = useState('');
  const [insuranceValue, setInsuranceValue] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleCityChange = (event) => {
    setCityValue(event.target.value);
  };

  const handleInsuranceChange = (event) => {
    setInsuranceValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue.trim() || cityValue.trim() || insuranceValue.trim()) {
      navigate(`/clinics?search=${encodeURIComponent(searchValue.trim())}&city=${encodeURIComponent(cityValue.trim())}&insurance=${encodeURIComponent(insuranceValue.trim())}`);
    }
  };

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
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
        <Toolbar sx={{ justifyContent: 'space-between' }}>
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

          {!isMobile && !isHomePage && (
            <Box sx={{ position: 'relative', flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Divider />
                <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <StyledInputBase
                  placeholder="City"
                  inputProps={{ 'aria-label': 'city' }}
                  value={cityValue}
                  onChange={handleCityChange}
                />
                <Divider />
                <LocalHospitalIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <StyledSelect
                  value={insuranceValue}
                  onChange={handleInsuranceChange}
                  displayEmpty
                  inputProps={{ 'aria-label': 'insurance' }}
                  MenuProps={{
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                    PaperProps: {
                      style: {
                        maxHeight: 300,
                        width: 250,
                      },
                    },
                    disableScrollLock: true,
                  }}
                  sx={{ 
                    minWidth: 120,
                  }}
                >
                  <MenuItem value="">
                    <em>Insurance</em>
                  </MenuItem>
                  <MenuItem value="medicare">Medicare</MenuItem>
                  <MenuItem value="medicaid">Medicaid</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </StyledSelect>
              </Search>
            </Box>
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
              onClick={handleMenuOpen}
              sx={{
                backgroundColor: 'white',
                borderRadius: '20px',
                display: 'flex',
                padding: '4px 8px',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <MenuIcon sx={{ color: '#080808', margin: '4px' }} />
              <AccountCircleIcon sx={{ color: '#080808', margin: '4px' }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu isOpen={isMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default Navbar;