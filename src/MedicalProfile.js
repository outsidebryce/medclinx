import React from 'react';

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
  // Add more profiles as needed
];

const MedicalProfileList = () => {
  return (
    <div className="medical-profile-list">
      {medicalProfiles.map((profile) => (
        <div key={profile.id} className="medical-profile-card">
          <h2>{profile.name}</h2>
          <p><strong>Address:</strong> {profile.address}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Specialties:</strong> {profile.specialties.join(", ")}</p>
          <div className="reviews">
            <h3>Reviews:</h3>
            {profile.reviews.length > 0 ? (
              <ul>
                {profile.reviews.map((review, index) => (
                  <li key={index}>
                    <strong>{review.user}:</strong> {review.comment} <em>({review.rating} stars)</em>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalProfileList;