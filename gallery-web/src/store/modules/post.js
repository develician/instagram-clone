import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as PostAPI from 'lib/api/post';

// action types
const INITIALIZE = 'post/INITIALIZE';
const GET_POSTS = 'post/GET_POSTS';
const MAKE_LOADING = 'post/MAKE_LOADING';
const UNBIND_LOADING = 'post/UNBIND_LOADING';
const GET_POST_DETAIL = 'post/GET_POST_DETAIL';
const REMOVE_POST = 'post/REMOVE_POST';
const LIKE_POST = 'post/LIKE_POST';
const UNLIKE_POST = 'post/UNLIKE_POST';


// action creator
export const initialize = createAction(INITIALIZE);
export const getPosts = createAction(GET_POSTS, PostAPI.getPosts);
export const makeLoading = createAction(MAKE_LOADING);
export const unbindLoading = createAction(UNBIND_LOADING);
export const getPostDetail = createAction(GET_POST_DETAIL, PostAPI.getPostDetail);
export const removePost = createAction(REMOVE_POST, PostAPI.removePost);
export const likePost = createAction(LIKE_POST, PostAPI.likePost);
export const unlikePost = createAction(UNLIKE_POST, PostAPI.unlikePost);



// initial state
const initialState = Map({
    posts: List(),
    isLast: false,
    loadingState: false,
    post: Map({})
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: GET_POSTS,
        onSuccess: (state, action) => {
            // console.log(action.payload);

            const { data: posts } = action.payload;
            const isLast = action.payload.headers['is_last'];
            console.log(isLast);
            return state.set('posts', state.get('posts').concat(posts))
                        .set('isLast', (isLast === 'True'));
        },  
        onFailure: (state, action) => {

        }
    }),
    [MAKE_LOADING]: (state, action) => {
        return state.set('loadingState', true);
    },
    [UNBIND_LOADING]: (state, action) => {
        return state.set('loadingState', false);
    },
    ...pender({
        type: GET_POST_DETAIL,
        onSuccess: (state, action) => {
            const { data: post } = action.payload;
            return state.set('post', fromJS(post));
        }
    })
}, initialState);