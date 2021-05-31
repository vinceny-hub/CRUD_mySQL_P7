
// axios permit to pass and get informations from to frontend and from to backend 
import axios from "axios";
let user = JSON.parse(localStorage.getItem('user'));
export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Authorization': 'Bearer ' + user.accessToken,
    "Content-type": "application/json",
    "Content-Type": "multipart/form-data"
  }
});

