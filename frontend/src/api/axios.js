import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-app-auth-rbac-1.onrender.com/api/v1",
  withCredentials: true
});

export default API;