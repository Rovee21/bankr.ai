// API Service for Bankr.ai
import axios from 'axios';

// Base URL that can be updated when ngrok URL changes
// Replace this with your ngrok URL when it changes
export const API_BASE_URL = "https://300f-2607-f470-34-2303-c4f3-ea21-291f-daa8.ngrok-free.app";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '1', // Skip ngrok browser warning
  },
});

// Interface for personal info
export interface PersonalInfo {
  user_name: string;
  address: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  credit_score: number;
  date_of_birth: string;
}

/**
 * Upload a file to the server to be processed and indexed
 * @param file The file to upload
 * @returns Promise with the response data
 */
export const uploadFileToIndex = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_BASE_URL}/add_file_to_index`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'ngrok-skip-browser-warning': '1', // Skip ngrok browser warning
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Get personal information for the user
 * @returns Promise with the personal info data
 */
export const getPersonalInfo = async (): Promise<PersonalInfo> => {
  try {
    const response = await api.get('/get_personal_info');
    console.log(response.data);
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching personal info:", error);
    throw error;
  }
};

/**
 * Update a field in the user's personal information
 * @param field The field to update
 * @param value The new value for the field
 * @returns Promise with the response data
 */
export const updatePersonalInfo = async (field: string, value: string): Promise<any> => {
  try {
    const payload = {
      user_name: "dragon_hacks", // This is always included as specified
      [field]: value,
    };

    const response = await api.post('/change_personal_info', payload);
    return response.data;
  } catch (error) {
    console.error("Error updating personal info:", error);
    throw error;
  }
}; 