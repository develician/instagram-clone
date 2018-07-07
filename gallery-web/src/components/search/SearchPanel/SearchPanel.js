import React from 'react';
import styles from './SearchPanel.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SearchPanel = ({ visible, userList, onHide, onLink }) => {



  const users = userList.toJS().map((user, i) => {
    return (
      <div onClick={() => linkTo({username: user.username})} className={cx('user')} key={user.id}>
        <div className={cx('profile-image')}>
          <img src={user.profile_image} alt="profile_image" />
        </div>
        <div className={cx('info')}>
          <div className={cx('username')}>
            {user.username}
          </div>
          <div className={cx('name')}>
            {user.name}
          </div>
        </div>
      </div>
    )
  });

  const linkTo = ({username}) => {
    onLink({username});
    onHide();
  };

 
  if (!visible) {
    return null;
  }
  return (
    <div className={cx('search-panel')}>
      {
        users
      }
    </div>
  );
}

export default SearchPanel;