import {url} from './constant';
import axios from 'axios';
export default function(){
    return axios.create({
        baseURL: `${url}/api/`,
        headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });
}