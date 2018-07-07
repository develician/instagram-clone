import React from 'react';
import styles from './AccountEditWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AccountEditWrapper = ({ children }) => (
  <div className={cx('wrapped')}>
    <div className={cx('wrapper')}>
      {children}
    </div>
  </div>
);

export default AccountEditWrapper;