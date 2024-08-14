import React from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '70vh',
          backgroundImage: 'url("/medclinx-masthead.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {/* Search Container */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // 90% opacity white
            padding: 3,
            borderRadius: 2,
            width: '80%',
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute',
            top: '50%',
            left: '40px',
            transform: 'translate(0, -50%)',
          }}
        >
          <Typography 
            variant="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: '#080808',
              fontSize: '32px',
            }}
          >
            Find Your <span style={{ color: '#0140FD' }}>Balance</span>
          </Typography>
          
          <TextField
            fullWidth
            variant="outlined"
            label="Search by condition, clinic, or procedure"
            placeholder="e.g., Dentist, Orthopedic, Annual Checkup"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="City, state, zipcode"
            placeholder="e.g., New York, NY or 10001"
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Insurance</InputLabel>
            <Select
              label="Insurance"
              value=""
              onChange={() => {}}
            >
              <MenuItem value="">
                <em>Select your insurance</em>
              </MenuItem>
              <MenuItem value="aetna">Aetna</MenuItem>
              <MenuItem value="bluecross">Blue Cross Blue Shield</MenuItem>
              <MenuItem value="cigna">Cigna</MenuItem>
              <MenuItem value="unitedhealthcare">UnitedHealthcare</MenuItem>
            </Select>
          </FormControl>
          <Button 
            variant="contained" 
            size="large"
            sx={{ 
              backgroundColor: '#002BAA',
              color: 'white',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#001E7A',
              },
            }}
          >
            Search for all clinics
          </Button>
        </Box>
      </Box>
      
      {/* Rest of your homepage content */}
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">About MedClinx</Typography>
        {/* Add more content here */}
      </Box>
    </ThemeProvider>
  );
}

export default Home;