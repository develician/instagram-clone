import React from 'react';
import styles from './SuggestList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Button from '../../common/Button/Button';

const cx = classNames.bind(styles);

const SuggestList = ({ suggestionList, onFollowUser, onUnfollowUser }) => {

  const handleFollow = (e) => {
    onFollowUser({id: e.target.id});
  };

  const handleUnfollow = (e) => {
    onUnfollowUser({id: e.target.id});
  }

  const userList = suggestionList.toJS().map((user, i) => {
    return (
      <div className={cx('user')} key={user.id}>
        <div className={cx('profile-image')}>
          <Link to={`/user/${user.username}`}>
            <img src={user.profile_image} alt='suggestion_image' />
          </Link>
        </div>
        <div className={cx('user-info')}>
          <Link to={`/user/${user.username}`} className={cx('username')}>
            {user.username}
          </Link>
          <div className={cx('name')}>
            {user.name}
          </div>
          <div className={cx('desc')}>
            Instagram 신규 가입
          </div>
        </div>
        <div className={cx('button')}>
          {
             user.is_self ? null : user.following ? (
              <Button onClick={handleUnfollow} id={user.id} theme="unfollow">언팔로우</Button>
            ) : (
              <Button onClick={handleFollow} id={user.id} theme="follow">팔로우</Button>
            )
          }
        </div>
      </div>
    )
  });

  return (
    <div className={cx('wrapper')}>
      {userList}
      {/* <div className={cx('user')}>
        <div className={cx('profile-image')}>
          <img src={`http://localhost:8000/media/photos/profiles/no_image.png`} alt='suggestion_image' />
        </div>
        <div className={cx('user-info')}>
          <div className={cx('username')}>
            dongho1234
          </div>
          <div className={cx('name')}>
            choi dongho
          </div>
          <div className={cx('desc')}>
            Instagram 신규 가입
          </div>
        </div>
        <div className={cx('button')}>
          <Button theme="follow">팔로우</Button>
        </div>
      </div> */}
    </div>
  );
}

export default SuggestList;