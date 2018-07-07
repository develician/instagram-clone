import React from 'react';
import styles from './UserList.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const UserList = ({ users, 
                    handleFollowUser, 
                    handleUnfollowUser, 
                    goToUserPage}) => {
  const userArray = users.toJS().map((user, index) => {
    return (
      <div className={cx('user')} key={user.id}>
        <div className={cx('user-image')}>
          <img 
            src={user.profile_image} 
            onClick={() => goToUserPage({username: user.username})} 
            alt="user_image"
          />
        </div>
        <div 
          className={cx('username')}
          onClick={() => goToUserPage({username: user.username})}>
          {user.username}
        </div>
        <div className={cx('button')}>
          {
            user.is_self ? null : user.following ? (
              (
                <Button onClick={() => handleUnfollowUser({id: user.id})} theme="unfollow">언팔로우</Button>
              )
            ) : (
                (
                  <Button onClick={() => handleFollowUser({id: user.id})} theme="follow">팔로우</Button>
                )
              )
          }
        </div>
      </div>
    )
  })
  return (
    <div className={cx('user-list')}>
      {
        userArray
      }
    </div>
  );
}

export default UserList;