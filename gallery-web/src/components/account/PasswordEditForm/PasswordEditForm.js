import React from 'react';
import styles from './PasswordEditForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const PasswordEditForm = ({
  profile,
  handleChange,
  onChangeProfile,
  username,
  name,
  email,
  password,
  password1,
  password2,
  onChangePassword,
}) => {
  const handleChangePassword = () => {
    if (password1.trim().length === 0 || password2.trim().length === 0) {
      console.log('error1');
      return;
    }
    if (password1 !== password2) {
      console.log('error2');
      return;
    }
    onChangePassword({ password, password1 });
  };

  return (
    <div className={cx('form-wrapper')}>
      <div className={cx('user')}>
        <div className={cx('profile-image')}>
          <img src={profile.toJS().profile_image} alt="profile_image" />
        </div>
        <div className={cx('info')}>
          <div className={cx('username')}>{profile.toJS().username}</div>
        </div>
      </div>
      <div className={cx('inputs')}>
        <div className={cx('line')}>
          <div className={cx('label')}>이전 비밀번호</div>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')}>새 비밀번호</div>
          <input type="password" name="password1" onChange={handleChange} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')}>새 비밀번호 확인</div>
          <input type="password" name="password2" onChange={handleChange} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')} />
          <div className={cx('button')}>
            <Button onClick={handleChangePassword} theme="update-profile-submit">
              비밀번호 변경
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditForm;
