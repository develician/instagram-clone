import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActions from 'store/modules/user';
import * as baseActions from 'store/modules/base';
import UserProfile from 'components/profile/UserProfile';
import Posts from 'components/profile/Posts';
import Loading from 'components/profile/Loading';
import NoContent from 'components/profile/NoContent';

const $ = window.$;
// const posts = this.props.posts;

class UserProfileContainer extends Component {
  state = {
    loading: true,
    page: 1,
    initiallyLoaded: false,
    firstPenderLoading: true,
    updateLoading: false,
  };

  componentDidMount() {
    this.initialize();
    this.getUserProfile();
    $(window).scroll(() => {
      if ($(document).height() - $(window).height() - $(window).scrollTop() <= 200) {
        if (this.props.isLast) {
          return;
        }
        if (!this.props.loadingState && this.props.posts.toJS().length !== 0) {
          // console.log('bottom');
          this.getUserPhotoList({ page: this.state.page + 1 });
          this.makeLoading();
          this.setState({
            // loadingState: true,
            page: this.state.page + 1,
          });
        }
      } else {
        if (this.props.loadingState) {
          this.unbindLoading();
          // this.setState({
          //     loadingState: false
          // });
        }
      }
    });
  }

  componentWillUnmount() {
    $(window).unbind();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.username !== this.props.username) {
      this.setState({
        updateLoading: true,
      });
      this.initialize();
      this.setState({
        initiallyLoaded: false,
      });
      this.getUserProfile();

      // this.getUserPhotoList();
    }
  }

  initialize = () => {
    const { UserActions } = this.props;
    UserActions.initialize();
  };

  getUserProfile = async () => {
    const { UserActions, username } = this.props;

    const token = await localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await UserActions.getUserProfile({ username }, config);
      if (!this.state.initiallyLoaded) {
        this.getUserPhotoList({ page: 1 });
      }

      this.setState({
        loading: false,
        initiallyLoaded: true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getUserPhotoList = async ({ page }) => {
    const { UserActions, username } = this.props;

    const token = await localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await UserActions.getUserPhotoList({ username, page }, config);
      // console.log("success");
      if (this.state.firstPenderLoading) {
        this.setState({
          firstPenderLoading: false,
        });
      }
      if (this.state.updateLoading) {
        this.setState({
          updateLoading: false,
        });
      }
      this.unbindLoading();
    } catch (e) {
      console.log(e);
    }
  };

  makeLoading = () => {
    const { UserActions } = this.props;
    UserActions.makeLoading();
  };

  unbindLoading = () => {
    const { UserActions } = this.props;
    UserActions.unbindLoading();
  };

  handleFollowUser = async () => {
    const { UserActions } = this.props;
    const { id } = this.props.profile.toJS();
    const token = await localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      await UserActions.followUser({ user_id: id }, config);
      this.getUserProfile();
    } catch (e) {
      console.log(e);
    }
  };

  handleUnfollowUser = async () => {
    const { UserActions } = this.props;
    const { id } = this.props.profile.toJS();
    const token = await localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
    try {
      await UserActions.unfollowUser({ user_id: id }, config);
      this.getUserProfile();
    } catch (e) {
      console.log(e);
    }
  };

  showFollowModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showFollowModal();
    this.getFollowers();
  };

  showFollowingModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showFollowingModal();
    this.getFollowing();
  };

  getFollowers = async () => {
    const { UserActions } = this.props;
    const token = await localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await UserActions.getFollowers({ username: this.props.profile.toJS().username }, config);
    } catch (e) {
      console.log(e);
    }
  };

  getFollowing = async () => {
    const { UserActions } = this.props;
    const token = await localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };

    try {
      await UserActions.getFollowing({ username: this.props.profile.toJS().username }, config);
    } catch (e) {
      console.log(e);
    }
  };

  showProfileModal = () => {
    const { BaseActions } = this.props;

    BaseActions.showProfileModal();
  };

  render() {
    const { profile, error, posts } = this.props;
    const {
      handleFollowUser,
      handleUnfollowUser,
      showFollowModal,
      showFollowingModal,
      showProfileModal,
    } = this;

    const { loading } = this.state;
    if (loading) {
      return <Loading loading={loading} />;
    }
    if (this.state.updateLoading) {
      return null;
    }
    if (this.props.postPenderLoading && this.state.firstPenderLoading) {
      return null;
    }

    return (
      <React.Fragment>
        <UserProfile
          profile={profile}
          onFollowUser={handleFollowUser}
          onUnfollowUser={handleUnfollowUser}
          showFollowModal={showFollowModal}
          showFollowingModal={showFollowingModal}
          showProfileModal={showProfileModal}
        />
        {posts.toJS().length > 0 ? <Posts posts={posts} /> : <NoContent />}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    profile: state.user.get('profile'),
    error: state.user.get('error'),
    isLast: state.user.get('isLast'),
    loadingState: state.user.get('loadingState'),
    posts: state.user.get('posts'),
    postPenderLoading: state.pender.pending['user/GET_USER_PHOTO_LIST'],
  }),
  dispatch => ({
    UserActions: bindActionCreators(userActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
  })
)(withRouter(UserProfileContainer));
