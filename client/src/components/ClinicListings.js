import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  Box, Typography, Card, CardContent, Button, CardMedia, Container, 
  Chip, Grid, Avatar, IconButton, ToggleButton, ToggleButtonGroup
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealingIcon from '@mui/icons-material/Healing';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import NatureIcon from '@mui/icons-material/Nature';
import MapButton from './MapButton';
import LightboxClinicProfile from './LightboxClinicProfile';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ClinicListings() {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const filterBarRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedClinicSlug, setSelectedClinicSlug] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [map, setMap] = useState(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBWn5db8MsTl0wqxeVNIBufElLrbPSsrgU" // Replace with your actual API key
  });
  const [favorites, setFavorites] = useState([]);

  const mapCenter = { lat: 37.7749, lng: -122.4194 }; // Default to San Francisco

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const isValidCoordinate = (lat, lng) => {
    return typeof lat === 'number' && typeof lng === 'number' && !isNaN(lat) && !isNaN(lng);
  };

  useEffect(() => {
    let isMounted = true;
    async function fetchClinics() {
      try {
        console.log('Fetching clinics...');
        const { data, error } = await supabase
          .from('clinics')
          .select('*')
          .order('name', { ascending: true });
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched clinics:', data);
        if (isMounted) {
          setClinics(data);
          // Extract unique specialties
          const uniqueSpecialties = ['All', ...new Set(data.map(clinic => clinic.specialty).filter(Boolean))];
          setSpecialties(uniqueSpecialties);
          console.log('Unique specialties:', uniqueSpecialties);
        }
      } catch (error) {
        console.error('Error fetching clinics:', error);
        if (isMounted) {
          setError('Failed to fetch clinics');
        }
      }
    }

    fetchClinics();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const match = location.pathname.match(/^\/clinic\/(.+)/);
    if (match) {
      setSelectedClinicSlug(match[1]);
      setLightboxOpen(true);
    } else if (location.pathname === '/clinics') {
      setLightboxOpen(false);
      setSelectedClinicSlug(null);
    }
  }, [location]);

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteClinics') || '[]');
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (clinicId) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(clinicId)
        ? prevFavorites.filter(id => id !== clinicId)
        : [...prevFavorites, clinicId];
      
      // Save updated favorites to localStorage
      localStorage.setItem('favoriteClinics', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const specialtyIcons = {
    'All': <LocalHospitalIcon />,
    'Specialized': <MedicalServicesIcon />,
    'General medicine': <HealingIcon />,
    'Family health': <FamilyRestroomIcon />,
    'Ketamine': <LocalPharmacyIcon />,
    'Counseling': <PsychologyIcon />,
    'Urgent care': <LocalHospitalIcon />,
    'Wellness': <FitnessCenterIcon />,
    'Alternative': <NatureIcon />,
  };

  const handleSpecialtyChange = (event, newSpecialty) => {
    if (newSpecialty !== null) {
      setSelectedSpecialty(newSpecialty);
      
      // Scroll the selected option into view
      const filterBar = filterBarRef.current;
      const selectedButton = filterBar.querySelector(`[value="${newSpecialty}"]`);
      if (selectedButton) {
        const scrollLeft = selectedButton.offsetLeft - filterBar.offsetLeft;
        filterBar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  const createSlug = (name) => {
    return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  };

  const handleClinicClick = (clinicName, event) => {
    event.preventDefault(); // Prevent the default link behavior
    const slug = createSlug(clinicName);
    setSelectedClinicSlug(slug);
    setLightboxOpen(true);
    navigate(`/clinic/${slug}`, { replace: false });
  };

  const handleLightboxClose = () => {
    setLightboxOpen(false);
    setSelectedClinicSlug(null);
    navigate('/clinics', { replace: true });
  };

  const filteredClinics = selectedSpecialty === 'All' 
    ? clinics 
    : clinics.filter(clinic => clinic.specialty === selectedSpecialty);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  if (error) return <Box><Typography color="error">Error: {error}</Typography></Box>;

  return (
    <>
      {/* Fixed Filter Bar */}
      <Box 
        ref={filterBarRef}
        sx={{ 
          position: 'fixed', 
          top: {
            xs: '56px',
            sm: '64px'
          },
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          padding: {
            xs: '16px 16px 16px 16px',
            sm: '0px 16px 16px 16px'
          },
          overflowX: 'auto',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none',
        }}
      >
        <ToggleButtonGroup
          value={selectedSpecialty}
          exclusive
          onChange={handleSpecialtyChange}
          aria-label="specialty filter"
          sx={{
            display: 'flex',
            flexWrap: 'nowrap',
            '& .MuiToggleButton-root': {
              flex: '1 0 auto',
              whiteSpace: 'nowrap',
              minWidth: {
                xs: '110px',
                sm: 'auto'
              },
            },
          }}
        >
          {specialties.map((specialty) => (
            <ToggleButton 
              key={specialty} 
              value={specialty}
              sx={{
                flexDirection: 'column',
                padding: '8px',
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              {specialtyIcons[specialty] || <MedicalServicesIcon />}
              <Typography 
                variant="caption" 
                sx={{ 
                  mt: 1, 
                  textTransform: 'none',
                  fontSize: '0.75rem',
                  lineHeight: 1.2,
                  textAlign: 'center',
                }}
              >
                {toTitleCase(specialty)}
              </Typography>
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth={false} 
        sx={{ 
          mt: '100px', 
          height: 'calc(100vh - 100px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Grid container spacing={3} sx={{ flexGrow: 1, height: '100%' }}>
          {/* Clinic Listings */}
          <Grid item xs={12} md={6} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" gutterBottom>
              Showing {filteredClinics.length} {filteredClinics.length === 1 ? 'clinic' : 'clinics'}
            </Typography>

            <Box sx={{ 
              flexGrow: 1, 
              overflowY: 'auto', 
              pr: { xs: 0, sm: 2 },  // Remove right padding on mobile, keep it for larger screens
              pl: { xs: 0, sm: 0 },  // Remove left padding on all screen sizes
            }}>
              {filteredClinics.length === 0 ? (
                <Typography>No clinics found.</Typography>
              ) : (
                filteredClinics.map(clinic => (
                  <Card key={clinic.id} sx={{ mb: 2, display: 'flex', position: 'relative' }}>
                    {clinic.logo && (
                      <Box sx={{ 
                        padding: { xs: '5px', sm: '10px' },
                        border: 'solid 1px rgba(0, 0, 0, .2)',
                        margin: { 
                          xs: '20px 5px 5px 20px', 
                          sm: '10px'
                        },
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: 60, sm: 120 },
                        height: { xs: 60, sm: 120 },
                        flexShrink: 0,
                      }}>
                        <CardMedia
                          component="img"
                          sx={{ 
                            width: { xs: 50, sm: 100 }, 
                            height: { xs: 50, sm: 100 }, 
                            objectFit: 'contain'
                          }}
                          image={clinic.logo}
                          alt={`${clinic.name} logo`}
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                      </Box>
                    )}
                    <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Grid container spacing={2} alignItems="flex-start">
                        <Grid item xs={12} sm={8}>
                          <Typography variant="h5" component="div" gutterBottom>
                            <Link 
                              to={`/clinic/${createSlug(clinic.name)}`}
                              onClick={(e) => handleClinicClick(clinic.name, e)}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              {clinic.name}
                            </Link>
                          </Typography>
                          <Typography color="text.secondary" gutterBottom>
                            {clinic.city}, {clinic.state}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 1 }}>
                            {clinic.provider && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                  <PersonIcon fontSize="small" />
                                </Avatar>
                                <Typography variant="body2">{clinic.provider}</Typography>
                              </Box>
                            )}
                            {clinic.phone_number && (
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <IconButton size="small" sx={{ mr: 1, p: 0 }}>
                                  <PhoneIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="body2">{clinic.phone_number}</Typography>
                              </Box>
                            )}
                            {clinic.specialty && (
                              <Chip 
                                label={clinic.specialty} 
                                color="primary" 
                                size="small" 
                              />
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <IconButton
                            onClick={() => toggleFavorite(clinic.id)}
                            sx={{
                              mr: 1,
                              border: '1px solid #e0e0e0',
                              borderRadius: '4px',
                              padding: '6px',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              },
                            }}
                          >
                            {favorites.includes(clinic.id) ? (
                              <FavoriteIcon sx={{ color: 'red' }} />
                            ) : (
                              <FavoriteBorderIcon sx={{ color: 'red' }} />
                            )}
                          </IconButton>
                          <Button 
                            onClick={(e) => handleClinicClick(clinic.name, e)}
                            variant="outlined"
                            sx={{
                              backgroundColor: 'white',
                              color: '#333333',
                              borderColor: 'grey.300',
                              textTransform: 'none',
                              boxShadow: 'none',
                              '&:hover': {
                                backgroundColor: 'grey.100',
                                borderColor: 'grey.400',
                              },
                            }}
                          >
                            View Profile
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Grid>

          {/* Google Map */}
          <Grid item xs={12} md={6} sx={{ height: '100%' }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {filteredClinics
                  .filter(clinic => isValidCoordinate(clinic.latitude, clinic.longitude))
                  .map(clinic => (
                    <Marker
                      key={clinic.id}
                      position={{ lat: Number(clinic.latitude), lng: Number(clinic.longitude) }}
                      title={clinic.name}
                    />
                  ))}
              </GoogleMap>
            ) : (
              <Typography>Loading map...</Typography>
            )}
          </Grid>
        </Grid>
      </Container>
      <MapButton visible={true} />
      <LightboxClinicProfile
        isOpen={lightboxOpen}
        onClose={handleLightboxClose}
        clinicSlug={selectedClinicSlug}
      />
    </>
  );
}

export default ClinicListings;