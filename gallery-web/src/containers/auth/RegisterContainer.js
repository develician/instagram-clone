import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as authActions from 'store/modules/auth';
import RegisterForm from 'components/register/RegisterForm';
import RegisterWrapper from 'components/register/RegisterWrapper/RegisterWrapper';

class RegisterContainer extends Component {

    componentDidMount() {
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
            this.handleRegister();
        }
    }

    handleRegister = async () => {
        const { AuthActions,
            username,
            password1,
            password2,
            email,
            name } = this.props;

        if (username === "" || password1 === "" || password2 === "" || email === "" || name === "") {
            AuthActions.makeErrorMessage({ message: '빈 항목은 존재할수 없습니다.', category: 'register' });
            return;
        }


        try {
            await AuthActions.register({ username, email, password1, password2, name });
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        const { handleChangeInput, handleRegister, handleKeypress } = this;
        const { username, email, password1, password2, name, error, errorMessage } = this.props;
        return (
            <RegisterWrapper>
                <RegisterForm
                    username={username}
                    email={email}
                    password1={password1}
                    password2={password2}
                    name={name}
                    onChangeInput={handleChangeInput}
                    onRegister={handleRegister}
                    error={error}
                    errorMessage={errorMessage}
                    onKeypress={handleKeypress} />
            </RegisterWrapper>
        );
    }
}

export default connect(
    (state) => ({
        username: state.auth.getIn(['authInputs', 'username']),
        name: state.auth.getIn(['authInputs', 'name']),
        password1: state.auth.getIn(['authInputs', 'password1']),
        password2: state.auth.getIn(['authInputs', 'password2']),
        email: state.auth.getIn(['authInputs', 'email']),
        error: state.auth.getIn(['error', 'register']),
        errorMessage: state.auth.getIn(['error', 'message'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(withRouter(RegisterContainer));