import React from 'react';
import styles from './SuggestWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SuggestWrapper = ({children}) => (
  <div className={cx('suggest-wrapper')}>
    <div className={cx('label')}>
      회원님을 위한 추천
    </div>
    {children}
  </div>
);

export default SuggestWrapper;