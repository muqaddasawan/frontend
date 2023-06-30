import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thebaklavaboxx.co.uk",
  withCredentials: true,
  timeout: 5000,
});

//on localhost change server backend http:://localhost:8000/
//https:://api.thebaklavaboxx.co.uk/
//https://thebaklavaboxx.co.uk

export default instance;
