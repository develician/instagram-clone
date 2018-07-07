import axios from 'axios';

export const comment = ({image_id, message}, config) => axios.post(`/gallery/${image_id}/comments/`, {message}, config);
export const removeComment = ({comment_id}, config) => axios.delete(`/gallery/comments/${comment_id}/`, config);