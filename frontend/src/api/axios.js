import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-app-auth-rbac.onrender.com/api/v1",
  withCredentials: true
});

export default API;