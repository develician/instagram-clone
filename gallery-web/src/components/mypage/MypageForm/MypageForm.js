import React, { Component } from 'react';
import styles from './MypageForm.scss';
import classNames from 'classnames/bind';
import { CircleLoader } from 'react-spinners';
import SettingIcon from 'react-icons/lib/io/android-settings';
import ImageDisplay from 'components/mypage/ImageDisplay';

const cx = classNames.bind(styles);

class MypageForm extends Component {



  render() {
    const { loading, username, showProfileMenu, posts, loadingState } = this.props;
    const { is_self, 
            name, 
            profile_image, 
            post_count, 
            photos, 
            followers_count,
            following_count,
            email } = this.props.profile.toJS();
    if (loading) {
      return (
        <div className={cx('circle-loading-wrapper')}>
          <CircleLoader
            color={'#f59f00'}
            loading={loading}
          />
        </div>
      )
    }
    return (
      <React.Fragment>
        <React.Fragment>
          <div className={cx('mypage-form')}>
            <div className={cx('title')}>
              {username}'s page
          </div>
            <div className={cx('setting-icon')}>
              <SettingIcon className={cx('setting')} onClick={showProfileMenu} />
            </div>
            <div className={cx('infos')}>
              <div className={cx('label')}>
                프로필 이미지
            </div>
              <div className={cx('value')}>
                <img src={profile_image} alt="profile_image" />
              </div>
            </div>
            <div className={cx('infos')}>
              <div className={cx('label')}>
                이메일
            </div>
              <div className={cx('value')}>
                {email}
              </div>
            </div>
            <div className={cx('infos')}>
              <div className={cx('label')}>
                게시된 이미지 수
            </div>
              <div className={cx('value')}>
                {post_count}
              </div>
            </div>
            <div className={cx('infos')}>
              <div className={cx('label')}>
                팔로워 수
            </div>
              <div className={cx('value')}>
                {followers_count}
              </div>
            </div>
            <div className={cx('infos')}>
              <div className={cx('label')}>
                팔로우
            </div>
              <div className={cx('value')}>
                {following_count}
              </div>
            </div>
          </div>
        </React.Fragment>
        <ImageDisplay posts={posts}/>
        <div className={cx('loading')}>
          <CircleLoader
            color={'#f59f00'}
            loading={loadingState}
          />
        </div>
        
      </React.Fragment>
    );
  }
}

export default MypageForm;