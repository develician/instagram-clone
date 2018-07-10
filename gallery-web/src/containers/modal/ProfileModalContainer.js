import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import * as authActions from 'store/modules/auth';
import ProfileModal from 'components/modal/ProfileModal';

class ProfileModalContainer extends Component {
  hideProfileModal = () => {
    const { BaseActions } = this.props;
    BaseActions.hideProfileModal();
  };

  handleClickFileInput = () => {
    this.profile_image.click();
  };

  handleChangeFile = async e => {
    // console.log(e.target.files[0]);
    const selectedFile = e.target.files[0];
    const token = await localStorage.getItem('token');
    const username = await localStorage.getItem('username');

    const formData = await new FormData();
    await formData.append('profile_image', selectedFile);

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const { UserActions } = this.props;

    try {
      await UserActions.changeUserProfileImage({ username }, formData, config);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  handleLogout = async () => {
    const { AuthActions, history } = this.props;
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await AuthActions.logout(config);
      await localStorage.clear();
      this.hideProfileModal();
      history.push('/');
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    const { visible } = this.props;
    const { hideProfileModal, handleClickFileInput, handleChangeFile, handleLogout } = this;
    // const { hidePostModal, handleRemovePost, handleUpdateClick } = this;
    return (
      <React.Fragment>
        <ProfileModal
          visible={visible}
          hideProfileModal={hideProfileModal}
          handleClickFileInput={handleClickFileInput}
          onLogout={handleLogout}
        />
        <input
          type="file"
          name="profile_image"
          style={{ display: 'none' }}
          ref={el => (this.profile_image = el)}
          onChange={handleChangeFile}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    visible: state.base.get('profileModalVisible'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(withRouter(ProfileModalContainer));
