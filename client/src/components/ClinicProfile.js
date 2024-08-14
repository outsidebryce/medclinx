import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ClinicProfile() {
  const [clinic, setClinic] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/clinics/${id}`);
        setClinic(response.data);
      } catch (error) {
        console.error('Error fetching clinic:', error);
      }
    };

    fetchClinic();
  }, [id]);

  if (!clinic) return <div>Loading...</div>;

  return (
    <div>
      <h2>{clinic.name}</h2>
      <p>Address: {clinic.address}</p>
      {/* Add more clinic details here */}
    </div>
  );
}

export default ClinicProfile;