import React from 'react';
import { Card, CardContent, Typography, Chip, Box, Rating } from '@mui/material';

const medicalProfiles = [
  {
    id: 1,
    name: "HealthCare Clinic",
    address: "123 Health St, Wellness City, HC 45678",
    phone: "+1-234-567-8901",
    specialties: ["General Medicine", "Pediatrics", "Cardiology"],
    reviews: [
      { user: "Alice", comment: "Great service!", rating: 5 },
      { user: "Bob", comment: "Very professional staff.", rating: 4 },
    ],
  },
  {
    id: 2,
    name: "Wellness Center",
    address: "456 Wellness Ave, Healthy Town, HT 12345",
    phone: "+1-987-654-3210",
    specialties: ["Dermatology", "Orthopedics", "Neurology"],
    reviews: [
      { user: "Charlie", comment: "Excellent care!", rating: 5 },
    ],
  },
  {
    id: 3,
    name: "Sunshine Family Practice",
    address: "789 Sunny Rd, Brightville, BV 67890",
    phone: "+1-345-678-9012",
    specialties: ["Family Medicine", "Geriatrics", "Nutrition"],
    reviews: [
      { user: "David", comment: "Dr. Smith is amazing with kids!", rating: 5 },
      { user: "Emma", comment: "Short wait times and friendly staff.", rating: 4 },
    ],
  },
  {
    id: 4,
    name: "Metro Dental Center",
    address: "101 Smile Ave, Toothtown, TT 23456",
    phone: "+1-456-789-0123",
    specialties: ["General Dentistry", "Orthodontics", "Periodontics"],
    reviews: [
      { user: "Frank", comment: "Pain-free root canal, if you can believe it!", rating: 5 },
      { user: "Grace", comment: "My kids love coming here.", rating: 4 },
    ],
  },
  {
    id: 5,
    name: "Evergreen Mental Health",
    address: "202 Calm St, Serenity Springs, SS 34567",
    phone: "+1-567-890-1234",
    specialties: ["Psychiatry", "Psychology", "Counseling"],
    reviews: [
      { user: "Hannah", comment: "Compassionate and understanding therapists.", rating: 5 },
    ],
  },
  {
    id: 6,
    name: "PhysioFit Rehabilitation",
    address: "303 Flex Blvd, Mobility City, MC 45678",
    phone: "+1-678-901-2345",
    specialties: ["Physical Therapy", "Occupational Therapy", "Sports Medicine"],
    reviews: [
      { user: "Ian", comment: "Helped me recover from a sports injury quickly.", rating: 5 },
      { user: "Julia", comment: "Knowledgeable staff and modern equipment.", rating: 4 },
    ],
  },
  {
    id: 7,
    name: "Women's Wellness Clinic",
    address: "404 Nurture Lane, Careborough, CB 56789",
    phone: "+1-789-012-3456",
    specialties: ["Obstetrics", "Gynecology", "Women's Health"],
    reviews: [
      { user: "Karen", comment: "Dr. Johnson is the best OB/GYN I've ever had.", rating: 5 },
      { user: "Lila", comment: "Comfortable environment and attentive care.", rating: 4 },
    ],
  },
  // Add more profiles as needed
];

const MedicalProfileList = () => {
  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
      {medicalProfiles.map((profile) => (
        <Card key={profile.id} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              {profile.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Address:</strong> {profile.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              <strong>Phone:</strong> {profile.phone}
            </Typography>
            <Box mb={2}>
              <Typography variant="body2" component="span" mr={1}>
                <strong>Specialties:</strong>
              </Typography>
              {profile.specialties.map((specialty, index) => (
                <Chip key={index} label={specialty} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
              ))}
            </Box>
            <Typography variant="h6" gutterBottom>
              Reviews:
            </Typography>
            {profile.reviews.length > 0 ? (
              profile.reviews.map((review, index) => (
                <Box key={index} mb={1}>
                  <Typography variant="body2">
                    <strong>{review.user}:</strong> {review.comment}
                  </Typography>
                  <Rating value={review.rating} readOnly size="small" />
                </Box>
              ))
            ) : (
              <Typography variant="body2">No reviews yet.</Typography>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MedicalProfileList;