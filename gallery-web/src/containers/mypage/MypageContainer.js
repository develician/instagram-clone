import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as userActions from 'store/modules/user';
import * as postActions from 'store/modules/post';
import MypageForm from 'components/mypage/MypageForm';
import UserMenuContainer from 'containers/common/UserMenuContainer';
import UserProfile from 'components/profile/UserProfile';
import Posts from '../../components/profile/Posts/Posts';

const $ = window.$;
class MypageContainer extends Component {

    state = {
        checkingPermission: true,
        username: '',
        loadingState: false,
        page: 1
    };

    componentDidMount() {
        // console.log("here");
        this.initialize();
        this.checkPermission();
        this.getUserProfile();
        this.getMyImages({page: 1});

        $(window).scroll(() => {
            if ($(document).height() - $(window).height() - $(window).scrollTop() <= 200) {
                // console.log(this.state.page);
                // console.log(this.props.loadingState);
                if(this.props.isLast) {
                    return;
                }
                if (!this.props.loadingState && this.props.posts.toJS().length !== 0) {
                    this.getMyImages({page: this.state.page + 1});
                    this.makeLoading();
                    this.setState({
                        // loadingState: true,
                        page: this.state.page + 1
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

    initialize = () => {
        const { PostActions } = this.props;
        PostActions.initialize();
    }

    makeLoading = () => {
        const { PostActions } = this.props;
        PostActions.makeLoading();
    }

    unbindLoading = () => {
        const { PostActions } = this.props;
        PostActions.unbindLoading();
    }

    checkPermission = async () => {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        const { BaseActions } = this.props;
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        }
        try {
            await BaseActions.checkLogged(config);
            if (this.props.loggedUsername !== username) {
                alert("자신의 페이지가 아니네요..!");
                window.location.href = "/";
                return;
            }
            this.setState({
                checkingPermission: false,
                username: username
            });
        } catch (e) {
            alert("로그인을 해주세요...");
            window.location.href = "/login";
        }
    }

    getUserProfile = async () => {
        const { UserActions } = this.props;
        const username = await localStorage.getItem("username");
        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.getUserProfile({ username }, config);
        } catch (e) {
            console.log(e);
        }
    }

    getMyImages = async ({page}) => {
        const { PostActions } = this.props;

        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        }

        try {
            await PostActions.getPosts({ page }, config);
            this.unbindLoading();

            // console.log("unbind");
        } catch (e) {
            console.log(e);
        }
    }

    showProfileModal = () => {
        const { BaseActions } = this.props;

        BaseActions.showProfileModal();
    }

    render() {
        const { profile, posts, loadingState } = this.props;
        const { showProfileModal } = this;
        if(this.props.penderLoading) {
            return null;
        }
        return (
            <React.Fragment>
                <UserProfile
                    profile={profile}
                    showProfileModal={showProfileModal}
                    // onFollowUser={handleFollowUser}
                    // onUnfollowUser={handleUnfollowUser}
                     />
                {/* <MypageForm
                    loading={this.state.checkingPermission}
                    username={this.state.username}
                    profile={profile}
                    posts={posts}
                    showProfileMenu={showProfileMenu}
                    loadingState={loadingState} /> */}
                <Posts posts={posts} />
                {/* <UserMenuContainer /> */}
            </React.Fragment>
        );
    }
}

export default connect(
    (state) => ({
        loggedUsername: state.base.get('loggedUsername'),
        profile: state.user.get('profile'),
        posts: state.post.get('posts'),
        isLast: state.post.get('isLast'),
        loadingState: state.post.get('loadingState'),
        penderLoading: state.pender.pending['user/GET_USER_PROFILE']
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(withRouter(MypageContainer));