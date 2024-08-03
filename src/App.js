import React from 'react';
import { Helmet } from 'react-helmet';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from './firebaseConfig';
import MedicalProfile from './MedicalProfile';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './logo.svg'; // Added this import

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 30.2915467515233,
  lng: -97.74138242984841
};

const mapContainerStyle = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '50vw',
  height: '100vh',
  zIndex: 1000
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
      <Helmet>
        <title>MedClinx</title>
        <meta name="robots" content="noindex, nofollow" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
      </Helmet>

      <Navbar bg="light" expand="lg" className="fixed-top justify-content-center">
        <div className="container-fluid">
          <Navbar.Brand href="#home">
            <img
              src={logo}
              width="115"
              height="21"
              className="d-inline-block align-top"
              alt="MedClinx "
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#map">Map</Nav.Link>
            </Nav>
            <Nav>
              <button className="btn btn-outline-primary" onClick={handleGoogleSignIn}>Sign in with Google</button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div style={{ paddingTop: '56px' }}></div>

      <div className="d-flex">
        <div className="w-50 p-4">
          <MedicalProfile />
        </div>
        <div style={mapContainerStyle}>
          <LoadScript googleMapsApiKey="AIzaSyBBCi4IXGJ9jnvUFlYbyLNOj4y3MGoHfRo">
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={center}
              zoom={10}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </div>
  );
}

export default App;