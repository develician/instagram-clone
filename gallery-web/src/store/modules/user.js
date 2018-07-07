import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as UserAPI from 'lib/api/user';

// action types
const INITIALIZE = 'user/INITIALIZE';
const GET_USER_PROFILE = 'user/GET_USER_PROFILE';
const GET_USER_PROFILE_BY_ID = 'user/GET_USER_PROFILE_BY_ID';
const CHANGE_USER_PROFILE_IMAGE = 'user/CHANGE_USER_PROFILE_IMAGE';
const GET_USER_PHOTO_LIST = 'user/GET_USER_PHOTO_LIST';
const MAKE_LOADING = 'user/MAKE_LOADING';
const UNBIND_LOADING = 'user/UNBIND_LOADING';
const FOLLOW_USER = 'user/FOLLOW_USER';
const UNFOLLOW_USER = 'user/UNFOLLOW_USER';
const GET_FOLLOWERS = 'user/GET_FOLLOWERS';
const GET_FOLLOWING = 'user/GET_FOLLOWING';
const GET_FOLLOWING_POSTS = 'user/GET_FOLLOWING_POSTS';
const SET_FOLLOW = 'user/SET_FOLLOWING';
const SET_UNFOLLOW = 'user/SET_UNFOLLOW';
const EXPLORE_USERS = 'user/EXPLORE_USERS';
const SET_SUGGESTION_FOLLOW = 'user/SET_SUGGESTION_FOLLOW';
const SET_SUGGESTION_UNFOLLOW = 'user/SET_SUGGESTION_UNFOLLOW';
const SET_LIKE_POST = 'post/SET_LIKE_POST';
const SET_UNLIKE_POST = 'post/SET_UNLIKE_POST';

// action creator
export const initialize = createAction(INITIALIZE);
export const getUserProfile = createAction(GET_USER_PROFILE, UserAPI.getUserProfile);
export const getUserProfileById = createAction(GET_USER_PROFILE_BY_ID, UserAPI.getUserProfileById);
export const changeUserProfileImage = createAction(CHANGE_USER_PROFILE_IMAGE, UserAPI.changeUserProfileImage);
export const getUserPhotoList = createAction(GET_USER_PHOTO_LIST, UserAPI.getUserPhotoList);
export const makeLoading = createAction(MAKE_LOADING);
export const unbindLoading = createAction(UNBIND_LOADING);
export const followUser = createAction(FOLLOW_USER, UserAPI.followUser);
export const unfollowUser = createAction(UNFOLLOW_USER, UserAPI.unfollowUser);
export const getFollowers = createAction(GET_FOLLOWERS, UserAPI.getFollowers);
export const getFollowing = createAction(GET_FOLLOWING, UserAPI.getFollowing);
export const getFollowingPosts = createAction(GET_FOLLOWING_POSTS, UserAPI.getFollowingPosts);
export const setFollow = createAction(SET_FOLLOW);
export const setUnfollow = createAction(SET_UNFOLLOW);
export const exploreUsers = createAction(EXPLORE_USERS, UserAPI.exploreUsers);
export const setSuggestionFollow = createAction(SET_SUGGESTION_FOLLOW);
export const setSuggestionUnfollow = createAction(SET_SUGGESTION_UNFOLLOW);
export const setLikePost = createAction(SET_LIKE_POST);
export const setUnlikePost = createAction(SET_UNLIKE_POST);


// initial state
const initialState = Map({
    profile: Map({
        id: 0,
        profile_image: '',
        username: '',
        name: '',
        post_count: null,
        photos: List(),
        is_self: false,
        email: '',
        following_count: 0,
        followers_count: 0,
        following: false
    }),
    error: false,
    posts: List(),
    isLast: false,
    loadingState: false,
    followers: List(),
    following: List(),
    followingPosts: List(),
    suggestionList: List()
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,  
    ...pender({
        type: GET_USER_PROFILE,
        onSuccess: (state, action) => {
            // console.log(action.payload);
            const { is_self, 
                    name, 
                    photos, 
                    post_count, 
                    profile_image, 
                    username, 
                    email, 
                    id,
                    followers_count,
                    following_count,
                    following } = action.payload.data;

            return state.setIn(['profile', 'is_self'], is_self)
                        .setIn(['profile', 'username'], username)
                        .setIn(['profile', 'name'], name)
                        .setIn(['profile', 'post_count'], post_count)
                        .setIn(['profile', 'photos'], fromJS(photos))
                        .setIn(['profile', 'profile_image'], profile_image)
                        .setIn(['profile', 'email'], email)
                        .setIn(['profile', 'id'], id)
                        .setIn(['profile', 'followers_count'], followers_count)
                        .setIn(['profile', 'following_count'], following_count)
                        .setIn(['profile', 'following'], following);

        },  
        onFailure: (state, action) => {
            return state.set('error', true);
        }
    }),
    ...pender({
        type: GET_USER_PROFILE_BY_ID,
        onSuccess: (state, action) => {
            // console.log(action.payload);
            const { is_self, name, photos, post_count, profile_image, username, email } = action.payload.data;

            return state.setIn(['profile', 'is_self'], is_self)
                        .setIn(['profile', 'username'], username)
                        .setIn(['profile', 'name'], name)
                        .setIn(['profile', 'post_count'], post_count)
                        .setIn(['profile', 'photos'], fromJS(photos))
                        .setIn(['profile', 'profile_image'], profile_image)
                        .setIn(['profile', 'email'], email);

        },  
        onFailure: (state, action) => {
            console.log(action.response);
        }
    }),
    ...pender({
        type: GET_USER_PHOTO_LIST,
        onSuccess: (state, action) => {
            const { data: posts } = action.payload;
            const isLast = action.payload.headers['is_last'];
            // console.log(isLast);
            return state.set('posts', state.get('posts').concat(posts))
                        .set('isLast', (isLast === 'True'));
        }
    }),
    [MAKE_LOADING]: (state, action) => {
        return state.set('loadingState', true);
    },
    [UNBIND_LOADING]: (state, action) => {
        return state.set('loadingState', false);
    },
    ...pender({
        type: GET_FOLLOWERS,
        onSuccess: (state, action) => {
            return state.set('followers', fromJS(action.payload.data));
        }
    }),
    ...pender({
        type: GET_FOLLOWING,
        onSuccess: (state, action) => {
            // console.log(action.payload.data);
            return state.set('following', fromJS(action.payload.data));
        }
    }),
    ...pender({
        type: GET_FOLLOWING_POSTS,
        onSuccess: (state, action) => {
            const { data: followingPosts } = action.payload;
            const isLast = action.payload.headers['is_last'];
            return state.set('followingPosts', state.get('followingPosts').concat(followingPosts))
                        .set('isLast', (isLast === 'True'));
        }
    }),
    [SET_FOLLOW]: (state, action) => {
        const { id } = action.payload;
        const updatedFollowing = state.get('following').toJS().map((following, index) => {
            if (following.id === id) {
                return {...following, following: true}
            }
            return following;
        }); 
        return state.set('following', fromJS(updatedFollowing));
    },
    [SET_UNFOLLOW]: (state, action) => {
        const { id } = action.payload;
        const updatedFollowing = state.get('following').toJS().map((following, index) => {
            if (following.id === id) {
                return {...following, following: false}
            }
            return following;
        }); 
        return state.set('following', fromJS(updatedFollowing));
    },
    ...pender({
        type: EXPLORE_USERS,
        onSuccess: (state, action) => {
            const { data: users } = action.payload;
            return state.set('suggestionList', fromJS(users));
        }
    }),
    [SET_SUGGESTION_FOLLOW]: (state, action) => {
        const { id } = action.payload;
        // console.log(id);
        const updatedFollowing = state.get('suggestionList').toJS().map((following, index) => {
            // console.log(following.id);
            if (following.id === parseInt(id, 10)) {
                // console.log(following.id);
                return {...following, following: true}
            }
            return following;
        }); 
        // console.log(updatedFollowing);
        return state.set('suggestionList', fromJS(updatedFollowing));
    },
    [SET_SUGGESTION_UNFOLLOW]: (state, action) => {
        const { id } = action.payload;
        const updatedFollowing = state.get('suggestionList').toJS().map((following, index) => {
            if (following.id === parseInt(id, 10)) {
                return {...following, following: false}
            }
            return following;
        }); 
        return state.set('suggestionList', fromJS(updatedFollowing));
    },
    [SET_LIKE_POST]: (state, action) => {
        const {id} = action.payload;
        const updatedPosts = state.get('followingPosts').toJS().map(post => {
            if(post.id === id) {
                return {
                    ...post,
                    is_liked: true
                }
            }
            return post;
        });
        console.log(updatedPosts);

        return state.set('followingPosts', fromJS(updatedPosts));
    },
    [SET_UNLIKE_POST]: (state, action) => {
        const {id} = action.payload;
        const updatedPosts = state.get('followingPosts').toJS().map(post => {
            if(post.id === id) {
                return {
                    ...post,
                    is_liked: false
                }
            }
            return post;
        });

        return state.set('followingPosts', fromJS(updatedPosts));
    }
}, initialState);