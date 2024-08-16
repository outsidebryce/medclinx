import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabase';
import { Box, Typography, CircularProgress } from '@mui/material';

function ClinicProfile() {
  const { slug } = useParams();
  const [clinic, setClinic] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchClinic() {
      try {
        // Convert slug back to a name-like string
        const nameQuery = slug
          .split('-')
          .join(' ');

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
      <Typography variant="h4" gutterBottom>{clinic.name}</Typography>
      <Typography>Phone: {clinic.phone_number}</Typography>
      <Typography>Location: {clinic.city}, {clinic.state}</Typography>
      <Typography>Website: {clinic.website}</Typography>
      {/* Add more clinic details here */}
    </Box>
  );
}

export default ClinicProfile;