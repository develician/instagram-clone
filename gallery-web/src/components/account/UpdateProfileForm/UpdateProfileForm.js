import React from 'react';
import styles from './UpdateProfileForm.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const UpdateProfileForm = ({ username, name, email, handleChange, profile, onChangeFile }) => {

  const handleClick = () => {
    if(profile.toJS().profile_image !== 'http://localhost:8000/media/photos/profiles/no_image.png') {
      // Show Profile Update Modal
      return;
    }
    this.updateImageInput.click();
  }

  const handleChangeFile = async (e) => {
    
    const selectedFile = e.target.files[0];
    const formData = await new FormData();
    await formData.append('profile_image', selectedFile); 
    onChangeFile({formData});
  }



  return (
    <div className={cx('form-wrapper')}>
      <div className={cx('user')}>
        <div className={cx('profile-image')}>
          <img src={profile.toJS().profile_image} alt="profile_image" />
        </div>
        <div className={cx('info')}>
          <div className={cx('username')}>
            {profile.toJS().username}
            </div>
          <div className={cx('update-image')} onClick={handleClick}>
            프로필 사진 변경
          </div>
          <input 
            accept="image/x-png,image/gif,image/jpeg" 
            style={{display: 'none'}}
            type="file" 
            name="file" 
            onChange={handleChangeFile}
            ref={el => this.updateImageInput = el} />
        </div>
  
      </div>
      <div className={cx('inputs')}>
        <div className={cx('line')}>
          <div className={cx('label')}>
            이름
            </div>
          <input type="text" name="username" value={profile.toJS().username} disabled={true} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')}>
            사용자 이름
            </div>
          <input type="text" name="name" value={profile.toJS().name} onChange={handleChange} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')}>
            이메일
            </div>
          <input type="email" name="email" value={profile.toJS().email} onChange={handleChange} />
        </div>
        <div className={cx('line')}>
          <div className={cx('label')}>
          </div>
          <div className={cx('button')}>
            <Button theme="update-profile-submit">제출</Button>
          </div>
        </div>
      </div>
  
    </div>
  );
  
}
export default UpdateProfileForm;