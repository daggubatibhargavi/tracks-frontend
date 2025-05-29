// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "https://tracks-backend-uorz.onrender.com/api/v1",
//    // baseURL: "http://localhost:5000/api/v1",
// });

// // Automatically attach token to every request
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default axiosInstance;

// src/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://tracks-backend-uorz.onrender.com/api/v1", // or your localhost
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

