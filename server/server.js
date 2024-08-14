require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const initializeFirebase = require('./firebaseInit');

console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

const envPath = path.resolve(__dirname, '../.env');
console.log('Env file path:', envPath);
console.log('Env file exists:', fs.existsSync(envPath));

require('dotenv').config({ path: envPath });

console.log('PORT:', process.env.PORT);

// Initialize Firebase
const db = initializeFirebase();

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


// Routes
app.use('/api/clinics', require('./routes/clinics'));
app.use('/api/medical-profiles', require('./routes/medicalProfileRoutes'));

app.post('/api/clinics', async (req, res) => {
    try {
      const { name, address } = req.body;
      // Here, you would typically save this data to your database
      // For now, let's just send back the received data
      res.status(201).json({ message: 'Clinic created', clinic: { name, address } });
    } catch (error) {
      console.error('Error creating clinic:', error);
      res.status(500).json({ message: 'Error creating clinic' });
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

// GET a specific clinic by ID
app.get('/api/clinics/:id', async (req, res) => {
    try {
      const clinicId = req.params.id;
      // Here you would typically fetch the clinic from your database
      // For now, let's return a mock response
      const clinic = {
        id: clinicId,
        name: `Clinic ${clinicId}`,
        address: `${clinicId}23 Main St`
      };
      
      if (clinic) {
        res.json(clinic);
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

    // Here you would typically fetch the user from your database
    // For this example, we'll use a mock user
    const user = {
      id: '1',
      email: 'user@example.com',
      password: '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // hashed password
    };

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Here you would typically fetch the user from your database
      // For this example, we'll use a mock user
      const user = {
        id: '1',
        email: 'user@example.com',
        password: '$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // hashed password
      };
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = {
        user: {
          id: user.id
        }
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// GET all clinics
app.get('/api/clinics', async (req, res) => {
    try {
      // Here you would typically fetch clinics from your database
      // For now, let's return a mock response
      const clinics = [
        { id: 1, name: 'Clinic A', address: '123 Main St' },
        { id: 2, name: 'Clinic B', address: '456 Elm St' },
      ];
      res.json(clinics);
    } catch (error) {
      console.error('Error fetching clinics:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });