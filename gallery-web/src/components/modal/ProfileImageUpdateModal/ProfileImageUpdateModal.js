import React from 'react';
import styles from './ProfileImageUpdateModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import axios from 'axios';

const cx = classNames.bind(styles);

const ProfileImageUpdateModal = ({ visible, onHide }) => {
  const handleClickUpload = () => {
    this.imageSelector.click();
  };

  const changeProfileImage = async () => {
    const file = this.imageSelector.files[0];

    const formData = new FormData();
    formData.append('profile_image', file);

    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    };

    await axios
      .put(`/users/${localStorage.getItem('username')}/`, formData, config)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeProfileImageToDefault = async () => {
    const formData = new FormData();
    formData.append('profile_image', null);
    const config = {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`,
      },
    };

    await axios
      .put(`/users/${localStorage.getItem('username')}/`, formData, config)
      .then(response => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <ModalWrapper visible={visible}>
      <div className={cx('wrapper')}>
        <div className={cx('title')}>프로필 사진 바꾸기</div>
        <div className={cx('menus')}>
          <div className={cx('menu', 'upload')} onClick={handleClickUpload}>
            사진 업로드
          </div>
          <div className={cx('menu', 'reset')} onClick={handleChangeProfileImageToDefault}>
            현재 사진 삭제
          </div>
          <div className={cx('menu', 'cancel')} onClick={onHide}>
            취소
          </div>
          <input
            onChange={changeProfileImage}
            ref={el => (this.imageSelector = el)}
            type="file"
            name="profile_image"
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProfileImageUpdateModal;
