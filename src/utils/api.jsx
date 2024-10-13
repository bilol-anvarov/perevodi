import axios from "axios";

// const ADDRESS = 'https://test1.makromarket.uz/api/'

const ADDRESS = 'https://api.makromarket.uz/api/'




const api = axios.create({
  baseURL: ADDRESS,
  headers: {  
    'Content-Type': 'application/json',
  },
});



export default api;