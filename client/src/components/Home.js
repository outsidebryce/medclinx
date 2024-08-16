import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mastheadHeight, setMastheadHeight] = useState('auto');
  const searchContainerRef = useRef(null);

  const categories = [
    { name: 'General', icon: <LocalHospitalIcon /> },
    { name: 'Specialist', icon: <MedicalServicesIcon /> },
    { name: 'Mental Health', icon: <PsychologyIcon /> },
    { name: 'Wellness', icon: <FitnessCenterIcon /> },
  ];

  useEffect(() => {
    const updateMastheadHeight = () => {
      if (window.innerWidth < 600 && searchContainerRef.current) {
        const searchContainerHeight = searchContainerRef.current.offsetHeight;
        setMastheadHeight(`${searchContainerHeight + 120}px`);
      } else {
        setMastheadHeight('auto');
      }
    };

    updateMastheadHeight();
    window.addEventListener('resize', updateMastheadHeight);

    return () => window.removeEventListener('resize', updateMastheadHeight);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Navbar transparent={true} />
      <Box
        sx={{
          height: { xs: mastheadHeight, sm: 'auto' },
          minHeight: { sm: '80vh' },
          backgroundImage: 'url("/medclinx-masthead.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          paddingTop: { xs: '150px', sm: '100px' },
          marginTop: { xs: '-80px' },
        }}
      >
        <Box
          ref={searchContainerRef}
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: 3,
            borderRadius: 2,
            width: { xs: 'calc(100% - 40px)', sm: '80%' },
            maxWidth: '520px',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            position: 'absolute',
            top: { xs: '100px', sm: '50%' },
            left: { xs: '20px', sm: '40px' },
            transform: { xs: 'none', sm: 'translateY(-50%)' },
            margin: { xs: '0 auto', sm: 0 },
            right: { xs: '20px', sm: 'auto' },
            height: { xs: 'auto', sm: 'auto' },
            overflowY: { xs: 'auto', sm: 'visible' },
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
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            {categories.map((category) => (
              <Button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: '8px',
                  backgroundColor: selectedCategory === category.name ? '#E3F2FD' : 'transparent',
                  '&:hover': {
                    backgroundColor: '#DFDFDF',
                  },
                }}
              >
                <Box 
                  sx={{ 
                    mb: 1, 
                    color: selectedCategory === category.name ? '#0140FD' : '#8F8F8F',
                  }}
                >
                  {category.icon}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: selectedCategory === category.name ? '#0140FD' : '#8F8F8F',
                    textTransform: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {category.name}
                </Typography>
              </Button>
            ))}
          </Box>

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
            component={Link}
            to="/clinics"
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
      
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">About MedClinx</Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Home;