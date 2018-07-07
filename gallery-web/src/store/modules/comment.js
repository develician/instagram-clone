import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import { pender } from 'redux-pender';
import * as CommentAPI from 'lib/api/comment';

// action types
const INITIALIZE_COMMENT = 'comment/INITIALIZE_COMMENT';
const COMMENT = 'comment/COMMENT';
const CHANGE_INPUT = 'comment/CHANGE_INPUT';
const REMOVE_COMMENT = 'comment/REMOVE_COMMENT';
const SHOW_CLEAR_ICON = 'comment/SHOW_CLEAR_ICON';
const HIDE_CLEAR_ICON = 'comment/HIDE_CLEAR_ICON';
const REMOVE_CLICKED = 'comment/REMOVE_CLICKED';

// action creator
export const initializeComment = createAction(INITIALIZE_COMMENT);
export const comment = createAction(COMMENT, CommentAPI.comment);
export const changeInput = createAction(CHANGE_INPUT);
export const removeComment = createAction(REMOVE_COMMENT, CommentAPI.removeComment);
export const showClearIcon = createAction(SHOW_CLEAR_ICON);
export const hideClearIcon = createAction(HIDE_CLEAR_ICON);
export const removeClicked = createAction(REMOVE_CLICKED);

// initial state
const initialState = Map({
    comment: '',
    clearIconVisible: false,
    clicked: false
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { value } = action.payload
        return state.set('comment', value);
    },
    [INITIALIZE_COMMENT]: (state, action) => {
        return state.set('comment', '');
    },
    [SHOW_CLEAR_ICON]: (state, action) => {
        return state.set('clearIconVisible', true);
    },
    [HIDE_CLEAR_ICON]: (state, action) => {
        return state.set('clearIconVisible', false);
    },
    [REMOVE_CLICKED]: (state, action) => {
        return state.set('clicked', true);
    }
}, initialState);