import React from 'react';
import styles from './AccountEditForm.scss';
import classNames from 'classnames/bind';
import UpdateProfileForm from 'components/account/UpdateProfileForm';
import PasswordEditForm from 'components/account/PasswordEditForm';

const cx = classNames.bind(styles);

const AccountEditForm = ({ selection, 
                            onSelect,
                            username,
                            name,
                            email,
                            onChange,
                            profile,
                            onChangeFile }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({name, value});
  }

  return (
    <div className={cx('form')}>
      <div className={cx('left-panel')}>
        <div className={cx('menus')}>
          <div className={cx('menu', selection === 'profile' && 'selected')} onClick={() => onSelect({selection: 'profile'})}>
            프로필 편집
          </div>
          <div className={cx('menu', selection === 'password' && 'selected')} onClick={() => onSelect({selection: 'password'})}>
            비밀번호 변경
          </div>
        </div>
      </div>
      <div className={cx('right-panel')}>
        {
          selection === 'profile' && (
            <UpdateProfileForm 
              profile={profile}
              handleChange={handleChange}
              username={username}
              email={email}
              name={name}
              onChangeFile={onChangeFile}/>
          ) 
        }
        {
          selection === 'password' && (
            <PasswordEditForm
              profile={profile}
              handleChange={handleChange} />
          )
        }
      </div>
    </div>
  );
}

export default AccountEditForm;