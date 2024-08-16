const MedicalProfile = require('../models/MedicalProfile');

const medicalProfileController = {
  // Create a new medical profile
  createProfile: async (req, res) => {
    try {
      const profile = await MedicalProfile.create(req.body);
      res.status(201).json({ message: 'Profile created successfully', profile });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ message: 'Error creating profile', error: error.message });
    }
  },

  // Get all medical profiles
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await MedicalProfile.getAll();
      res.status(200).json(profiles);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      res.status(500).json({ message: 'Error fetching profiles', error: error.message });
    }
  },

  // Get a single medical profile by ID
  getProfileById: async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await MedicalProfile.get(id);
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
  },

  // Update a medical profile
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const profile = await MedicalProfile.update(id, req.body);
      if (profile) {
        res.status(200).json({ message: 'Profile updated successfully', profile });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
  },

  // Delete a medical profile
  deleteProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await MedicalProfile.delete(id);
      if (deleted) {
        res.status(200).json({ message: 'Profile deleted successfully' });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
      res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
  }
};

module.exports = medicalProfileController;