import axios from 'axios';
import Cookies from "js-cookie";

 const api = axios.create({
    baseURL : "http://localhost:3000/",
    headers : {
        'Authorization': Cookies.get('token') ? "Bearer " + Cookies.get('token') : '',
    }
});

api.interceptors.response.use(undefined, (error) => {
    if (error.response && error.response.status === 401) {
        return error.response;
    }
    else {
        return error.response;
    }
});

export default api