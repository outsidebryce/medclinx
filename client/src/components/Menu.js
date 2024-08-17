import React, { useEffect, useRef } from 'react';
import { Box, IconButton, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const GoogleButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #dadce0',
  borderRadius: '4px',
  color: '#3c4043',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  height: '40px',
  letterSpacing: '0.25px',
  padding: '0 12px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#f7f8f8',
    boxShadow: '0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)',
  },
}));

const GoogleIcon = styled('img')({
  height: '18px',
  width: '18px',
  marginRight: '8px',
});

const Menu = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const menuRef = useRef(null);

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Clinics', link: '/clinics' },
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleGoogleSignIn = () => {
    // Placeholder for Google Sign-in functionality
    console.log('Google Sign-in clicked');
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: theme.zIndex.drawer,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transition: 'opacity 200ms, visibility 200ms',
        }}
        onClick={onClose}
      />
      <Box
        ref={menuRef}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: isMobile ? '100%' : '300px',
          backgroundColor: 'white',
          boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
          zIndex: theme.zIndex.drawer + 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 200ms ease-in-out',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <IconButton onClick={onClose} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        {menuItems.map((item, index) => (
          <Typography
            key={index}
            component={Link}
            to={item.link}
            onClick={onClose}
            sx={{
              py: 1,
              color: 'text.primary',
              textDecoration: 'none',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            {item.text}
          </Typography>
        ))}
        <GoogleButton
          onClick={handleGoogleSignIn}
          fullWidth
          sx={{ mt: 2 }}
        >
          <GoogleIcon src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" />
          Sign in with Google
        </GoogleButton>
      </Box>
    </>
  );
};

export default Menu;