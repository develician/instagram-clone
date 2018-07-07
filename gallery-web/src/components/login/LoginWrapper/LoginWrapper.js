import React from 'react';
import styles from './LoginWrapper.scss';
import classNames from 'classnames/bind';
import LeadForm from 'components/login/LeadForm';

const cx = classNames.bind(styles);

const LoginWrapper = ({children}) => (
  <div className={cx('login-wrapper')}>
    <div className={cx('form')}>
      {children}
    </div>
    <div className={cx('register-lead')}>
      <LeadForm />
    </div>
  </div>
);

export default LoginWrapper;