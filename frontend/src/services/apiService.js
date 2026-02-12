// apiService.js
import axios from "axios";

// Création de l'instance Axios
const api = axios.create({
  baseURL: "http://localhost:8000/api", // Remplace par l'URL de ton API prod
  withCredentials: true,               // nécessaire pour Sanctum CSRF
  withXSRFToken: true,                 // pour envoyer automatiquement le XSRF-TOKEN
});

// Interceptor pour ajouter automatiquement le Bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Helpers pour CRUD
export const fetchAll = (endpoint) => api.get(endpoint);
export const createOne = (endpoint, data) => api.post(`${endpoint}/store`, data);
export const updateOne = (endpoint, data) => api.post(`${endpoint}/update`, data);
export const deleteOne = (endpoint, id) => api.delete(`${endpoint}/${id}`);

// 🔹 Helper pour initialiser CSRF token (Sanctum)
export const getCsrfCookie = async () => {
  try {
    await api.get("/sanctum/csrf-cookie");
  } catch (err) {
    console.error("Erreur CSRF:", err);
  }
};

export default api;
