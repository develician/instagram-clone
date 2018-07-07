import React from 'react';
import styles from './FollowModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import CloseIcon from 'react-icons/lib/md/close';
import UserList from 'components/modal/UserList';

const cx = classNames.bind(styles);

const FollowModal = ({ visible,
                       hideFollowModal, 
                       followers, 
                       handleFollowUser, 
                       handleUnfollowUser,
                       goToUserPage }) => {
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('followers')}>
        <div className={cx('title')}>
          <div className={cx('text')}>
            팔로워
            </div>
          <div className={cx('icon')}>
            <CloseIcon onClick={hideFollowModal} />
          </div>
        </div>
        <UserList
          users={followers}
          handleFollowUser={handleFollowUser}
          handleUnfollowUser={handleUnfollowUser}
          goToUserPage={goToUserPage} />
      </div>
    </ModalWrapper>
  )

}

export default FollowModal;