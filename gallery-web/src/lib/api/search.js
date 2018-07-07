import axios from 'axios';

export const searchUser = ({username}, config) => axios.get(`/users/search/?username=${username}`, config);