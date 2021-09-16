import axios from 'axios';
import { API } from '../utils/config'; //amake api er link ta import korte hobe

export const register = (user) => {  //ai function ta user er details ghula accept korbe
    return axios.post(`${API}/user/signup`, user, { //link ta amader backend er link
        headers: { //headers pass kore diyechi
            'Content-Type': 'application/json'
        }
    })
};

export const login = (user) => {
    return axios.post(`${API}/user/signin`, user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};