import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Grid, Card, CardContent, CardActions, Chip, Avatar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mastheadHeight, setMastheadHeight] = useState('auto');
  const searchContainerRef = useRef(null);
  const [texasClinics, setTexasClinics] = useState([]);
  const [coloradoClinics, setColoradoClinics] = useState([]);

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

  useEffect(() => {
    fetchClinics();
  }, []);

  const fetchClinics = async () => {
    try {
      const { data: texasData, error: texasError } = await supabase
        .from('clinics')
        .select('*')
        .eq('state', 'Texas')
        .not('logo', 'is', null)
        .limit(6);

      if (texasError) throw texasError;
      setTexasClinics(texasData);

      const { data: coloradoData, error: coloradoError } = await supabase
        .from('clinics')
        .select('*')
        .eq('state', 'Colorado')
        .not('logo', 'is', null)
        .limit(6);

      if (coloradoError) throw coloradoError;
      setColoradoClinics(coloradoData);
    } catch (error) {
      console.error('Error fetching clinics:', error);
    }
  };

  const getClinicPermalink = (clinicName) => {
    return clinicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const ClinicSection = ({ title, clinics }) => (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>{title}</Typography>
      <Grid container spacing={3}>
        {clinics.map((clinic) => (
          <Grid item xs={12} sm={6} md={4} key={clinic.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar
                    src={clinic.logo}
                    alt={`${clinic.name} logo`}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  />
                  <Typography 
                    variant="h6" 
                    component={Link} 
                    to={`/clinic/${getClinicPermalink(clinic.name)}`}
                    sx={{ 
                      textDecoration: 'none', 
                      color: 'inherit',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#002BAA',
                      },
                    }}
                  >
                    {clinic.name}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={1}>
                  <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    {clinic.city}, {clinic.state}
                  </Typography>
                </Box>
                <Box display="flex" flexWrap="wrap" gap={0.5} mb={1}>
                  {clinic.specialties && clinic.specialties.map((specialty, index) => (
                    <Chip key={index} label={specialty} size="small" />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {clinic.description && clinic.description.length > 100
                    ? `${clinic.description.substring(0, 100)}...`
                    : clinic.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  component={Link} 
                  to={`/clinic/${getClinicPermalink(clinic.name)}`}
                  size="small" 
                  sx={{ 
                    backgroundColor: '#002BAA',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#001E7A',
                    },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

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
        <ClinicSection title="Featured Clinics in Texas" clinics={texasClinics} />
        <ClinicSection title="Featured Clinics in Colorado" clinics={coloradoClinics} />
      </Box>
    </ThemeProvider>
  );
}

export default Home;