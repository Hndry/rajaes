import axios from "axios";

// Set config defaults when creating the instance
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "multipart/formdata",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.response.use(
  (response) => {
    // do something i.e. return data object
    return response.data;
  },
  (error) => {
    if (error?.response?.status === 404) {
      // Handle forbidden error e.g. show restricted access warning
      console.log("asd", error.config.url);
      return "asd";
    }

    if (error?.response?.status === 401) {
      // Handle unauthorized error e.g. refresh and set token in storage
    }

    throw error; // forward other client errors
  }
);

// Alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default api;
