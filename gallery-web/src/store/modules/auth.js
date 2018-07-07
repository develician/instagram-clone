import { createAction, handleActions } from 'redux-actions';

import { Map, List } from 'immutable';
import * as AuthAPI from 'lib/api/auth';
import { pender } from 'redux-pender';


// action types
const INITIALIZE = 'auth/INITIALIZE';
const REGISTER = 'auth/REGISTER';
const LOGIN = 'auth/LOGIN';
const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const MAKE_ERROR_MESSAGE = 'auth/MAKE_ERROR_MESSAGE';
const LOGOUT = 'auth/LOGOUT';


// action creator
export const initialize = createAction(INITIALIZE);
export const changeInput = createAction(CHANGE_INPUT);
export const register = createAction(REGISTER, AuthAPI.register);
export const login = createAction(LOGIN, AuthAPI.login);
export const makeErrorMessage = createAction(MAKE_ERROR_MESSAGE);
export const logout = createAction(LOGOUT, AuthAPI.logout);

// initial state
const initialState = Map({
    authInputs: Map({
        username: '',
        email: '',
        name: '',
        password1: '',
        password2: '',
        password: ''
    }),
    error: Map({
        login: false,
        register: false,
        message: ''
    }),
    success: Map({
        login: false,
        register: false
    })
});

// reducer
export default handleActions({
    [INITIALIZE]: (state, action) => initialState,
    ...pender({
        type: REGISTER,
        onSuccess: (state, action) => {
            const { token } = action.payload.data;
            const { email, username  } = action.payload.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("logged", true);
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);

            return state.setIn(['success', 'register'], true);
        },
        onFailure: (state, action) => {
            // console.log(action.payload.response.data);
            const { username, email, non_field_errors } = action.payload.response.data;
            if(email || username) {
                if(email[0] === "A user is already registered with this e-mail address." || username[0] === "A user with that username already exists.") {
                    return state.setIn(['error', 'register'], true)
                                .setIn(['error', 'message'], '이미 존재하는 아이디 혹은 이메일 입니다.');
                }
                if(email[0] === "Enter a valid email address.") {
                    return state.setIn(['error', 'register'], true)
                                .setIn(['error', 'message'], '정확한 이메일을 입력 해 주세요.');
                }
                if(username[0] === "Enter a valid username. This value may contain only English letters, numbers, and @/./+/-/_ characters.") {
                    return state.setIn(['error', 'register'], true)
                                .setIn(['error', 'message'], '정확한 아이디를 입력 해 주세요.');
                }
            }
            
            if(non_field_errors) {
                if(non_field_errors[0] === "The two password fields didn't match.") {
                    return state.setIn(['error', 'register'], true)
                                .setIn(['error', 'message'], '두 패스워드가 일치하지 않습니다.');
                }
            }
        }
    }),
    ...pender({
        type: LOGIN,
        onSuccess: (state, action) => {
            // console.log(action.payload);
            const { token } = action.payload.data;
            const { email, username } = action.payload.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("logged", true);
            localStorage.setItem("email", email);
            localStorage.setItem("username", username);

            return state.setIn(['success', 'login'], true);

        },
        onFailure: (state, action) => {
            // console.log(action.payload.response);
            const { password, non_field_errors } = action.payload.response.data;
            if(password) {
                if(password[0] === "This field may not be blank.") {
                    return state.setIn(['error', 'login'], true)
                                .setIn(['error', 'message'], '비밀번호를 입력해주세요.');
                }
            }
            if(non_field_errors) {
                if(non_field_errors[0] === 'Must include "username" and "password".') {
                    return state.setIn(['error', 'login'], true)
                                .setIn(['error', 'message'], '아이디 혹은 비밀번호가 입력되지 않았습니다.');
                }
                if(non_field_errors[0] === "Unable to log in with provided credentials.") {
                    return state.setIn(['error', 'login'], true)
                                .setIn(['error', 'message'], '잘못된 아이디 혹은 비밀번호 입니다.');
                }
            }
        }
    }),
    [CHANGE_INPUT]: (state, action) => {
        const { value, name } = action.payload;
        return state.setIn(['authInputs', name], value);
    },
    [MAKE_ERROR_MESSAGE]: (state, action) => {
        const { message, category } = action.payload;
        return state.setIn(['error', category], true)
                    .setIn(['error', 'message'], message);
    }
}, initialState);