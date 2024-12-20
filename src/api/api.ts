// src/services/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://dev-0tf0hinghgjl39z.api.raw-labs.com', // Replace with your API's base URL
  timeout: 5000, // Optional: Set a timeout (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add other default headers if needed
  },
});

export default api;
