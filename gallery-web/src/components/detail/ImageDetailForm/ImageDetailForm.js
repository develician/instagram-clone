import React from 'react';
import styles from './ImageDetailForm.scss';
import classNames from 'classnames/bind';
import SettingIcon from 'react-icons/lib/md/settings';
import { CircleLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import EmptyLikeIcon from 'react-icons/lib/fa/heart-o';
import FilledLikeIcon from 'react-icons/lib/fa/heart';
import ReplyIcon from 'react-icons/lib/md/chat-bubble-outline';
import DotIcon from 'react-icons/lib/md/keyboard-control';
import ClearIcon from 'react-icons/lib/md/clear';

const cx = classNames.bind(styles);

const ImageDetailForm = ({ post,
  profile,
  loading,
  showPostModal,
  onChangeInput,
  comment,
  onKeyPress,
  clearIconVisible,
  showCommentModal,
  removeComment,
  likePost,
  unlikePost }) => {



  const handleFocusReplyInput = () => {
    this.replyInput.focus();
  };

  const handleChange = (e) => {
    const { value } = e.target;
    onChangeInput({ value });
  };

  const onRemoveComment = (e) => {
    removeComment({ comment_id: e.target.id });
  };

  if (loading) {
    return (
      <div className={cx('loading')}>
        <CircleLoader
          color={'#f59f00'}
          loading={loading}
        />
      </div>
    )
  };

  const commentList = post.toJS().comments.map((comment, index) => {
    return (
      <li key={comment.id}>
        <Link className={cx('username')} to={`/user/${comment.owner.username}`}>
          {comment.owner.username}
        </Link>
        {
          comment.owner.is_self ? (
            <span className={cx('span')}>
              <div className={cx('comment')}>
                {comment.message}
              </div>
              <div className={cx('clear')} id={comment.id} onClick={onRemoveComment}>
                <ClearIcon
                  onClick={onRemoveComment}
                  id={comment.id}
                  style={{ display: clearIconVisible ? 'block' : 'none' }}
                  className={cx('clear-icon')} />
              </div>
            </span>
          ) : (
              <span className={cx('span')}>{comment.message}</span>
            )
        }
      </li>

    )
  });
  return (
    <React.Fragment>

      <div className={cx('image-detail-form')}>
        <div className={cx('sticky-user-profile')}>
          <Link to={`/user/${profile.toJS().username}/`}>
            <img src={post.toJS().image} />
          </Link>
          <Link to={`/user/${profile.toJS().username}/`} className={cx('username')}>
            {profile.toJS().username}
          </Link>
          {
            profile.toJS().is_self && (
              <div className={cx('setting-icon')}>
                <SettingIcon
                  className={cx('icon')}
                  onClick={showPostModal} />
              </div>
            )
          }
        </div>
        <div className={cx('image-container')}>
          <img src={post.toJS().image} />
        </div>
        <div className={cx('right-zone')}>
          <div className={cx('profile-wrapper')}>
            <div className={cx('profile-zone')}>
              <div className={cx('profile-image')}>
                <Link to={`/user/${profile.toJS().username}/`}>
                  <img src={profile.toJS().profile_image} />
                </Link>
              </div>
              <Link to={`/user/${profile.toJS().username}/`} className={cx('username')}>
                {profile.toJS().username}
              </Link>
              {
                profile.toJS().is_self && (
                  <div className={cx('setting-icon')}>
                    <SettingIcon
                      className={cx('icon')}
                      onClick={showPostModal} />
                  </div>
                )
              }
            </div>
          </div>
          <div className={cx('reply')}>
            <div className={cx('reply-zone')}>
              <div className={cx('comment')} >
                <div className={cx('user-caption')}>
                  <div className={cx('username')}>
                    {profile.toJS().username}
                  </div>
                  <div className={cx('text')}>
                    {post.toJS().caption}
                  </div>
                </div>
                <div className={cx('replies')}>
                  <ul>
                    {
                      commentList
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className={cx('icons-zone')}>
              {
                post.toJS().is_liked ? (
                  <FilledLikeIcon onClick={unlikePost} className={cx('icon')} />
                ) : (
                    <EmptyLikeIcon onClick={likePost} className={cx('icon')} />
                  )
              }
              <ReplyIcon
                onClick={handleFocusReplyInput}
                className={cx('icon')} />
              <DotIcon className={cx('right-icon')} onClick={showCommentModal} />
            </div>
            {
              post.toJS().like_count > 0 && (
                <div className={cx('like-count')}>
                  좋아요 {post.toJS().like_count}개
                </div>
              )
            }
            <div className={cx('write-reply')}>
              <input
                type="text"
                name="reply"
                placeholder="댓글 달기.."
                onChange={handleChange}
                value={comment}
                ref={el => this.replyInput = el}
                onKeyPress={onKeyPress} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ImageDetailForm;