import React from 'react';
import styles from './SearchedUserProfile.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SearchedUserProfile = ({ userList }) => {

  if (userList) {
    const userArray = userList.map((user, index) => {
      return (
        <Link to={`/user/${user.toJS().username}`} className={cx('searched-user-form')} key={user.toJS().id}>
          <div className={cx('profile')}>
            <div className={cx('profile-image')}>
              <img src={user.toJS().profile_image} alt="user-profile" />
            </div>
            <div className={cx('username')}>
              {user.toJS().username}
            </div>
          </div>
        </Link>
      )
    });
    return (
      <React.Fragment>
      {
        userArray
      }
      </React.Fragment>
    );
  } else {
    return null;
  }


}

export default SearchedUserProfile;