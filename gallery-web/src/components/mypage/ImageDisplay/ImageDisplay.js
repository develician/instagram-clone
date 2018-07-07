import React from 'react';
import styles from './ImageDisplay.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import FilledLikeIcon from 'react-icons/lib/fa/heart';
import ReplyIcon from 'react-icons/lib/md/chat-bubble-outline';

const cx = classNames.bind(styles);

const ImageDisplay = ({ posts }) => {
 

  const displayArray = posts.toJS().map((post, i) => {
    
    return (
      <Link to={`/image/${post.id}`}
        className={cx("square")}
        key={i}>
        <div className={cx("content")}>
          {
            (
              <div className={cx('mask')}>
              <div className={cx('counts')}>
                <FilledLikeIcon /> {post.like_count}개
              </div>
              <div className={cx('counts')}>
                <ReplyIcon /> {post.comment_count}개
              </div>
            </div>
            )
          }
          <img src={post.image} alt='display_image' />
        </div>
      </Link>
    )
  });

  return (
    <div className={cx("square-container")}>
      {
        displayArray
      }
    </div>
  )
}

export default ImageDisplay;