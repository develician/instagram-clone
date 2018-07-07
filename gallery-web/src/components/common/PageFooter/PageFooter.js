import React from 'react';
import styles from './PageFooter.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageFooter = () => (
  <div className={cx('page-footer')}>
    PageFooter
  </div>
);

export default PageFooter;