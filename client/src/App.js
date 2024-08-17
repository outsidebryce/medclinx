import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ClinicListings from './components/ClinicListings';
import ClinicProfile from './components/ClinicProfile';
import KommunicateChat from './components/KommunicateChat';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FAFAFA',
    },
    text: {
      primary: '#080808',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Navbar />
          <Toolbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clinics" element={<ClinicListings />} />
            <Route path="/clinic/:slug" element={<ClinicListings />} />
            <Route path="/clinic-page/:slug" element={<ClinicProfile />} />
          </Routes>
          <KommunicateChat />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;