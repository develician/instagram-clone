import React from 'react';
import styles from './UserMenu.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const UserMenu = ({children}) => (
  <div className={cx('positioner')}> 
    <div className={cx('menu-wrapper')}>
      {children}
    </div>
  </div>
);

export default UserMenu;