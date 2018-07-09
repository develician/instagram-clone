import React from "react";
import styles from "./UserProfile.scss";
import classNames from "classnames/bind";
import Button from "components/common/Button";
import SettingIcon from "react-icons/lib/io/android-settings";

const cx = classNames.bind(styles);

const UserProfile = ({
  profile,
  onFollowUser,
  onUnfollowUser,
  showProfileModal,
  showFollowModal,
  showFollowingModal
}) => {
  return (
    <div className={cx("profile-form")}>
      <div className={cx("profile-image")}>
        <img src={profile.toJS().profile_image} alt="user-profile-image" />
      </div>
      <div className={cx("profile-info")}>
        <div className={cx("username-and-follow")}>
          <div className={cx("username")}>{profile.toJS().username}</div>
          <div className={cx("button")}>
            {profile.toJS().is_self ? (
              <Button to={`/account/edit`} theme="profile-edit">
                프로필 편집
              </Button>
            ) : profile.toJS().following ? (
              <Button onClick={onUnfollowUser} theme="unfollow">
                언팔로우
              </Button>
            ) : (
              <Button onClick={onFollowUser} theme="follow">
                팔로우
              </Button>
            )}
          </div>
          {profile.toJS().is_self && (
            <div className={cx("setting")}>
              <SettingIcon onClick={showProfileModal} />
            </div>
          )}
        </div>
        <div className={cx("description")}>
          <div className={cx("counts")}>
            게시물 &nbsp;{" "}
            <div className={cx("count-text")}>{profile.toJS().post_count}</div>
          </div>
          <div className={cx("counts")} onClick={showFollowModal}>
            팔로워 &nbsp;{" "}
            <div className={cx("count-text")}>
              {profile.toJS().followers_count}
            </div>
          </div>
          <div className={cx("counts")} onClick={showFollowingModal}>
            팔로잉 &nbsp;{" "}
            <div className={cx("count-text")}>
              {profile.toJS().following_count}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
