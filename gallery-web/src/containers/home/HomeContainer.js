import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as postActions from 'store/modules/post';
import * as userActions from 'store/modules/user';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import ImageList from 'components/home/ImageList';
import LoginWrapper from 'components/login/LoginWrapper';
import LoginForm from 'components/login/LoginForm';
import SuggestWrapper from 'components/home/SuggestWrapper';
import SuggestForm from 'components/home/SuggestForm';
import FeedWrapper from 'components/home/FeedWrapper/FeedWrapper';


const $ = window.$;
class HomeContainer extends Component {

    state = {
        userProfileLoading: true,
        page: 1
    };

    componentDidMount() {
        this.checkLogged();
        this.getUserProfile();
        this.getFollowingPosts({username: localStorage.getItem('username'), page: this.state.page});
        this.exploreUsers();


        $(window).scroll(() => {
            if ($(document).height() - $(window).height() - $(window).scrollTop() <= 200) {

                if (this.props.isLast) {
                    return;
                }
                if (!this.props.loadingState && this.props.followingPosts.toJS().length !== 0) {
                    // console.log('bottom');
                    this.getFollowingPosts({ username: localStorage.getItem('username'), page: this.state.page + 1 })
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

    checkLogged = async () => {
        const logged = localStorage.getItem('logged');
        if (!logged || logged !== 'true') {
            localStorage.removeItem("logged");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            // this.props.history.push('/login');
            return;
        }

        const { BaseActions } = this.props;
        BaseActions.setLogged();
        const token = localStorage.getItem("token");
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await BaseActions.checkLogged(config);
        } catch (e) {
            localStorage.removeItem("logged");
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            // this.props.history.push('/login');
            // console.log('not logged');
        }
    }

    getUserProfile = async () => {
        const { UserActions } = this.props;
        const username = await localStorage.getItem('username');
        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await UserActions.getUserProfile({ username }, config);
            this.setState({
                userProfileLoading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    getFollowingPosts = async ({username, page}) => {
        const { UserActions } = this.props;
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        if (token) {
            try {
                await UserActions.getFollowingPosts({ username, page }, config);
                // console.log(this.props.following.toJS());
            } catch (e) {
                console.log(e);
            }
        }
    }

    handleChangeInput = ({ value, name }) => {
        const { AuthActions } = this.props;
        AuthActions.changeInput({ value, name });
    }

    handleKeypress = (e) => {
        if (e.key === 'Enter') {
            this.handleLogin();
        }
    }

    handleLogin = async () => {
        const { AuthActions,
            username,
            password } = this.props;

        try {
            await AuthActions.login({ username, password });
            window.location.href = "/";
        } catch (e) {
            console.log(e);
        }
    }

    exploreUsers = async () => {
        const { UserActions } = this.props;

        const token = localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await UserActions.exploreUsers(config);
        } catch (e) {
            console.log(e);
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
            this.setFollow({ id });
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
            this.setUnfollow({ id });
        } catch (e) {
            console.log(e);
        }
    }

    setFollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setSuggestionFollow({ id });
    }

    setUnfollow = ({ id }) => {
        const { UserActions } = this.props;
        UserActions.setSuggestionUnfollow({ id });
    }

    likePost = async ({ image_id }) => {
        const { PostActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        console.log(image_id);
        try {
            await PostActions.likePost({ image_id }, config);
            this.setLikePost({id: image_id});
        } catch (e) {
            console.log(e);
        }
    }

    unlikePost = async ({ image_id }) => {
        const { PostActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await PostActions.unlikePost({ image_id }, config);
            this.setUnlikePost({id: image_id});
        } catch (e) {
            console.log(e);
        }
    }

    setLikePost = ({id}) => {
        const { UserActions } = this.props;
        UserActions.setLikePost({id});
    }

    setUnlikePost = ({id}) => {
        const { UserActions } = this.props;
        UserActions.setUnlikePost({id});
    }

    makeLoading = () => {
        const { UserActions } = this.props;
        UserActions.makeLoading();
    }

    unbindLoading = () => {
        const { UserActions } = this.props;
        UserActions.unbindLoading();
    }

    render() {
        const { followingPosts,
            logged,
            username,
            password,
            error,
            errorMessage,
            profile,
            suggestionList } = this.props;
        const { handleChangeInput,
            handleLogin,
            handleKeypress,
            handleFollowUser,
            handleUnfollowUser,
            likePost,
            unlikePost } = this;
        if (!logged) {
            return (
                <LoginWrapper>
                    <LoginForm
                        username={username}
                        password={password}
                        onChangeInput={handleChangeInput}
                        onLogin={handleLogin}
                        error={error}
                        errorMessage={errorMessage}
                        onKeypress={handleKeypress} />
                </LoginWrapper>
            );
        }
        if (this.state.userProfileLoading) {
            return null;
        }
        if (profile.toJS().following_count === 0) {
            return (
                <SuggestWrapper>
                    <SuggestForm
                        suggestionList={suggestionList}
                        onFollowUser={handleFollowUser}
                        onUnfollowUser={handleUnfollowUser} />
                </SuggestWrapper>
            );
        }
        return (
            <FeedWrapper>
                <ImageList
                    posts={followingPosts}
                    likePost={likePost}
                    unlikePost={unlikePost}
                     />
            </FeedWrapper>
        );
    }
}

export default connect(
    (state) => ({
        posts: state.post.get('posts'),
        followingPosts: state.user.get('followingPosts'),
        logged: state.base.get('logged'),
        username: state.auth.getIn(['authInputs', 'username']),
        password: state.auth.getIn(['authInputs', 'password']),
        error: state.auth.getIn(['error', 'login']),
        errorMessage: state.auth.getIn(['error', 'message']),
        profile: state.user.get('profile'),
        suggestionList: state.user.get('suggestionList'),
        loadingState: state.user.get('loadingState'),
        isLast: state.user.get('isLast'),
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(withRouter(HomeContainer));