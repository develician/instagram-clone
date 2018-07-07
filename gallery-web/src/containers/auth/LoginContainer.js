import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';
import LoginForm from 'components/login/LoginForm';
import LoginWrapper from '../../components/login/LoginWrapper/LoginWrapper';

class LoginContainer extends Component {

    componentDidMount() {
        if (localStorage.getItem("logged") === "true") {
            this.props.history.push("/");
            return;
        }
        this.initialize();
    }

    initialize = () => {
        const { AuthActions } = this.props;
        AuthActions.initialize();
    }

    handleChangeInput = ({ value, name }) => {
        const { AuthActions } = this.props;
        AuthActions.changeInput({ value, name });
    }

    handleKeypress = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    handleLogin = async () => {
        const { AuthActions,
            username,
            password } = this.props;

        try {
            await AuthActions.login({ username, password });
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { handleChangeInput, handleLogin, handleKeypress } = this;
        const { username, password, error, errorMessage } = this.props;

        return (
            <LoginWrapper>
                <LoginForm
                    username={username}
                    password={password}
                    onChangeInput={handleChangeInput}
                    onLogin={handleLogin}
                    error={error}
                    errorMessage={errorMessage}
                    onKeypress={handleKeypress} />
            </LoginWrapper>
        );
    }
}


export default connect(
    (state) => ({
        username: state.auth.getIn(['authInputs', 'username']),
        password: state.auth.getIn(['authInputs', 'password']),
        error: state.auth.getIn(['error', 'login']),
        errorMessage: state.auth.getIn(['error', 'message'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(LoginContainer));