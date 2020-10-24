import axios from 'axios';

const instance = axios.create({
   baseURL: 'http://localhost:5001/mailteq/us-central1/app/',
   timedOut: 5000
});

export default instance;