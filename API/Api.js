import axios from 'axios';

const API_BASE_URL = 'Your base url';

console.log(API_BASE_URL);
const api = axios.create({
 
  baseURL: API_BASE_URL,
  headers: {
     'Content-Type': 'application/json' 
  },
});
console.log(api);

export default api;
