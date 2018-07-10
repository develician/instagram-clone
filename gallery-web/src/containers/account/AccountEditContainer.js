import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import AccountEditWrapper from 'components/account/AccountEditWrapper';
import AccountEditForm from 'components/account/AccountEditForm';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import * as accountActions from 'store/modules/account';

class AccountEditContainer extends Component {
  componentDidMount() {
    this.initialize();
    this.getUserProfile();
  }

  initialize = () => {
    const { UserActions } = this.props;
    UserActions.initialize();
  };

  getUserProfile = async () => {
    const { UserActions, AccountActions } = this.props;
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      await UserActions.getUserProfile({ username }, config);
      AccountActions.changeInitial({ profile: this.props.profile.toJS() });
    } catch (e) {
      console.log(e);
    }
  };

  handleSelect = ({ selection }) => {
    const { BaseActions } = this.props;
    BaseActions.updateSelection({ selection });
  };

  handleChange = ({ name, value }) => {
    const { AccountActions, UserActions } = this.props;
    if (value.trim().length === 0) {
      UserActions.setDisabled();
    } else {
      UserActions.unsetDisabled();
    }
    AccountActions.changeInput({ name, value });
  };

  handleChangeFile = async ({ formData }) => {
    const token = await localStorage.getItem('token');
    const username = await localStorage.getItem('username');

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

  handleChangeProfile = async (username, name, email) => {
    const { UserActions } = this.props;

    if (!username || !name || !email) {
      UserActions.setError({ reason: '빈 정보는 수정할수 없습니다.' });
      return;
    }

    const storageUsername = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      await UserActions.changeUserProfile(
        {
          username: storageUsername,
          name,
          email,
        },
        config
      );
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  handleChangePassword = async ({ password, password1 }) => {
    const { UserActions } = this.props;

    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await UserActions.changeUserPassword({ username, password, password1 }, config);
    } catch (e) {
      console.log(e);
    }
  };

  showProfileImageModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showUpdateProfileImageModal();
  };

  render() {
    const {
      handleSelect,
      handleChange,
      handleChangeFile,
      handleChangeProfile,
      handleChangePassword,
      showProfileImageModal,
    } = this;
    const { selection, profile, error, errorMessage, disabled } = this.props;
    const { username, name, email, password, password1, password2 } = this.props.input.toJS();
    return (
      <AccountEditWrapper>
        <AccountEditForm
          error={error}
          errorMessage={errorMessage}
          profile={profile}
          onChange={handleChange}
          onChangePassword={handleChangePassword}
          username={username}
          name={name}
          email={email}
          onSelect={handleSelect}
          selection={selection}
          onChangeFile={handleChangeFile}
          onChangeProfile={handleChangeProfile}
          disabled={disabled}
          password={password}
          password1={password1}
          password2={password2}
          showProfileImageModal={showProfileImageModal}
        />
      </AccountEditWrapper>
    );
  }
}

export default connect(
  state => ({
    selection: state.base.get('selection'),
    input: state.account.get('input'),
    profile: state.user.get('profile'),
    error: state.user.get('error'),
    errorMessage: state.user.get('errorMessage'),
    disabled: state.user.get('disabled'),
  }),
  dispatch => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AccountActions: bindActionCreators(accountActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(withRouter(AccountEditContainer));
