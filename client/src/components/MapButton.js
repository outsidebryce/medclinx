import React from 'react';
import { Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';

function MapButton({ visible }) {
  if (!visible) return null;

  return (
    <Button
      variant="contained"
      startIcon={<MapIcon />}
      sx={{
        position: 'fixed',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        borderRadius: '20px',
        padding: '10px 20px',
        backgroundColor: '#002BAA',
        color: 'white',
        '&:hover': {
          backgroundColor: '#001E7A',
        },
      }}
    >
      Map
    </Button>
  );
}

export default MapButton;