import axios from 'axios';

export const register = ({username, email, password1, password2, name}) => axios.post(`/rest-auth/registration/`, {username, email, password1, password2, name});
export const login = ({username, password}) => axios.post(`/rest-auth/login/`, {username, password});
export const logout = (config) => axios.post(`/rest-auth/logout/`, {}, config);