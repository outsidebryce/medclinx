import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Box, IconButton, Slide, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ClinicProfile from './ClinicProfile';
import { Link } from 'react-router-dom';

function LightboxClinicProfile({ isOpen, onClose, clinicSlug }) {
  const lightboxRef = useRef(null);

  useEffect(() => {
    console.log("LightboxClinicProfile received clinicSlug:", clinicSlug);
    const handleClickOutside = (event) => {
      if (lightboxRef.current && !lightboxRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, clinicSlug]);

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.25)' : 'transparent',
        transition: 'background-color 200ms ease-out',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 1300,
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      <Slide direction="left" in={isOpen} timeout={200}>
        <Box
          ref={lightboxRef}
          sx={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1160px',
            height: '100%',
            overflow: 'auto',
            position: 'relative',
            boxShadow: '-4px 0 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {isOpen && clinicSlug && (
            <Box sx={{ height: '100%' }}>
              <ClinicProfile slug={clinicSlug} isLightbox={true} />
              <Button
                component={Link}
                to={`/clinic-page/${clinicSlug}`}
                variant="contained"
                sx={{ position: 'absolute', bottom: 20, right: 20 }}
              >
                View Full Page
              </Button>
            </Box>
          )}
        </Box>
      </Slide>
    </Box>,
    document.body
  );
}

export default LightboxClinicProfile;