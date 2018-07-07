import React from 'react';
import styles from './UserMenuItem.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserMenuItem = ({children, onClick}) => (
  <div onClick={onClick} className={cx('menu-item')}>
    {children}
  </div>
);

export default UserMenuItem;