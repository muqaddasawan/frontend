import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thebaklavaboxx.co.uk/",
  headers: {
    "Access-Control-Allow-Origin": "https://api.thebaklavaboxx.co.uk/",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});

//on localhost change server backend http:://localhost:8000/
//https:://api.thebaklavaboxx.co.uk/
//https://thebaklavaboxx.co.uk

export default instance;
