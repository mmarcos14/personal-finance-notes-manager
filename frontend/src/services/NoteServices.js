import axios from "axios";

const API_BASE = "http://localhost:8000/api/notes";

export const fetchNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE}/index`, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response; // tu récupères response.data dans ton composant
  } catch (error) {
    console.error("Erreur fetchNotes:", error);
    throw error; // permet de gérer l'erreur dans le composant
  }
};

export const createNote = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/store`, data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur createNote:", error);
    throw error;
  }
};

export const updateNote = async (data) => {
  try {
    const response = await axios.post(`${API_BASE}/update`, data, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur updateNote:", error);
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.get(`${API_BASE}/delete/${id}`, {
      withCredentials: true,
      withXSRFToken: true,
    });
    return response;
  } catch (error) {
    console.error("Erreur deleteNote:", error);
    throw error;
  }
};
