import React from 'react';
import styles from './RegisterWrapper.scss';
import classNames from 'classnames/bind';
import LeadForm from 'components/register/LeadForm';

const cx = classNames.bind(styles);

const RegisterWrapper = ({children}) => (
  <div className={cx('register-wrapper')}>
    <div className={cx('form')}>
      {children}
    </div>
    <div className={cx('login-lead')}>
      <LeadForm />
    </div>
  </div>
);

export default RegisterWrapper;