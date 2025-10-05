import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth"; // Base URL for the backend API
axios.defaults.withCredentials = true; // Enable sending cookies with requests

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isCheckingAuth: true,
  isLoading: false,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "error signing up",
        isLoading: false,
      });
    }
  },
login: async (email, password) => {
  set({ isLoading: true, error: null });
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true } // 👈 THIS is important
    );

    set({
      user: response.data.user,
      isAuthenticated: true,
      isLoading: false,
    });
  } catch (error) {
    set({
      error: error.response?.data?.message || "Error logging in",
      isLoading: false,
    });
  }
},

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error logging out",
        isLoading: false,
      });
    }
  },

  verificateEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

 checkAuth: async () => {
  set({ isCheckingAuth: true });
  try {
    const response = await axios.get(`${API_URL}/check-auth`, {
      withCredentials: true, // 👈 include cookies
    });
    set({
      user: response.data.user,
      isAuthenticated: true,
      isCheckingAuth: false,
    });
  } catch (error) {
    set({
      isAuthenticated: false,
      user: null,
      isCheckingAuth: false,
    });
  }
},

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error sending reset password email",
        isLoading: false,
      });
    }
},

resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response.data.message || "Error resetting password",
      });
      throw error;
      
    }
  },



}));
