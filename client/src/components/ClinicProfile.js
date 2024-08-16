import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Typography, CircularProgress, Paper, Grid } from '@mui/material';

function ClinicProfile() {
  const { slug } = useParams();
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClinic() {
      try {
        const nameQuery = slug.split('-').join(' ');

        const { data, error } = await supabase
          .from('clinics')
          .select('*')
          .or(`name.ilike.%${nameQuery}%,name.ilike.%${nameQuery.replace(/\band\b/g, '&')}%`)
          .single();

        if (error) throw error;

        setClinic(data);
      } catch (error) {
        console.error('Error fetching clinic:', error);
        setError('Failed to fetch clinic details');
      }
    }

    fetchClinic();
  }, [slug]);

  if (error) return <Box><Typography color="error">Error: {error}</Typography></Box>;
  if (!clinic) return <Box><CircularProgress /></Box>;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
        <Typography variant="h4" gutterBottom>{clinic.name}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Phone:</strong> {clinic.phone_number}</Typography>
            <Typography><strong>Location:</strong> {clinic.city}, {clinic.state} {clinic.zipcode}</Typography>
            <Typography><strong>Website:</strong> {clinic.website}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Provider:</strong> {clinic.provider || 'N/A'}</Typography>
            <Typography><strong>Specialty:</strong> {clinic.specialty || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* You can add more sections or details here */}
    </Box>
  );
}

export default ClinicProfile;