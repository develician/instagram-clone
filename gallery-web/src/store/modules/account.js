import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';

// action types
const CHANGE_INPUT = 'domain/ACTION_NAME';

// action creator
export const changeInput = createAction(CHANGE_INPUT);

// initial state
const initialState = Map({
    input: Map({
        username: '',
        name: '',
        email: '',
        password: '',
        password1: '',
        password2: ''
    })
});

// reducer
export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { name, value } = action.payload;
        return state.setIn(['input', name], value);
    }
}, initialState);