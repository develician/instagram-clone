import React from 'react';
import styles from './AccountEditForm.scss';
import classNames from 'classnames/bind';
import UpdateProfileForm from 'components/account/UpdateProfileForm';
import PasswordEditForm from 'components/account/PasswordEditForm';

const cx = classNames.bind(styles);

const AccountEditForm = ({
  selection,
  onSelect,
  username,
  name,
  email,
  onChange,
  profile,
  onChangeFile,
  onChangeProfile,
  error,
  errorMessage,
  disabled,
  password,
  password1,
  password2,
  onChangePassword,
}) => {
  const handleChange = e => {
    const { name, value } = e.target;
    onChange({ name, value });
  };

  return (
    <div className={cx('form')}>
      <div className={cx('left-panel')}>
        <div className={cx('menus')}>
          <div
            className={cx('menu', selection === 'profile' && 'selected')}
            onClick={() => onSelect({ selection: 'profile' })}
          >
            프로필 편집
          </div>
          <div
            className={cx('menu', selection === 'password' && 'selected')}
            onClick={() => onSelect({ selection: 'password' })}
          >
            비밀번호 변경
          </div>
        </div>
      </div>
      <div className={cx('right-panel')}>
        {selection === 'profile' && (
          <UpdateProfileForm
            disabled={disabled}
            error={error}
            errorMessage={errorMessage}
            profile={profile}
            handleChange={handleChange}
            username={username}
            email={email}
            name={name}
            onChangeFile={onChangeFile}
            onChangeProfile={onChangeProfile}
          />
        )}
        {selection === 'password' && (
          <PasswordEditForm
            username={username}
            name={name}
            email={email}
            profile={profile}
            handleChange={handleChange}
            onChangeProfile={onChangeProfile}
            password={password}
            password1={password1}
            password2={password2}
            onChangePassword={onChangePassword}
          />
        )}
      </div>
    </div>
  );
};

export default AccountEditForm;
