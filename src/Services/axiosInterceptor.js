import axios from "axios";

const instance = axios.create({
  baseURL: "http://api.thebaklavaboxx.co.uk",
  withCredentials: true,
  timeout: 5000,
});

export default instance;
