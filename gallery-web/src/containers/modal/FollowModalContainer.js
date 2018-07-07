import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import FollowModal from 'components/modal/FollowModal';

class FollowModalContainer extends Component {

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

    hideFollowModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hideFollowModal();
    }

    handleKeypress = (e) => {
        if (e.keyCode === 27 && this.props.visible) {
            this.hideFollowModal();
        }
    }

    handleFollowUser = async ({id}) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.followUser({ user_id: id }, config);
            this.getFollowers();
            this.getUserProfile();
        } catch (e) {
            console.log(e);
        }
    }

    handleUnfollowUser = async ({id}) => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.unfollowUser({ user_id: id }, config);
            this.getFollowers();
            this.getUserProfile();
        } catch (e) {
            console.log(e);
        }
    }


    getFollowers = async () => {
        const { UserActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await UserActions.getFollowers({ username: this.props.username }, config);
        } catch (e) {
            console.log(e);
        }
    }

    goToUserPage = ({username}) => {
        this.hideFollowModal();
        this.props.history.push(`/user/${username}`);
    }

    render() {
        const { visible, followers } = this.props;
        const { hideFollowModal, handleFollowUser, handleUnfollowUser, goToUserPage } = this;
        return (
            <FollowModal
                visible={visible}
                hideFollowModal={hideFollowModal}
                followers={followers}
                handleFollowUser={handleFollowUser}
                handleUnfollowUser={handleUnfollowUser}
                goToUserPage={goToUserPage}
            />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.get('followModalVisible'),
        followers: state.user.get('followers'),
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
    })
)(withRouter(FollowModalContainer));