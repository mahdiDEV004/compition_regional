import api from './api';

// Competition API functions
export const competitionService = {
  // Get all competitions
  getCompetitions: async () => {
    try {
      const response = await api.get('/competitions');
      return response.data;
    } catch (error) {
      console.error('Error fetching competitions:', error);
      throw error;
    }
  },

  // Get single competition
  getCompetition: async (id) => {
    try {
      const response = await api.get(`/competitions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching competition:', error);
      throw error;
    }
  },

  // Create competition
  createCompetition: async (competitionData) => {
    try {
      const response = await api.post('/competitions', competitionData);
      return response.data;
    } catch (error) {
      console.error('Error creating competition:', error);
      throw error;
    }
  },

  // Update competition
  updateCompetition: async (id, competitionData) => {
    try {
      const response = await api.put(`/competitions/${id}`, competitionData);
      return response.data;
    } catch (error) {
      console.error('Error updating competition:', error);
      throw error;
    }
  },

  // Delete competition
  deleteCompetition: async (id) => {
    try {
      const response = await api.delete(`/competitions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting competition:', error);
      throw error;
    }
  },
};

// User API functions
export const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/user', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },
};

// Registration API functions
export const registrationService = {
  // Register for competition
  registerForCompetition: async (competitionId, registrationData) => {
    try {
      const response = await api.post(`/competitions/${competitionId}/register`, registrationData);
      return response.data;
    } catch (error) {
      console.error('Error registering for competition:', error);
      throw error;
    }
  },

  // Get user registrations
  getUserRegistrations: async () => {
    try {
      const response = await api.get('/registrations');
      return response.data;
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },
};