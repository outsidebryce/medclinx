import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ClinicListings() {
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clinics');
        setClinics(response.data);
      } catch (error) {
        console.error('Error fetching clinics:', error);
      }
    };

    fetchClinics();
  }, []);

  return (
    <div>
      <h2>Clinic Listings</h2>
      <ul>
        {clinics.map(clinic => (
          <li key={clinic.id}>
            <Link to={`/clinics/${clinic.id}`}>{clinic.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClinicListings;