import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.thebaklavaboxx.co.uk/",
  timeout: 5000,
});

//on localhost change server backend http://localhost:8000/

export default instance;
