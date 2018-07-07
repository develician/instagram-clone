import axios from 'axios';

export const getPosts = ({page}, config) => axios.get(`/gallery/?page=${page}`, config);
export const getPostDetail = ({image_id}, config) => axios.get(`/gallery/${image_id}/`, config);
export const removePost = ({image_id}, config) => axios.delete(`/gallery/${image_id}/`, config);
export const likePost = ({image_id}, config) => axios.post(`/gallery/${image_id}/likes/`, {}, config);
export const unlikePost = ({image_id}, config) => axios.delete(`/gallery/${image_id}/unlikes/`, config);