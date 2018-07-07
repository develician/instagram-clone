import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import RegisterContainer from 'containers/auth/RegisterContainer';

const Register = () => {
    return (
        <PageTemplate>
            <RegisterContainer />
        </PageTemplate>
    );
};

export default Register;