import React, { Component } from 'react';
import ImageDetailForm from 'components/detail/ImageDetailForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as postActions from 'store/modules/post';
import * as userActions from 'store/modules/user';
import * as baseActions from 'store/modules/base';
import * as commentActions from 'store/modules/comment';


class ImageDetailContainer extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        this.getPostDetail();
    }

    getUserProfile = async ({ username }, config) => {
        const { UserActions } = this.props;

        try {
            await UserActions.getUserProfile({ username }, config);
            this.setState({
                loading: false
            });
        } catch (e) {
            console.log(e);
        }
    }

    getPostDetail = async () => {
        const { image_id } = this.props;
        const { PostActions } = this.props;
        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await PostActions.getPostDetail({ image_id }, config);
            this.getUserProfile({ username: this.props.post.toJS().owner.username }, config);
        } catch (e) {
            console.log(e);
        }
    }



    showPostModal = () => {
        const { BaseActions } = this.props;
        BaseActions.showPostModal();
    }

    handleChangeInput = ({ value }) => {
        const { CommentActions } = this.props;
        CommentActions.changeInput({ value });
    }

    handleReply = async () => {
        const { CommentActions, comment, image_id } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await CommentActions.comment({ image_id, message: comment }, config);
            this.initializeComment();
            this.getPostDetail();
        } catch (e) {
            console.log(e);
        }
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleReply();
        }
    }

    initializeComment = () => {
        const { CommentActions } = this.props;
        CommentActions.initializeComment();
    }

    showClearIcon = () => {
        const { CommentActions } = this.props;
        CommentActions.showClearIcon();
    }

    hideClearIcon = () => {
        const { CommentActions } = this.props;
        CommentActions.hideClearIcon();
    }

    showCommentModal = () => {
        const { BaseActions } = this.props;
        BaseActions.showCommentModal();
    }

    removeComment = async ({ comment_id }) => {
        const { CommentActions } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await CommentActions.removeComment({ comment_id }, config);
            // this.hideClearIcon();
            this.getPostDetail();
        } catch (e) {
            console.log(e);
        }
    }


    likePost = async () => {
        const { PostActions, image_id } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await PostActions.likePost({ image_id }, config);
            this.getPostDetail();
        } catch (e) {
            console.log(e);
        }
    }

    unlikePost = async () => {
        const { PostActions, image_id } = this.props;
        const token = await localStorage.getItem('token');
        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };
        try {
            await PostActions.unlikePost({ image_id }, config);
            this.getPostDetail();
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { post, profile, comment, clearIconVisible } = this.props;
        const { loading } = this.state;
        const { showPostModal,
            handleChangeInput,
            handleKeyPress,
            showCommentModal,
            removeComment,
            likePost,
            unlikePost } = this;
        return (
            <div>
                <ImageDetailForm
                    clearIconVisible={clearIconVisible}
                    post={post}
                    profile={profile}
                    loading={loading}
                    showPostModal={showPostModal}
                    onChangeInput={handleChangeInput}
                    onKeyPress={handleKeyPress}
                    comment={comment}
                    showCommentModal={showCommentModal}
                    removeComment={removeComment}
                    likePost={likePost}
                    unlikePost={unlikePost} />
            </div>
        );
    }
}


export default connect(
    (state) => ({
        post: state.post.get('post'),
        profile: state.user.get('profile'),
        comment: state.comment.get('comment'),
        clearIconVisible: state.comment.get('clearIconVisible'),
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch),
        UserActions: bindActionCreators(userActions, dispatch),
        BaseActions: bindActionCreators(baseActions, dispatch),
        CommentActions: bindActionCreators(commentActions, dispatch),
    })
)(withRouter(ImageDetailContainer));