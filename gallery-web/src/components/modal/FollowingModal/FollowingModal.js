import React from 'react';
import styles from './FollowingModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import CloseIcon from 'react-icons/lib/md/close';
import UserList from 'components/modal/UserList';

const cx = classNames.bind(styles);

const FollowingModal = ({ visible, 
                          hideFollowingModal, 
                          following, 
                          handleFollowUser, 
                          handleUnfollowUser,
                          goToUserPage }) => {
  
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('followers')}>
        <div className={cx('title')}>
          <div className={cx('text')}>
            팔로잉
            </div>
          <div className={cx('icon')}>
            <CloseIcon onClick={hideFollowingModal} />
          </div>
        </div>
        <UserList
          users={following}
          handleFollowUser={handleFollowUser}
          handleUnfollowUser={handleUnfollowUser}
          goToUserPage={goToUserPage}
         />
      </div>
    </ModalWrapper>
  )

}

export default FollowingModal;