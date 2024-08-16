import { supabase } from './supabase';

const API_URL = 'http://localhost:5000/api'; // Adjust this if your server is running on a different port or URL

export const api = {
  async request(method, endpoint, data = null) {
    const { data: { session } } = await supabase.auth.getSession();
    const url = `${API_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.access_token}`
    };

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : null
      });

      if (!response.ok) {
        throw new Error(`Failed to ${method.toLowerCase()} ${endpoint}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  },

  // Get all clinics
  getAllProfiles() {
    return this.request('GET', '/clinics');
  },

  // Get a single clinic by ID
  getProfileById(id) {
    return this.request('GET', `/clinics/${id}`);
  },

  // Create a new clinic
  createProfile(profileData) {
    return this.request('POST', '/clinics', profileData);
  },

  // Update a clinic
  updateProfile(id, profileData) {
    return this.request('PUT', `/clinics/${id}`, profileData);
  },

  // Delete a clinic
  deleteProfile(id) {
    return this.request('DELETE', `/clinics/${id}`);
  }
};