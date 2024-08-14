const MedicalProfile = require('../models/MedicalProfile');

exports.createProfile = async (req, res) => {
  try {
    const newProfile = await MedicalProfile.create(req.body);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await MedicalProfile.get(req.params.patientId);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updatedProfile = await MedicalProfile.update(req.params.patientId, req.body);
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};