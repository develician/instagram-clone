import axios from 'axios';

export const checkLogged = (config) => axios.get(`/users/check/`, config);
