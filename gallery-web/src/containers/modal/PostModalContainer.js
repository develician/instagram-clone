import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';
import * as postActions from 'store/modules/post';
import PostModal from 'components/modal/PostModal';

class PostModalContainer extends Component {

    hidePostModal = () => {
        const { BaseActions } = this.props;
        BaseActions.hidePostModal();
    }

    handleRemovePost = async () => {
        const { image_id } = this.props;
        const { PostActions, history } = this.props;

        const token = await localStorage.getItem('token');

        const config = {
            headers: {
                'Authorization': `JWT ${token}`
            }
        };

        try {
            await PostActions.removePost({image_id}, config);
            this.hidePostModal();
            history.push('/mypage');
        } catch(e) {
            console.log(e);
        }
    }

    handleUpdateClick = () => {
        const { history, image_id } = this.props;
        this.hidePostModal();
        history.push(`/editor?id=${image_id}`);
    }

    render() {
        const { visible } = this.props;
        const { hidePostModal, handleRemovePost, handleUpdateClick } = this;
        return (
            <PostModal 
                visible={visible}
                hidePostModal={hidePostModal}
                onRemovePost={handleRemovePost}
                onUpdateClick={handleUpdateClick} />
        );
    }
}

export default connect(
    (state) => ({
        visible: state.base.get('postModalVisible')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        PostActions: bindActionCreators(postActions, dispatch),
    })
)(withRouter(PostModalContainer));