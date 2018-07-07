import React from 'react';
import styles from './Posts.scss';
import classNames from 'classnames/bind';
import ImageDisplay from 'components/mypage/ImageDisplay';

const cx = classNames.bind(styles);

const Posts = ({posts}) => (
  <ImageDisplay posts={posts} />
);

export default Posts;