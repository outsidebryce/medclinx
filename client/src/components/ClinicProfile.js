import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  Box, Typography, CircularProgress, Grid, Container, 
  Button, Avatar, Card, CardContent, Rating, List, ListItem, ListItemText,
  useTheme, useMediaQuery
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import MessageIcon from '@mui/icons-material/Message';

function ClinicProfile({ slug: propSlug, isLightbox = false }) {
  const { slug: paramSlug } = useParams();
  const slug = propSlug || paramSlug;
  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    async function fetchClinic() {
      if (!slug) {
        setError('No clinic slug provided');
        setLoading(false);
        return;
      }

      try {
        const nameQuery = slug.split('-').join(' ');

        const { data, error } = await supabase
          .from('clinics')
          .select('*, logo')
          .or(`name.ilike.%${nameQuery}%,name.ilike.%${nameQuery.replace(/\band\b/g, '&')}%`)
          .single();

        if (error) throw error;

        setClinic(data);
      } catch (error) {
        console.error('Error fetching clinic:', error);
        setError('Failed to fetch clinic details');
      } finally {
        setLoading(false);
      }
    }

    fetchClinic();
  }, [slug]);

  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}><CircularProgress /></Box>;
  if (error) return <Box sx={{ p: 3 }}><Typography color="error">Error: {error}</Typography></Box>;
  if (!clinic) return <Box sx={{ p: 3 }}><Typography>Clinic not found</Typography></Box>;

  return (
    <Container 
      maxWidth="lg" 
      disableGutters={isLightbox}
      sx={{ 
        mt: isLightbox ? 0 : { xs: 0, sm: '20px' }, 
        px: isLightbox ? 0 : { xs: 0, sm: 2 },
        height: '100%',
      }}
    >
      {/* Header */}
      <Box sx={{ 
        bgcolor: '#002BAA', 
        color: 'white', 
        p: 2, 
        mb: 2, 
        position: 'relative',
        borderRadius: isLightbox ? 0 : { xs: 0, sm: '4px' }
      }}>
        {!isLightbox && (
          <Button 
            component={Link} 
            to="/clinics" 
            startIcon={<ArrowBackIcon />} 
            color="inherit"
            sx={{ textTransform: 'capitalize' }}
          >
            Back
          </Button>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Avatar 
            src={clinic.logo} 
            alt={`${clinic.name} logo`}
            sx={{ width: 60, height: 60, mr: 2 }}
          >
            {clinic.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5">{clinic.name}</Typography>
            <Typography variant="subtitle1">{clinic.city}, {clinic.state}</Typography>
            <Typography variant="subtitle2">{clinic.phone_number}</Typography>
          </Box>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mt: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          {!isMobile && (
            <Button 
              startIcon={<ShareIcon />} 
              color="inherit"
              sx={{ textTransform: 'capitalize' }}
            >
              Share
            </Button>
          )}
          <Button 
            startIcon={<MessageIcon />} 
            variant="outlined" 
            sx={{ 
              mx: { xs: 0, sm: 1 }, 
              mb: { xs: 1, sm: 0 },
              textTransform: 'capitalize',
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.08)'
              },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Message
          </Button>
          <Button 
            variant="contained" 
            href={clinic.website} 
            target="_blank"
            sx={{ 
              bgcolor: '#DB2777', 
              color: 'white',
              '&:hover': { bgcolor: '#BE185D' }, 
              textTransform: 'capitalize',
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Visit website
          </Button>
        </Box>
      </Box>

      {/* Content below header */}
      <Box sx={{ px: isLightbox ? 3 : 0, pb: isLightbox ? 3 : 0 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Summary Section */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Summary</Typography>
                <Typography><strong>Provider:</strong> {clinic.provider || 'N/A'}</Typography>
                <Typography><strong>Specialty:</strong> {clinic.specialty || 'N/A'}</Typography>
                {/* Add insurance logos here */}
              </CardContent>
            </Card>

            {/* Staff Section */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Staff</Typography>
                {/* Add staff members with avatars and ratings */}
                {/* This is a placeholder, replace with actual staff data */}
                <Grid container spacing={2}>
                  {[1, 2, 3, 4].map((staff) => (
                    <Grid item xs={6} key={staff}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 2 }}>D{staff}</Avatar>
                        <Box>
                          <Typography variant="subtitle1">Dr. Name</Typography>
                          <Typography variant="body2">Specialty</Typography>
                          <Rating value={4.5} readOnly size="small" />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Services</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Primary Care" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Pediatrics" />
                      </ListItem>
                      {/* Add more services */}
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <List>
                      <ListItem>
                        <ListItemText primary="Dermatology" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Cardiology" />
                      </ListItem>
                      {/* Add more services */}
                    </List>
                  </Grid>
                </Grid>
                {/* Add service images here */}
              </CardContent>
            </Card>

            {/* Location Section */}
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Location</Typography>
                {/* Add map component here */}
                <Typography>{clinic.address}</Typography>
                <Typography>{clinic.city}, {clinic.state} {clinic.zipcode}</Typography>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Reviews</Typography>
                {/* Add review summary and individual reviews here */}
              </CardContent>
            </Card>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Book an Appointment</Typography>
                {/* Add appointment booking form here */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default ClinicProfile;