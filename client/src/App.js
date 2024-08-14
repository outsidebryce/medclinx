import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAFAFA',
    },
    text: {
      primary: '#080808',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
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
        <Toolbar /> {/* This empty Toolbar acts as a spacer */}
      </Box>
      {/* Your main content goes here */}
    </ThemeProvider>
  );
}

export default App;