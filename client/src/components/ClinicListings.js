import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Typography, Card, CardContent, Button, CardMedia, Container } from '@mui/material';

function ClinicListings() {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchClinics() {
      try {
        console.log('Fetching clinics...');
        const { data, error } = await supabase
          .from('clinics')
          .select('*');
        
        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }
        
        console.log('Fetched clinics:', data);
        if (isMounted) {
          setClinics(data);
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

  console.log('Current clinics state:', clinics);

  // Function to create a URL-friendly slug from the clinic name
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/&/g, 'and')  // Replace & with 'and'
      .replace(/[^a-z0-9]+/g, '-')  // Replace any non-alphanumeric characters with a hyphen
      .replace(/^-+|-+$/g, '');  // Remove leading and trailing hyphens
  };

  if (error) return <Box><Typography color="error">Error: {error}</Typography></Box>;

  return (
    <Container maxWidth="lg" sx={{ maxWidth: '1160px !important' }}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>Clinic Listings</Typography>
        {clinics.length === 0 ? (
          <Typography>No clinics found.</Typography>
        ) : (
          clinics.map(clinic => (
            <Card key={clinic.id} sx={{ marginBottom: 2, display: 'flex' }}>
              {clinic.logo && (
                <Box sx={{ width: 151, height: 151, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '100%', 
                      width: 'auto', 
                      height: 'auto', 
                      objectFit: 'contain'
                    }}
                    image={clinic.logo}
                    alt={`${clinic.name} logo`}
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </Box>
              )}
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant="h5" component="div">
                  {clinic.name}
                </Typography>
                <Typography color="text.secondary">
                  Phone: {clinic.phone_number}
                </Typography>
                <Typography color="text.secondary">
                  Location: {clinic.city}, {clinic.state}
                </Typography>
                <Typography color="text.secondary">
                  Website: {clinic.website}
                </Typography>
                <Button 
                  component={Link} 
                  to={`/clinic/${createSlug(clinic.name)}`} 
                  variant="contained" 
                  color="primary" 
                  sx={{ marginTop: 2 }}
                >
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
}

export default ClinicListings;