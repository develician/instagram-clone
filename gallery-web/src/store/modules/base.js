import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as BaseAPI from 'lib/api/base';
import { pender } from 'redux-pender';

// action types
const CHECK_LOGGED = 'base/CHECK_LOGGED';
const SET_LOGGED = 'base/SET_LOGGED';
const SHOW_PROFILE_MENU = 'base/SHOW_PROFILE_MENU';
const HIDE_PROFILE_MENU = 'base/HIDE_PROFILE_MENU';
const SHOW_POST_MODAL = 'base/SHOW_POST_MODAL';
const HIDE_POST_MODAL = 'base/HIDE_POST_MODAL';
const SHOW_PROFILE_MODAL = 'base/SHOW_PROFILE_MODAL';
const HIDE_PROFILE_MODAL = 'base/HIDE_PROFILE_MODAL';
const SHOW_FOLLOW_MODAL = 'base/SHOW_FOLLOW_MODAL';
const HIDE_FOLLOW_MODAL = 'base/HIDE_FOLLOW_MODAL';
const SHOW_FOLLOWING_MODAL = 'base/SHOW_FOLLOWING_MODAL';
const HIDE_FOLLOWING_MODAL = 'base/HIDE_FOLLOWING_MODAL';
const SHOW_COMMENT_MODAL = 'base/SHOW_COMMENT_MODAL';
const HIDE_COMMENT_MODAL = 'base/HIDE_COMMENT_MODAL';
const SHOW_SEARCH_PANEL = 'base/SHOW_SEARCH_PANEL';
const HIDE_SEARCH_PANEL = 'base/HIDE_SEARCH_PANEL';

// action creator
export const checkLogged = createAction(CHECK_LOGGED, BaseAPI.checkLogged);
export const setLogged = createAction(SET_LOGGED);
export const showProfileMenu = createAction(SHOW_PROFILE_MENU);
export const hideProfileMenu = createAction(HIDE_PROFILE_MENU);
export const showPostModal = createAction(SHOW_POST_MODAL);
export const hidePostModal = createAction(HIDE_POST_MODAL);
export const showProfileModal = createAction(SHOW_PROFILE_MODAL);
export const hideProfileModal = createAction(HIDE_PROFILE_MODAL);
export const showFollowModal = createAction(SHOW_FOLLOW_MODAL);
export const hideFollowModal = createAction(HIDE_FOLLOW_MODAL);
export const showFollowingModal = createAction(SHOW_FOLLOWING_MODAL);
export const hideFollowingModal = createAction(HIDE_FOLLOWING_MODAL);
export const showCommentModal = createAction(SHOW_COMMENT_MODAL);
export const hideCommentModal = createAction(HIDE_COMMENT_MODAL);
export const showSearchPanel = createAction(SHOW_SEARCH_PANEL);
export const hideSearchPanel = createAction(HIDE_SEARCH_PANEL);

// initial state
const initialState = Map({
    logged: false,
    loggedUsername: '',
    profileMenu: Map({
        visible: false
    }),
    postModalVisible: false,
    profileModalVisible: false,
    followModalVisible: false,
    followingModalVisible: false,
    commentModalVisible: false,
    searchPanelVisible: false
});

// reducer
export default handleActions({
    ...pender({
        type: CHECK_LOGGED,
        onSuccess: (state, action) => {
            const { data: username } = action.payload;
            
            return state.set('logged', true)
                        .set('loggedUsername', username);
        },
        onFailure: (state, action) => {
            return state.set('logged', false);
        }
    }),
    [SET_LOGGED]: (state, action) => {
        return state.set('logged', true);
    },
    [SHOW_PROFILE_MENU]: (state, action) => {
        return state.setIn(['profileMenu', 'visible'], true);
    },
    [HIDE_PROFILE_MENU]: (state, action) => {
        return state.setIn(['profileMenu', 'visible'], false);
    },
    [SHOW_POST_MODAL]: (state, action) => {
        return state.set('postModalVisible', true);
    },
    [HIDE_POST_MODAL]: (state, action) => {
        return state.set('postModalVisible', false);
    },
    [SHOW_PROFILE_MODAL]: (state, action) => {
        return state.set('profileModalVisible', true);
    },
    [HIDE_PROFILE_MODAL]: (state, action) => {
        return state.set('profileModalVisible', false);
    },
    [SHOW_FOLLOW_MODAL]: (state, action) => {
        return state.set('followModalVisible', true);
                    
    },
    [HIDE_FOLLOW_MODAL]: (state, action) => {
        return state.set('followModalVisible', false);
    },
    [SHOW_FOLLOWING_MODAL]: (state, action) => {
        return state.set('followingModalVisible', true);
                    
    },
    [HIDE_FOLLOWING_MODAL]: (state, action) => {
        return state.set('followingModalVisible', false);
    },
    [SHOW_COMMENT_MODAL]: (state, action) => {
        return state.set('commentModalVisible', true);
                    
    },
    [HIDE_COMMENT_MODAL]: (state, action) => {
        return state.set('commentModalVisible', false);
    },
    [SHOW_SEARCH_PANEL]: (state, action) => {
        return state.set('searchPanelVisible', true);
                    
    },
    [HIDE_SEARCH_PANEL]: (state, action) => {
        return state.set('searchPanelVisible', false);
    },
}, initialState);