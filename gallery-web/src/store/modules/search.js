import { createAction, handleActions } from 'redux-actions';

import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as SearchAPI from 'lib/api/search';

// action types
const INITIALIZE = 'search/INITIALIZE';
const SEARCH_USER = 'search/SEARCH_USER';
const CHANGE_USERNAME = 'search/CHANGE_USERNAME';

// action creator
export const initialize = createAction(INITIALIZE);
export const searchUser = createAction(SEARCH_USER, SearchAPI.searchUser);
export const changeUsername = createAction(CHANGE_USERNAME);

// initial state
const initialState = Map({
    userList: List(),
    username: '',
    searched: false
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: SEARCH_USER,
        onSuccess: (state, action) => {
            // console.log(action.payload.data);
            const { data: userList } = action.payload;
            return state.set('userList', fromJS(userList))
                        .set('searched', true);
        }
    }),
    [CHANGE_USERNAME]: (state, action) => {
        const { value } = action.payload;
        return state.set('username', value);
    }
}, initialState);