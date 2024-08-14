const express = require('express');
const router = express.Router();
const medicalProfileController = require('../controllers/medicalProfileController');

router.post('/', medicalProfileController.createProfile);
router.get('/:patientId', medicalProfileController.getProfile);
router.put('/:patientId', medicalProfileController.updateProfile);

module.exports = router;