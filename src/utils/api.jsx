import axios from "axios";

const TESTADDRESS = 'https://test1.makromarket.uz/api'

const ADDRESS = 'https://api.makromarket.uz/api/'




const api = axios.create({
  baseURL: ADDRESS,
  headers: {  
    'Content-Type': 'application/json',
  },
});

export const testApi = axios.create({
  baseURL: TESTADDRESS,
  headers: {  
    'Content-Type': 'application/json',
  },
});



export default api;