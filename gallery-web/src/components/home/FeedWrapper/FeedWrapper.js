import React from 'react';
import styles from './FeedWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const FeedWrapper = ({ children }) => (
  <div className={cx('feed-wrapper')}>
    {children}
  </div>
);

export default FeedWrapper;