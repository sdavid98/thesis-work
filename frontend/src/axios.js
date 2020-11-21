import axios from 'axios';

const instance = axios.create({
   baseURL: process.env.REACT_APP_API_BASE_URL,
   timedOut: 5000
});

export default instance;