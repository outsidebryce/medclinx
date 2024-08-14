require('dotenv').config();
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

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://your-production-domain.com' : 'http://localhost:3000'
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(express.json());

// Routes
app.use('/api/clinics', require('./routes/clinics'));
app.use('/api/medical-profiles', require('./routes/medicalProfileRoutes'));

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