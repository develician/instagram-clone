import React from 'react';
import styles from './Loading.scss';
import classNames from 'classnames/bind';
import { CircleLoader } from 'react-spinners';

const cx = classNames.bind(styles);

const Loading = ({loading}) => (
  <div className={cx('circle-loading')}>
    <CircleLoader
      color={'#f59f00'}
      loading={loading}
    />
  </div>
);

export default Loading;