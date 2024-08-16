require('dotenv').config();
const medicalProfileController = require('./controllers/medicalProfileController');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { supabaseAdmin } = require('./supabaseAdmin');

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

const envPath = path.resolve(__dirname, '../.env');
console.log('Env file path:', envPath);
console.log('Env file exists:', fs.existsSync(envPath));

require('dotenv').config({ path: envPath });

console.log('PORT:', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());


// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:3000'
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));


app.get('/', (req, res) => {
    res.send('Welcome to the Medical Clinics API');
  });


// Define verifyToken middleware
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    if (error) throw error;
    req.user = data.user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Routes
app.use('/api/clinics', require('./routes/clinics'));
app.post('/api/medical-profiles', verifyToken, medicalProfileController.createProfile);
app.get('/api/medical-profiles', verifyToken, medicalProfileController.getAllProfiles);
app.get('/api/medical-profiles/:id', verifyToken, medicalProfileController.getProfileById);
app.put('/api/medical-profiles/:id', verifyToken, medicalProfileController.updateProfile);
app.delete('/api/medical-profiles/:id', verifyToken, medicalProfileController.deleteProfile);

// POST /api/clinics
app.post('/api/clinics', async (req, res) => {
  try {
    const { name, address } = req.body;
    const { data, error } = await supabaseAdmin
      .from('clinics')
      .insert({ name, address })
      .select();

    if (error) throw error;
    res.status(201).json({ message: 'Clinic created', clinic: data[0] });
  } catch (error) {
    console.error('Error creating clinic:', error);
    res.status(500).json({ message: 'Error creating clinic' });
  }
});

// GET a specific clinic by ID
app.get('/api/clinics/:id', async (req, res) => {
  try {
    const clinicId = req.params.id;
    const { data, error } = await supabaseAdmin
      .from('clinics')
      .select('*')
      .eq('id', clinicId)
      .single();

    if (error) throw error;
    
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'Clinic not found' });
    }
  } catch (error) {
    console.error('Error fetching clinic:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    res.json({ user: data.user, session: data.session });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all clinics
app.get('/api/clinics', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clinics')
      .select('*');

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching clinics:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});