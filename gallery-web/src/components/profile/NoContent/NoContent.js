import React from 'react';
import styles from './NoContent.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const NoContent = () => (
  <div className={cx('no-content')}>
    <div className={cx('image-wrapper')}>
      <img src={require('components/common/Images/NoContent.jpg')} alt='no_content_img' />
    </div>
    <div className={cx('description')}>
      <h2 className={cx('h2-font')}>소중한 순간을 포착하여 공유해보세요.</h2>
      <h3 className={cx('h3-font')}>앱을 다운로드하고 첫 사진이나 동영상을 공유해보세요.</h3>
    </div>
  </div>
);

export default NoContent;