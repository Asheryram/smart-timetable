import axios from "axios"


const BASE_URL = "http://localhost:5000/api/"

export default axios.create({
  baseURL: BASE_URL,
  // headers: {
  //   "auth-token": setToken,
  // },
});
