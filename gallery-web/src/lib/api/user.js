import axios from 'axios';

export const getUserProfile = ({username}, config) => axios.get(`/users/${username}`, config);
export const getUserProfileById = ({user_id}, config) => axios.get(`/users/id/${user_id}`, config);
export const changeUserProfileImage = ({username}, formData, config) => axios.put(`/users/${username}/`, formData, config);
export const getUserPhotoList = ({username, page}, config) => axios.get(`/gallery/photos/${username}/?page=${page}`, config);
export const followUser = ({user_id}, config) => axios.post(`/users/${user_id}/follow/`, {}, config);
export const unfollowUser = ({user_id}, config) => axios.post(`/users/${user_id}/unfollow/`, {}, config);
export const getFollowers = ({username}, config) => axios.get(`/users/${username}/followers/`, config); 
export const getFollowing = ({username}, config) => axios.get(`/users/${username}/following/`, config);
export const getFollowingPosts = ({username, page}, config) => axios.get(`/users/${username}/following_posts/?page=${page}`, config);
export const exploreUsers = (config) => axios.get(`/users/explore/`, config);