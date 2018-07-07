import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import LoginContainer from 'containers/auth/LoginContainer';

const Login = () => {
    return (
        <PageTemplate>
            <LoginContainer />
        </PageTemplate>
    );
};

export default Login;