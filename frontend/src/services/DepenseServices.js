import axios from "axios";

const API_BASE = "http://localhost:8000/api/depense";

export const fetchDepenses = async () => {
  try {
    const response = await axios.get(`${API_BASE}/index`, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur fetchDepenses:", error);
    throw error;
  }
};

export const createDepense = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/store`, data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur createDepense:", error);
    throw error;
  }
};

export const updateDepense = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/update`, data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur updateDepense:", error);
    throw error;
  }
};

export const deleteDepense = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/delete/${id}`, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur deleteDepense:", error);
    throw error;
  }
};
