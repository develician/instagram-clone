import React from 'react';
import styles from './ImageForm.scss';
import classNames from 'classnames/bind';
import HeartIcon from 'react-icons/lib/fa/heart-o';
import FilledHeartIcon from 'react-icons/lib/fa/heart';
import BubbleIcon from 'react-icons/lib/md/chat-bubble-outline';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ImageForm = ({ id, image, caption, username, profile_image, comments, likePost, unlikePost, is_liked }) => {

  const onLikePost = (e) => {
    // const id =
    console.log(e.target.id);
    likePost({image_id: e.target.id});
  };

  const onUnlikePost = (e) => {
    console.log(e.target.id);
    unlikePost({image_id: e.target.id});
  }

  const commentList = comments.map((comment, i) => {
    if(i < 3) {
      return (
      
        <li key={comment.id}>
          <div className={cx('username')}>{comment.owner.username}</div>
          &nbsp;
          <div className={cx('reply')}>{comment.message}</div>
        </li>
      )
    }
    
  });

  return (
    <div className={cx('form')}>
      <div className={cx('wrapper')}>
        <div className={cx('top-nav')}>
          <div className={cx('img-wrapper')}>
          <Link to={`/user/${username}`}>
            <img src={profile_image} alt="my_image" />
          </Link>
          </div>
          <div className={cx('username')}>
            <Link to={`/user/${username}`} className={cx('text')}>
              {username}
            </Link>
          </div>
        </div>
        <div className={cx('image-zone')}>
          <img src={image} alt='feed_image' />
        </div>
        <div className={cx('buttons')}>
          {
            is_liked ? (
              <FilledHeartIcon onClick={() => unlikePost({image_id: id})} className={cx('icon')} />
            ) : (
              <HeartIcon onClick={() => likePost({image_id: id})} className={cx('icon')} />
            )
          }
          <BubbleIcon className={cx('icon')} />
        </div>
        <div className={cx('caption-wrapper')}>
          <div className={cx('username')}>{username}</div> &nbsp;{caption}
        </div>
        <div className={cx('reply-wrapper')}>
          <Link to={`/image/${id}`} className={cx('more-reply')}>
            댓글 더 보기
          </Link>
          <ul>
          {
            commentList
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ImageForm;