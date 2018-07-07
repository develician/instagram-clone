import React from 'react';
import styles from './ProfileModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const ProfileModal = ({visible, hideProfileModal, handleClickFileInput, onLogout}) => (
  <ModalWrapper visible={visible}>
    <div className={cx('menus')}>
      {/* <div className={cx('menu')} onClick={handleClickFileInput}>
        썸네일 이미지 변경
      </div> */}
      <div className={cx('menu')}>
        비밀번호 변경
      </div>
      <div className={cx('menu')} onClick={onLogout}>
        로그아웃
      </div>
      <div className={cx('menu')} onClick={hideProfileModal}>
        취소
      </div>
    </div>
  </ModalWrapper>
);

export default ProfileModal;