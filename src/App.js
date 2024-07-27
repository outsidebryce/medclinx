import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import these components
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from './firebaseConfig';
import MedicalProfile from './MedicalProfile';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 30.2915467515233,
  lng: -97.74138242984841
};

function App() {
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      <LoadScript googleMapsApiKey="AIzaSyBBCi4IXGJ9jnvUFlYbyLNOj4y3MGoHfRo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>

      <MedicalProfile />
    </div>
  );
}

export default App;