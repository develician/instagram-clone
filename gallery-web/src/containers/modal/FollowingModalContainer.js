import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import FollowingModal from 'components/modal/FollowingModal';

class FollowingModalContainer extends Component {

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeypress);

    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeypress);
    }

    getUserProfile = async () => {
        const { UserActions, username } = this.props;

        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await UserActions.getUserProfile({ username }, config);
            // if (!this.state.initiallyLoaded) {
            //     this.getUserPhotoList({ page: 1 });
            // }
            // this.setState({
            //     loading: false,
            //     initiallyLoaded: true
            // });
        } catch (e) {
            console.log(e);
        }
    }


    hideFollowingModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hideFollowingModal();
    }

    handleKeypress = (e) => {
        if (e.keyCode === 27 && this.props.visible) {
            this.hideFollowingModal();
        }
    }

    handleFollowUser = async ({ id }) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.followUser({ user_id: id }, config);
            // this.getFollowing();
            this.setFollow({id});
            this.getUserProfile();
        } catch (e) {
            console.log(e);
        }
    }

    handleUnfollowUser = async ({ id }) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.unfollowUser({ user_id: id }, config);
            // this.getFollowing();
            this.setUnfollow({id});
            this.getUserProfile();
        } catch (e) {
            console.log(e);
        }
    }


    getFollowing = async () => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await UserActions.getFollowing({ username: this.props.username }, config);
        } catch (e) {
            console.log(e);
        }
    }


    goToUserPage = ({ username }) => {
        this.hideFollowingModal();
        this.props.history.push(`/user/${username}`);
    }

    setFollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setFollow({ id });
    }

    setUnfollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setUnfollow({ id });
    }

    render() {
        const { visible, following } = this.props;
        const { hideFollowingModal, 
                handleFollowUser, 
                handleUnfollowUser, 
                goToUserPage } = this;
        return (
            <FollowingModal
                visible={visible}
                hideFollowingModal={hideFollowingModal}
                following={following}
                handleFollowUser={handleFollowUser}
                handleUnfollowUser={handleUnfollowUser}
                goToUserPage={goToUserPage}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.get('followingModalVisible'),
        following: state.user.get('following'),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(withRouter(FollowingModalContainer));